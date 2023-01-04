
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB_LnwCaQgj95mbawlIwn8lt1jsM0IauCk",
  authDomain: "crud-fire-react-32677.firebaseapp.com",
  projectId: "crud-fire-react-32677",
  storageBucket: "crud-fire-react-32677.appspot.com",
  messagingSenderId: "602509855578",
  appId: "1:602509855578:web:4242da61362df2830e8163"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)