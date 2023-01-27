import useAdminUser from '@/hooks_etc/useAdminUser';
import React from 'react';
import firebase, { auth } from '@shared/util/firebase';

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