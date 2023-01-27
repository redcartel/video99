import React from 'react'
import firebase, { auth, FS, Auth } from '@shared/util/firebase';

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
export default function useAdminUser(redirect: boolean = true): Auth.User | null | undefined {
    const [user, setUser] = React.useState<Auth.User | null | undefined>(undefined);
    Auth.onAuthStateChanged(auth, (user) => {
        if (user?.email) {
            console.log(typeof FS.doc(firestore, '/superAdmins/ok'))
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