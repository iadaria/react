import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAmc06mEUZIkST_s68I7mYh0RpIl245lnA",
  authDomain: "effector-21381.firebaseapp.com",
  databaseURL: "https://effector-21381-default-rtdb.firebaseio.com",
  projectId: "effector-21381",
  storageBucket: "effector-21381.appspot.com",
  messagingSenderId: "424408372451",
  appId: "1:424408372451:web:e402eb9c9163e3f7c4e1d6",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
