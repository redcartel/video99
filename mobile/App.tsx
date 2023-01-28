import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Platform } from 'react-native';
import { hello } from '../shared/util/strings';
//import Constants from 'expo-constants'; //So we can read app.json extra
//import * as Google from 'expo-google-app-auth'; //google auth libraries
import firebase, { auth, Auth } from '../shared/util/firebase'; //basic firebase
import React from 'react';
//import Firebase from '@/util/firebase'; //This is the initialized Firebase, you can find it in my GitHub

import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';


export default function App() {
  const [userInfo, setUserInfo] = React.useState<any>();
  const [user, setUser] = React.useState<Auth.User | null>(null);
  //const [requireRefresh, setRequireRefresh] = React.useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.PRIVATE_ANDROID_Google_OAuth,
    iosClientId: process.env.PRIVATE_IOS_Google_OAuth,
    expoClientId: process.env.PRIVATE_EXPO_OAuth_Id,
  });

  Auth.onAuthStateChanged(auth, (user) => {
    console.log(user);
    setUser(user);
  });

  React.useEffect(() => {
    //console.log(response);
    if (response?.type === "success") {
      Auth.signInWithCredential(auth, Auth.GoogleAuthProvider.credential(
        response.authentication?.idToken,
        response.authentication?.accessToken
      ));
    }
  }, [response]);

  return (
    <View style={styles.container}>
      {user?.email ? <>
        <Image source={{ uri: user.photoURL ?? '' }} style={{ width: 50, height: 50 }} />
      </> : <>
        <Text>Not Logged In</Text>
      </>}
      <Button
        title={user?.email ? "Logout" : "Login"}
        onPress={user?.email ? () => auth.signOut().catch(e => {
          console.error(e);
        }) : () => promptAsync({ useProxy: false, showInRecents: true })}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
