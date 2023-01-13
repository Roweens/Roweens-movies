import { initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'movies-app-roweens.firebaseapp.com',
  projectId: 'movies-app-roweens',
  storageBucket: 'movies-app-roweens.appspot.com',
  messagingSenderId: '444979615031',
  appId: '1:444979615031:web:83a010ce73629d3ebe76b2',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
export default storage;
