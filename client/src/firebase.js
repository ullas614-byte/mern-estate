// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-project-e184e.firebaseapp.com",
  projectId: "mern-estate-project-e184e",
  storageBucket: "mern-estate-project-e184e.firebasestorage.app",
  messagingSenderId: "602325716094",
  appId: "1:602325716094:web:35fc4277fee0b5b225dc2f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);