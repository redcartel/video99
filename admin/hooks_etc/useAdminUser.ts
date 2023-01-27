import { getAuth, User } from 'firebase/auth';
import * as FS from 'firebase/firestore';

import React from 'react'
import firebase from 'util/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(firebase);
const firestore = FS.getFirestore(firebase);

/**
 * @param redirect
 * 
 * Hook that returns a Firebase User if that user has a firestore document /superAdmins/email@server.com with isSuperAdmin = true
 * otherwise returns null. State variable returned is undefined until set.
 * 
 * If redirect is true, will redirect to / on failed authentication.
 * 
 * @returns User | null | undefined
 */
export default function useAdminUser(redirect: boolean = true): User | null | undefined {
    const [user, setUser] = React.useState<User | null | undefined>(undefined);
    onAuthStateChanged(auth, (user) => {
        if (user?.email) {
            FS.getDoc(FS.doc(firestore, `/superAdmins/${user.email}`)).then(snapshot => {
                if (snapshot?.data()?.isSuperAdmin) {
                    setUser(user);
                }
                else {
                    setUser(null);
                    if (redirect && typeof window !== 'undefined') window.location.href = '/';
                }
            })
        }
        else {
            if (redirect && typeof window !== 'undefined') window.location.href = '/';
        }
    });

    return user;
}