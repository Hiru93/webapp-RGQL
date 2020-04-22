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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  /**
   * From the firebase documentation
   * 
   * A Reference represents a specific location in your Database and can be used for reading or writing data to that Database location
   */
  const userRef = firestore.doc(`users/${ userAuth.uid }`);

  /**
  * From the firebase documentation
  * 
  * A DataSnapshot is an efficiently generated, immutable copy of the data at a Database location. 
  * It cannot be modified and will never change (to modify data, you always call the set() method on a Reference directly)
  */
  const snapShot = await userRef.get();
  
  if(!snapShot.exsists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      /**
       * We are using a reference to write information on our firebase db.
       * Firebase references are the only object types that allow writing operations on databases
       */
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user ', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      /** Parses a string creating a 'url friendly' version of it */
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  /** Creates a js map that has for key value the lowercase title of each object */
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/** Google auth setup using firebase */
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

/** Create the google popup when this provider is used */
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;