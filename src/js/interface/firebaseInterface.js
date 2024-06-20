export class FirebaseInterface {
  constructor() {
    if (this.constructor === FirebaseInterface) {
      throw new Error("Cannot instantiate an interface");
    }
  }

  get getCurrentuser() {
    throw new Error("Method 'doSomething' must be implemented.");
  }
  get getDb() {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  get getStorage() {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  get operators() {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  async signUp(email, password) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  async signIn(email, password) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  signOut() {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  onFirstData(collectionName, filters = []) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  onNextData(collectionName, firstDoc, lastDoc, filters = []) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  onPrevData(collectionName, firstDoc, lastDoc, filters = []) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  onUpdate(collectionName, docId, updateObj) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  async setDocument(collectionName, value) {
    throw new Error("Method 'doSomething' must be implemented.");
  }

  async watchUser(callback) {
    throw new Error("Method 'doSomething' must be implemented.");
  }
}
