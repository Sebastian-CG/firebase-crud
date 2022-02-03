import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIicxayMdE-90w0ioU-sVCMYJWin6i868",
  authDomain: "crud-b61a5.firebaseapp.com",
  projectId: "crud-b61a5",
  storageBucket: "crud-b61a5.appspot.com",
  messagingSenderId: "109587601442",
  appId: "1:109587601442:web:7e46dfb30a53d36436127b",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
