import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  connectAuthEmulator,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  setDoc,
  doc,
  query,
  limit,
  startAfter,
  endBefore,
  limitToLast,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const pageSize = 10;

export class FirebaseInit {
  // TODO: Replace the following with your app's Firebase project configuration
  firebaseConfig = {
    apiKey: "AIzaSyBEB81N7MfE1zdq4LlI2ooSIyR4d6DRMlQ",
    authDomain: "khinemyaezin-portfolio.firebaseapp.com",
    projectId: "khinemyaezin-portfolio",
    storageBucket: "khinemyaezin-portfolio.appspot.com",
    messagingSenderId: "238098180441",
    appId: "1:238098180441:web:5647e2dd8770ee87cc0448",
    measurementId: "G-HEN4GSWZ4B"
  };
  #app = null;
  #auth = null;
  #storage = null;
  #db = null;
  #currentUser = null;

  constructor() {
    try {
      this.#app = initializeApp(this.firebaseConfig);
      this.#db = getFirestore(this.#app);
      this.#storage = getStorage(this.#app);

      if (location.hostname === "localhost") {
        connectFirestoreEmulator(this.#db, "127.0.0.1", 8080);
        connectStorageEmulator(this.#storage, "127.0.0.1", 9199);
      }
    } catch (e) {
      console.log("error on firebase init");
    }
  }

  get getCurrentuser() {
    return this.#currentUser;
  }
  get getDb() {
    return this.#db;
  }

  get getStorage() {
    return this.#storage;
  }

  get operators() {
    return ["=="];
  }

  async signUp(email, password) {
    return createUserWithEmailAndPassword(this.#auth, email, password)
      .then((result) => {
        this.#currentUser = result;
        return this.#currentUser;
      })
      .catch((error) => {
        throw new HttpError(error);
      });
  }

  async signIn(email, password) {
    return signInWithEmailAndPassword(this.#auth, email, password)
      .then((result) => {
        this.#currentUser = result.user;
        return this.#currentUser;
      })
      .catch((error) => {
        throw new HttpError(error);
      });
  }

  signOut() {
    this.#auth.signOut();
  }

  onFirstData(collectionName, filters = []) {
    let quoteCollection = collection(this.#db, collectionName);
    let baseFilter = [limit(pageSize)];
    baseFilter = [...filters, ...baseFilter];
    let myQuery = query(quoteCollection, ...baseFilter);
    return getDocs(myQuery);
  }

  onNextData(collectionName, firstDoc, lastDoc, filters = []) {
    if (!firstDoc || !lastDoc) {
      console.log("Can't navigate yet");
    } else {
      let quoteCollection = collection(this.#db, collectionName);
      let baseFilter = [startAfter(lastDoc), limit(pageSize)];
      baseFilter = [...filters, ...baseFilter];

      let myQuery = query(quoteCollection, ...baseFilter);
      return getDocs(myQuery);
    }
  }

  onPrevData(collectionName, firstDoc, lastDoc, filters = []) {
    if (!firstDoc || !lastDoc) {
      console.log("Can't navigate yet");
    } else {
      let quoteCollection = collection(this.#db, collectionName);
      let baseFilter = [endBefore(firstDoc)];
      baseFilter = [...filters, ...baseFilter];
      let myQuery = query(
        quoteCollection,
        ...baseFilter,
        limitToLast(pageSize)
      );
      return getDocs(myQuery);
    }
  }

  onUpdate(collectionName, docId, updateObj) {
    let docRef = doc(this.#db, collectionName, docId);
    return updateDoc(docRef, updateObj);
  }

  async setDocument(collectionName, value) {
    const ref = collection(this.#db, collectionName);
    return setDoc(doc(ref), value);
  }

  async watchUser(callback) {
    onAuthStateChanged(this.#auth, (user) => {
      this.#currentUser = user ? user : null;
      callback(user ? true : false);
    });
  }
}
class HttpError extends Error {
  constructor(error) {
    super();
    this.code = error.code;
    this.message = error.message;
  }
}
