import { firebaseAdminConfig } from "@shared/util/firebase";
import admin from "firebase-admin";

const firebaseAdmin = admin.apps.length === 0 ? admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig)
}) : admin.apps[0];

export default firebaseAdmin;