import firebase from 'firebase'
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    MESSAGE_SENDER_ID,
    APP_ID
} from 'react-native-dotenv'

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: '',
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID
}

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig);
export const GOOGLE_CLIENT_IOS_STAND= '367765098795-oj72gj0p2a9iel8bf7ruajesgsaclvdr.apps.googleusercontent.com'
export const WEB_CLIENT_ID= '367765098795-p5jcnq259cqi62itsb8n6ppupmf3ocfn.apps.googleusercontent.com'
export const WEB_CLIENT_SECRET= '310Q_Q_42Yi_Fg5tkvgem91D'
export const GOOGLE_CLIENT_IOS='367765098795-p5jcnq259cqi62itsb8n6ppupmf3ocfn.apps.googleusercontent.com'
export default Firebase
