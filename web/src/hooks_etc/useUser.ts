import React from 'react'
import firebase, { auth, FS, Auth } from '@shared/util/firebase';

const firestore = FS.getFirestore(firebase);

/**
 * @param redirect
 * 
 * Hook that returns a Firebase User if that user if a user is logged in
 * otherwise returns null. State variable returned is undefined until set.
 * 
 * If redirect is set, will redirect to that path on failed authentication.
 * 
 * @returns User | null | undefined
 */
export default function useUser(redirect: string | null = null): Auth.User | null | undefined {
    const [user, setUser] = React.useState<Auth.User | null | undefined>(undefined);
    Auth.onAuthStateChanged(auth, (user) => {
        if (user?.email) {
            setUser(user);
        }
        else {
            if (redirect && typeof window !== 'undefined') window.location.href = redirect;
        }
    });

    return user;
}