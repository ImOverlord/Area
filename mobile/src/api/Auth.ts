/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import * as GoogleSignIn from "expo-google-sign-in";
import firebase from "firebase";

import {
  GOOGLE_CLIENT_IOS_STAND,
  WEB_CLIENT_ID,
  WEB_CLIENT_SECRET
} from "../providers/firebase";

export const loginGoogleStandalone = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await GoogleSignIn.initAsync({
        clientId: GOOGLE_CLIENT_IOS_STAND,
        isOfflineEnabled: true,
        webClientId: WEB_CLIENT_ID
      });
    } catch ({ message }) {
      reject(message);
    }
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();

      if (user) {
        if (type === "success") {
          fetch(
            `https://oauth2.googleapis.com/token?code=${user.serverAuthCode}&client_id=${WEB_CLIENT_ID}&client_secret=${WEB_CLIENT_SECRET}&grant_type=authorization_code`,
            {
              method: "POST"
            }
          )
            .then(response => response.json())
            .then(data => {
              const token = {
                accessToken: data.access_token,
                idToken: user.auth.idToken,
                refreshToken: data.refresh_token
              };
              const credential = firebase.auth.GoogleAuthProvider.credential(
                token.idToken,
                token.accessToken
              );
              firebase
                .auth()
                .signInWithCredential(credential)
                .then(() => {
                  resolve("SUCCESS");
                });
            });
        }
      }
    } catch ({ message }) {
      reject(message);
    }
  });
};
