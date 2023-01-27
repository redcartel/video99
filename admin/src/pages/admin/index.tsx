import useAdminUser from 'hooks_etc/useAdminUser';
import React from 'react';
import firebase from 'util/firebase';
import { getAuth } from 'firebase/auth';

const auth = getAuth(firebase);

export default function AdminIndex() {
    const superAdmin = useAdminUser();

    return (
        <>
            {!superAdmin ?
                <div>Waiting</div>
                :
                <>
                    <div>Logged In</div>
                    <button onClick={
                        () => auth.signOut()
                    }>Log Out</button>
                </>
            }
        </>
    )
}