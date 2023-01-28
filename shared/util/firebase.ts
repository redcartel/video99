import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Analytics, { getAnalytics } from "firebase/analytics";
export * as FS from "firebase/firestore";
export * as Auth from "firebase/auth";

//console.log(process.env.NEXT_PUBLIC_FBapiKey)

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FBapiKey,
    authDomain: process.env.NEXT_PUBLIC_FBauthDomain,
    projectId: process.env.NEXT_PUBLIC_FBprojectId,
    storageBucket: process.env.NEXT_PUBLIC_FBstorageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FBmessagingSenderId,
    appId: process.env.NEXT_PUBLIC_FBappId,
    measurementId: process.env.NEXT_PUBLIC_FBmeasurementId
};

const firebase = initializeApp(firebaseConfig);

//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase)
export const firestore = getFirestore(firebase);
//export const analytics = (typeof window === 'undefined' || !(Analytics.isSupported())) ? undefined : getAnalytics(firebase);
export const analyticsPromise = Analytics?.isSupported().then(answer => answer ? getAnalytics(firebase) : undefined);

export default firebase;

// console.log(firebaseConfig);

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const analytics = (app.name && typeof window !== 'undefined') ? getAnalytics(app) : undefined;