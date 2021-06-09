import * as firebase from "firebase";
import "firebase/database";

let config = {
  apiKey: "AIzaSyAaFiMBltCYQUVpXssVSNmRMb1Q9PWgJOA",
  authDomain: "gochat-fef9f.firebaseapp.com",
  databaseURL: "https://gochat-fef9f-default-rtdb.firebaseio.com",
  projectId: "gochat-fef9f",
  storageBucket: "gochat-fef9f.appspot.com",
  messagingSenderId: "945786104101",
  appId: "1:945786104101:web:225d10dc436da084e252cc",
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase.database();
