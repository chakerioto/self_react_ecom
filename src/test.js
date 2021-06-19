import firebase from './firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();



// Query document
firestore
    .collection('users')
    .doc('wTEnS8MaXNft6I8ztlO0')
    .collection('cartItems')
    .doc('ihYCACxtmULu4f4dFvy9')



// OR 

// firestore.doct('users/wTEnS8MaXNft6I8ztlO0/cartItems/ihYCACxtmULu4f4dFvy9')