import { db } from '../services/firestore';

export function categoryReference(id) {
  return db.collection('categories').doc(id);
}

export function createCategory(data) {
  return db.collection('categories').add(data);
}

export function getCategory(id) {
  return db.collection('categories').doc(id).get();
}

export function getCategoryByName(name) {
  return db.collection('categories').where('name', '==', name).get();
}
