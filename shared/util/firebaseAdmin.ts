import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export const firebaseAdminConfig = {
    projectId: process.env.NEXT_PUBLIC_FBprojectId,
    clientEmail: process.env.PRIVATE_FBclientEmail,
    privateKey: process.env.PRIVATE_FBprivateKey
}

const firebaseAdmin = admin.apps.length === 0 ? admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig)
}) : admin.apps[0];

export const adminAuth = firebaseAdmin ? getAuth(firebaseAdmin) : undefined;
export const adminFirestore = firebaseAdmin ? getFirestore(firebaseAdmin) : undefined;

export default firebaseAdmin;