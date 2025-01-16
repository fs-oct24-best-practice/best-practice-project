// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDjFSth_BWRq68fHa2so0iygrDDgn4AbIU',
  authDomain: 'best-practice-21c1a.firebaseapp.com',
  projectId: 'best-practice-21c1a',
  storageBucket: 'best-practice-21c1a.firebasestorage.app',
  messagingSenderId: '1083759417524',
  appId: '1:1083759417524:web:715252333b23c494c21fe1',
  measurementId: 'G-G4SPYWGT63',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };
