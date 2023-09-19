// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxR3pOda6qHbSiLd9DIKdwfGZLA40Rz_c",
  authDomain: "breatheproject-a60fa.firebaseapp.com",
  projectId: "breatheproject-a60fa",
  storageBucket: "breatheproject-a60fa.appspot.com",
  messagingSenderId: "159551820491",
  appId: "1:159551820491:web:54280d3c572090cb26414e",
  measurementId: "G-GLK3BWZZYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);