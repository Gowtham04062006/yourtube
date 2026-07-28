import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrN-Bb_QFtH3qfnqEp3zSfLZEjwXZ56oU",
  authDomain: "yourtube-caedb.firebaseapp.com",
  projectId: "yourtube-caedb",
  storageBucket: "yourtube-caedb.firebasestorage.app",
  messagingSenderId: "368576373362",
  appId: "1:368576373362:web:b840a53ba197a84fe658eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export {auth,provider}