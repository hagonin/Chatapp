// import request from "./request";
import { auth } from "@config/firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut, sendEmailVerification, User, updateProfile, updateEmail, updatePassword, sendPasswordResetEmail, signInWithPopup, getRedirectResult, GoogleAuthProvider, UserCredential, RecaptchaVerifier, signInWithPhoneNumber, ApplicationVerifier
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const authService = {
    // email/password
    register: (data: any) => {
        const { username, password, email, phone_number } = data;
        return createUserWithEmailAndPassword(auth, email, password)
    },
    sendEmailVerification: () => sendEmailVerification(auth.currentUser as User),
    login: (data: any) => {
        const { username, password, email } = data;
        return signInWithEmailAndPassword(auth, email, password)
    },
    logout: () => signOut(auth),
    getProfile: () => {
        const user = auth.currentUser;
        if (user !== null) {
            return ({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                uid: user.uid,
            })
        }
    },

    // update
    updateProfile: (profile: {}) => updateProfile(auth.currentUser as User, profile),
    updateEmail: (email: string) => updateEmail(auth.currentUser as User, email),
    updatePassword: (newPassword: string) => updatePassword(auth.currentUser as User, newPassword),
    sendPasswordResetEmail: (data: any) => {
        const { email } = data;
        return sendPasswordResetEmail(auth, email, {
            url: 'http://localhost:3000/login'
        })
    },


    // google
    signInWidthGoogle: () => signInWithPopup(auth, provider),
    getRedirectResul: (result: UserCredential) => GoogleAuthProvider.credentialFromResult(result),

    // phone
    recaptchaVerifier: (callback: {}) => {
        (window as any).recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            ...callback,
            'size': 'normal',
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
            }
        }, auth)
    },
    requestOTP: (data: any) => {
        const { phone_number } = data;
        const appVerifier = (window as any).recaptchaVerifier;
        console.log(appVerifier);
        return signInWithPhoneNumber(auth, phone_number, appVerifier)
    },
    confirmOTP: (data: any) => {
        const { otp } = data;
        const confirmationResult = (window as any).confirmationResult;
        return confirmationResult.confirm(otp)
    },
}