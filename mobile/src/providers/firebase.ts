import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  DATABASE_URL,
  MESSAGE_SENDER_ID,
  PROJECT_ID
} from "react-native-dotenv";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: "",
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig) as firebase.app.App;
export const db = firebase.firestore() as firebase.firestore.Firestore;

export const GOOGLE_CLIENT_IOS_STAND =
  "367765098795-oj72gj0p2a9iel8bf7ruajesgsaclvdr.apps.googleusercontent.com";
export const WEB_CLIENT_ID =
  "367765098795-p5jcnq259cqi62itsb8n6ppupmf3ocfn.apps.googleusercontent.com";
export const WEB_CLIENT_SECRET = "310Q_Q_42Yi_Fg5tkvgem91D";
export const GOOGLE_CLIENT_IOS =
  "367765098795-p5jcnq259cqi62itsb8n6ppupmf3ocfn.apps.googleusercontent.com";
export default Firebase;
