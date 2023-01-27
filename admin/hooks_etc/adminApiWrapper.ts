import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import firebaseAdmin from "util/firebaseAdmin";

const auth = getAuth(firebaseAdmin);
const firestore = getFirestore(firebaseAdmin);


/**
 * @param handler
 * @returns handler
 * 
 * Higher-order function, wraps an API endpoint to require a firebase auth token in headers.authorization 
 * and require that there be a firestore document /superAdmins/user@email.com with an isSuperAdmin field 
 * with a value of true
 */
export default function adminApiWrapper(handler: (req: NextApiRequest, res: NextApiResponse) => any)
    : (req: NextApiRequest, res: NextApiResponse) => any {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'unauthorized' });
        }
        // In testing, accepts an authorization header of 'test'
        if (process.env.NODE_ENV === 'test' && req.headers.authorization === 'test') {
            return await handler(req, res);
        }
        const user = await auth.verifyIdToken(req.headers.authorization);
        if (!user?.email) {
            return res.status(401).json({ error: 'unauthorized' });
        }
        // // Requires that a firestore document for the user exist in superAdmins collection
        const doc = await firestore.doc(`/superAdmins/${user.email}`).get();
        if (!doc.exists || !doc?.data()?.isSuperAdmin) {
            return res.status(401).json({ error: 'insufficient privileges' });
        }
        return await handler(req, res);
    }
}