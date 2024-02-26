import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuDBdmUoGZguzZHgHdBGILPV-LzxbiIYU",
  authDomain: "expense-tracker-67265.firebaseapp.com",
  projectId: "expense-tracker-67265",
  storageBucket: "expense-tracker-67265.appspot.com",
  messagingSenderId: "1381342968",
  appId: "1:1381342968:web:e1a311492c70ef827ee50d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
