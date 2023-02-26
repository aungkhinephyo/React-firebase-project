// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAozHbi0ubnFo4kIyGwNLiJaHsbhE8i5X0",
  authDomain: "react-course-bf185.firebaseapp.com",
  projectId: "react-course-bf185",
  storageBucket: "react-course-bf185.appspot.com",
  messagingSenderId: "295102094196",
  appId: "1:295102094196:web:27a17e944e11ac35086a21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);