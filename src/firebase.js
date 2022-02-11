// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYhQeyV3OGNW6ZY3SCnEJqaENV7J3PNms",
    authDomain: "slack-clone-dff33.firebaseapp.com",
    projectId: "slack-clone-dff33",
    storageBucket: "slack-clone-dff33.appspot.com",
    messagingSenderId: "593596042553",
    appId: "1:593596042553:web:fd5f3d950e2096b7312ce8"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider()
export { db, auth, provider }