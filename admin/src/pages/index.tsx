import Head from 'next/head'
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import React, { useEffect } from 'react';
import { getAnalytics } from "firebase/analytics";
import axios, { AxiosError } from 'axios';
import firebase from 'util/firebase';

const analytics = (typeof window !== 'undefined') ? getAnalytics(firebase) : undefined;

const auth = getAuth(firebase);

export default function Home() {
  // console.log(auth.config);
  const [message, setMessage] = React.useState('Welcome');
  const [user, setUser] = React.useState<User | null>(null);
  const provider = React.useMemo(() => new GoogleAuthProvider(), []);

  React.useEffect(() => {
    console.log('attempting fetch...');
    auth.currentUser?.getIdToken().then(token =>
      axios.get('/api', {
        headers: {
          Authorization: token
        }
      })).then(response => {
        setMessage(response.data.message ?? response.data.error)
        if (response.data.success === true) {
          if (typeof window !== 'undefined') window.location.href = '/admin';
        }
      }).catch((errorResponse: AxiosError) => {
        if (errorResponse.isAxiosError) {
          setMessage(errorResponse.response?.status + ' ' + (errorResponse.response?.data as any).error);
        }
      })

  }, [user])

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <h1>{message}</h1>
        </div>
        <button
          onClick={e => {
            signInWithPopup(auth, provider)
              .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //const user = result.user;
                setUser(result.user);
                // ...
              }).catch((error) => {
                // Handle Errors here.
                setMessage(error.code);
                // ...
              });
          }}
        >Login</button>
      </main>
    </>
  )
}
