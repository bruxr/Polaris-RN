import firebase from 'firebase';
import 'firebase/firestore';

import config from '../../firebase.json';

firebase.initializeApp(config);

export const db = firebase.firestore();
