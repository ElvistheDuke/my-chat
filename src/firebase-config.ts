// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8q0om9r_WTPyNAbW0XNgNMi59YqbFlmY",
  authDomain: "chat-app-e58a0.firebaseapp.com",
  projectId: "chat-app-e58a0",
  storageBucket: "chat-app-e58a0.firebasestorage.app",
  messagingSenderId: "115030042381",
  appId: "1:115030042381:web:726c308e57a7ea148df244",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); //initializes the authentication
export const provider = new GoogleAuthProvider(); //Used for choosing the type of authentication (Google)
export const db = getFirestore(app); //initializes firestore database
