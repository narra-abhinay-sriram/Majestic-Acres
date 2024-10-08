// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//console.log(import.meta.env.VITE_FIREBASE_API_KEY);


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4a3ed.firebaseapp.com",
  projectId: "mern-estate-4a3ed",
  storageBucket: "mern-estate-4a3ed.appspot.com",
  messagingSenderId: "863575797792",
  appId: "1:863575797792:web:2c7e82c072de0b16418c45"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
