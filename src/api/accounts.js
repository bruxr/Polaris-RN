import { DateTime } from 'luxon';

import { db } from '../services/firestore';

export function accountReference(id) {
  return db.collection('accounts').doc(id);
}

export function getAccounts() {
  return db.collection('accounts').get().then((snapshot) => {
    const accounts = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      accounts.push(Object.assign(data, {
        id: doc.id,
        balance: data.balance / 100,
        updated_on: DateTime.fromJSDate(data.updated_on),
      }));
    });
    return accounts;
  });
}

export function createAccount(data) {
  return db.collection('accounts').add({
    name: data.name,
    balance: data.balance * 100,
    type: 'S',
    updated_on: DateTime.utc().toJSDate(),
  });
}

export function deleteAccount(id) {
  return db.collection('accounts').doc(id).delete();
  // TODO delete transactions under this account as well.
}
