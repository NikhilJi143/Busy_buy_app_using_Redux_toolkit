// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2AEwIg5-6lSsrAZsGKgfl4g-RweU2cic",
  authDomain: "buybusy-779fd.firebaseapp.com",
  projectId: "buybusy-779fd",
  storageBucket: "buybusy-779fd.appspot.com",
  messagingSenderId: "471724454242",
  appId: "1:471724454242:web:b0ed7332369409f2f8bc3b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

