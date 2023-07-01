import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
    apiKey: process.env.FIREBASE_PRIVATE_KEY_ID,
    projectId: process.env.FIREBASE_PROJECT_ID,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);