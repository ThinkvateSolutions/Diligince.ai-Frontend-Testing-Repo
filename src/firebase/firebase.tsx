// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoJH5fJ4Ydoj_xiy7OFkczU3IDucQ9uOI",
  authDomain: "diligince.firebaseapp.com",
  projectId: "diligince",
  storageBucket: "diligince.firebasestorage.app",
  messagingSenderId: "448144459442",
  appId: "1:448144459442:web:cc2024169342758d7d6bab",
  measurementId: "G-50N2WZXNR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);