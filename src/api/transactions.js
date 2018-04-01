import { DateTime } from 'luxon';

import { db } from '../services/firestore';

import { accountReference } from './accounts';
import { createPayee, getPayee, getPayeeByName, payeeReference } from './payees';
import { categoryReference, createCategory, getCategory, getCategoryByName } from './categories';

export function getTransactions(opts) {
  const options = Object.assign({
    limit: null,
  }, opts);
  const query = db.collection('transactions').orderBy('created_on', 'desc');

  if (options.limit) {
    query.limit(options.limit);
  }

  return query.get().then((result) => {
    return result.docs.map((doc) => {
      const data = doc.data();
      debugger;
      return {
        id: doc.id,
        notes: data.notes,
        amount: data.amount / 100,
        created_on: DateTime.fromJSDate(data.created_on),
      };
    });
  });
}

export function createTransaction(data) {
  const payeePromise = getPayee(data.payee)
    .then((payee) => {
      if (!payee.exists) {
        return getPayeeByName(data.payee).then((payee2) => {
          if (!payee2.empty) {
            return payee2.docs[0].id;
          }
          return createPayee({ name: data.payee }).then(payee3 => payee3.id);
        });
      }
      return payee.id;
    });
  const categoryPromise = getCategory(data.category)
    .then((category) => {
      if (!category.exists) {
        return getCategoryByName(data.category).then((category2) => {
          if (!category2.empty) {
            return category2.docs[0].id;
          }
          return createCategory({ name: data.category }).then(category3 => category3.id);
        });
      }
      return category.id;
    });

  return Promise.all([payeePromise, categoryPromise]).then((results) => {
    const [payeeId, categoryId] = results;
    const accountRef = accountReference(data.account);
    return db.runTransaction(tx =>
      tx.get(accountRef).then((account) => {
        db.collection('transactions').add({
          account: accountReference(data.account),
          payee: payeeReference(payeeId),
          category: categoryReference(categoryId),
          amount: data.amount * 100,
          notes: data.notes,
          created_on: DateTime.utc().toJSDate(),
        });
        tx.update(accountRef, { balance: account.balance + (data.balance * 100) });
      }));
  });
}

export function getTransaction(id) {
  
}
