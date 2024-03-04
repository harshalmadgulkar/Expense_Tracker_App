import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAuDBdmUoGZguzZHgHdBGILPV-LzxbiIYU",
  authDomain: "expense-tracker-67265.firebaseapp.com",
  projectId: "expense-tracker-67265",
  storageBucket: "expense-tracker-67265.appspot.com",
  messagingSenderId: "1381342968",
  appId: "1:1381342968:web:e1a311492c70ef827ee50d",
  measurementId: "G-VEP292G7J9",
};

const app = initializeApp(firebaseConfig);

// export dataBase
const db = getFirestore(app);
export { db };

// export Analytics
// const analytics = getAnalytics();
// export {analytics};
// console.log(analytics, 'notification_received');