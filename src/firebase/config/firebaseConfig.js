import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDGcBD0sF3G7Qdk7XSZIcyTBAwc_Oj4tJA',
  authDomain: 'travelo-city-dcr.firebaseapp.com',
  projectId: 'travelo-city-dcr',
  storageBucket: 'travelo-city-dcr.appspot.com',
  messagingSenderId: '808080043077',
  appId: '1:808080043077:web:51925ef296ce24004f472c',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
export const auth = getAuth();
