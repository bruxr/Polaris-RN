import { db } from '../services/firestore';

export function payeeReference(id) {
  return db.collection('payees').doc(id);
}

export function createPayee(data) {
  return db.collection('payees').add(data);
}

export function getPayee(id) {
  return db.collection('payees').doc(id).get();
}

export function getPayeeByName(name) {
  return db.collection('payees').where('name', '==', name).get();
}
