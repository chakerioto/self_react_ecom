import firebase from './firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();



// Query document
firestore.collection('users').doc('DB4dnY30RAvsPlJJqnLR').collection('cartItems').doc('ihYCACxtmULu4f4dFvy9')