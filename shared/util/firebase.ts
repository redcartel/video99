// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FBapiKey,
    authDomain: process.env.NEXT_PUBLIC_FBauthDomain,
    projectId: process.env.NEXT_PUBLIC_FBprojectId,
    storageBucket: process.env.NEXT_PUBLIC_FBstorageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FBmessagingSenderId,
    appId: process.env.NEXT_PUBLIC_FBappId,
    measurementId: process.env.NEXT_PUBLIC_FBmeasurementId
};

console.log(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = (app.name && typeof window !== 'undefined') ? getAnalytics(app) : undefined;