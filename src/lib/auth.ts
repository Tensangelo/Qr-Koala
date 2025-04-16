// lib/auth.ts
import { auth, db } from "./firebase";
import {
    sendSignInLinkToEmail,
    signInWithEmailLink,
    User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Función para enviar el Magic Link
export const sendMagicLink = async (email: string) => {
    window.localStorage.setItem("emailForSignIn", email);
    const actionCodeSettings = {
        url: process.env.NEXT_PUBLIC_MAGIC_LINK_REDIRECT || "http://localhost:3000/verification",
        handleCodeInApp: true,
    };

    return sendSignInLinkToEmail(auth, email, actionCodeSettings);
};

// Función para completar el login al hacer clic en el link
export const completeMagicLinkSignIn = async (url: string) => {
    const email = window.localStorage.getItem("emailForSignIn");
    if (!email) throw new Error("No email found in localStorage");

    const userCredential = await signInWithEmailLink(auth, email, url);
    return userCredential.user;
};

export const createUserInFirestoreIfNotExists = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        await setDoc(userRef, {
            email: user.email,
            createdAt: new Date(),
        });
    }
}