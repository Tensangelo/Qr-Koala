import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQ-uO9rP8mAQpxrAWWekDcVb_MZpHdlfo",
    authDomain: "qr-koala-d6110.firebaseapp.com",
    projectId: "qr-koala-d6110",
    storageBucket: "qr-koala-d6110.firebasestorage.app",
    messagingSenderId: "1023396772789",
    appId: "1:1023396772789:web:9e3055eea019f4b3d077fc",
    measurementId: "G-00TEHYR4LQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
