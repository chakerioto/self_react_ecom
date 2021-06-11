// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/firestore';



const config = {
    apiKey: "AIzaSyBqRm3066Mv1neRkON4tpeN3NmIubQUE08",
    authDomain: "crdb-1d599.firebaseapp.com",
    projectId: "crdb-1d599",
    storageBucket: "crdb-1d599.appspot.com",
    messagingSenderId: "589726741641",
    appId: "1:589726741641:web:61818d77f174c55e9f8258",
    measurementId: "G-YJVC2WPVDM"
};




firebase.initializeApp(config);


export const createUserProfileDocument = async ( userAuth , additionalData ) => {     
    if(!userAuth) return ;

    const userRef = firestore.doc(`user/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName , email } = userAuth ;
        const createAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    
    return userRef ;


}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

// Always trigger the Google pop up whenever we use this GoogleAuthProvider
provider.setCustomParameters( { prompt : 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


