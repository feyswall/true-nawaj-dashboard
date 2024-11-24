import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth, GithubAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC2S4Na6suPqPCS7KixAieYl51bTiRkHi0",
  authDomain: "nawaj-af1e6.firebaseapp.com",
  projectId: "nawaj-af1e6",
  storageBucket: "nawaj-af1e6.appspot.com",
  messagingSenderId: "582333988283",
  appId: "1:582333988283:web:e9c0919a85e45dff3e989e",
  measurementId: "G-0WYDWJNBR6"
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig); // Initialize if no apps are already initialized
} else {
  app = getApps()[0]; // Use the existing app instance
}

const functions = getFunctions(app);

const firestore = getFirestore(app);
const firebaseAuth = getAuth(app);

// Initialize GitHub Auth Provider
const githubProvider = new GithubAuthProvider();

const storage = getStorage(app);


// Firebase endpoints
const setCustomClaims = httpsCallable(functions, 'setCustomClaims');
const createUser = httpsCallable(functions, 'createUser');
const uploadImage = httpsCallable(functions, 'uploadImage');

export { firebaseAuth, firestore, githubProvider, storage,
  setCustomClaims, createUser, uploadImage }; // Export the Firebase services
