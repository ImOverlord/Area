import Meteor, { Accounts } from '@hugocourthias/react-native-meteor';
import { AuthSession } from 'expo';
import { AsyncStorage, Alert } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import {
  GOOGLE_CLIENT_ANDROID,
  GOOGLE_CLIENT_IOS,
  GOOGLE_CLIENT_IOS_STAND,
  WEB_CLIENT_ID,
  WEB_CLIENT_SECRET,
} from '../config/providers';


export const loginGoogleStandalone = async navigation => {
  return new Promise(async (resolve, reject) => {
    if (Meteor.user()) return reject('LOGGED_IN_ALREADY');
    try {
      await GoogleSignIn.initAsync({
        clientId: GOOGLE_CLIENT_IOS_STAND,
        isOfflineEnabled: true,
        webClientId: WEB_CLIENT_ID,
      });
    } catch ({ message }) {
      alert('GoogleSignIn.initAsync(): ' + message);
    }
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        fetch(
          `https://oauth2.googleapis.com/token?code=${user.serverAuthCode}&client_id=${WEB_CLIENT_ID}&client_secret=${WEB_CLIENT_SECRET}&grant_type=authorization_code`,
          {
            method: 'POST',
          }
        )
          .then(response => response.json())
          .then(data => {
            const token = {
              accessToken: data.access_token,
              idToken: user.auth.idToken,
              refreshToken: data.refresh_token,
            };

            Meteor.call('User.createFromGoogle', token, (err, result) => {
              if (err) return reject('SIGNIN_CANCEL');

              Meteor._handleLoginCallback(err, result);
              AsyncStorage.setItem('MOR_USER_ID', result.id);
              AsyncStorage.setItem('MOR_USER_TOKEN', result.token);
              navigation.navigate('AppStack');
              resolve('success');
            });
          });
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  });
};

export const loginGoogleExpo = () => {
  return new Promise((resolve, reject) => {
    try {
      if (Meteor.user()) return reject('LOGGED_IN_ALREADY');

      const config = {
        iosClientId: GOOGLE_CLIENT_IOS,
        androidClientId: GOOGLE_CLIENT_ANDROID,
        scopes: ['email', 'profile'],
      };

      Google.logInAsync(config)
        .then(response => {
          if (response.type !== 'success') return reject('SIGNIN_CANCEL');

          const data = {
            accessToken: response.accessToken,
            idToken: response.idToken,
            refreshToken: response.refreshToken,
          };

          Meteor.call('User.createFromGoogle', data, (err, result) => {
            if (err) return reject(err);
            Meteor._handleLoginCallback(err, result);
            AsyncStorage.setItem('MOR_USER_ID', result.id);
            AsyncStorage.setItem('MOR_USER_TOKEN', result.token);
            resolve('success');
          });
        })
        .catch(e => reject(e));
    } catch (err) {
      reject(err);
    }
  });
};
