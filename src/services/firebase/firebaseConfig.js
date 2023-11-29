import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Platform } from 'react-native';

import {
    API_KEY_IOS,
    API_KEY_ANDROID,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID_IOS,
    APP_ID_ANDROID
} from '@env';

const firebaseConfigIOS = {
    apiKey: API_KEY_IOS,  // Use the imported variables here
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID_IOS,
};
  
const firebaseConfigAndroid = {
    apiKey: API_KEY_ANDROID,  // Use the imported variables here
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID_ANDROID,
};

const isIOS = Platform.OS === 'ios';

if (getApps().length < 1) {
    const app = initializeApp(isIOS ? firebaseConfigIOS : firebaseConfigAndroid);
    console.log('Firebase initialized successfully');
}
// console.log(firebase.getApps())
console.log('Length: ', getApps().length)

const db = getFirestore();
const auth = getAuth();
export { db, auth };
