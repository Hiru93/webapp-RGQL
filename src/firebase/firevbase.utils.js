import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAKo5b0C6nKY6tkkGSdkmZlWZazQkTE7Cw",
    authDomain: "db-rgql.firebaseapp.com",
    databaseURL: "https://db-rgql.firebaseio.com",
    projectId: "db-rgql",
    storageBucket: "db-rgql.appspot.com",
    messagingSenderId: "1021386231240",
    appId: "1:1021386231240:web:b354643a9c4dbe135144fd",
    measurementId: "G-3953QFYTX1"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  /** Google auth setup using firebase */
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  /** Create the google popup when this provider is used */
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;