import * as firebase from "firebase";
import "firebase/database";

let config = {
  apiKey: "AIzaSyAdJKzmzN472Ux0tDwRw1as7sQGIArUkm4",
  authDomain: "messenger-9b12b.firebaseapp.com",
  databaseURL: "https://messenger-9b12b-default-rtdb.firebaseio.com",
  projectId: "messenger-9b12b",
  storageBucket: "messenger-9b12b.appspot.com",
  messagingSenderId: "870427118899",
  appId: "1:870427118899:web:2f6ec9bee0c862bb4e4246",
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase.database();
