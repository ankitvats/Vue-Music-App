import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDn8G9X3piWDLg4_YDw-HWzPZ-ixALjThU",
  authDomain: "music-app-70dc3.firebaseapp.com",
  projectId: "music-app-70dc3",
  storageBucket: "music-app-70dc3.appspot.com",
  appId: "1:1070147429201:web:47429ac58af7fb97fc2970",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// collections - it will select or create if didn't exist
const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");

export { auth, db, usersCollection, songsCollection, storage };
