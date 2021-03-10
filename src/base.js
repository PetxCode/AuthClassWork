import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyBTDCibH7HavO8Z5YQr62mp1FD4HnxKWvs",
  authDomain: "codelab-f5579.firebaseapp.com",
  projectId: "codelab-f5579",
  storageBucket: "codelab-f5579.appspot.com",
  messagingSenderId: "223945124557",
  appId: "1:223945124557:web:46d2c4b2d359a96c8f5784",
});
