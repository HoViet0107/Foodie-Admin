// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // paste your firebase config here
  apiKey: "AIzaSyB3OsClFgB9NhgFKop1uSme1wEzkfO6ctc",
  authDomain: "deliveryapp-c937e.firebaseapp.com",
  databaseURL: "https://deliveryapp-c937e-default-rtdb.firebaseio.com",
  projectId: "deliveryapp-c937e",
  storageBucket: "deliveryapp-c937e.appspot.com",
  messagingSenderId: "450813897666",
  appId: "1:450813897666:web:9ee8be760c88c64aa9845b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { storage, db };
