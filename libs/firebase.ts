// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqqMRCvXAsFpfiITgZO3iTTNmokcg9Ans",
  authDomain: "bebekvagonu.firebaseapp.com",
  projectId: "bebekvagonu",
  storageBucket: "bebekvagonu.appspot.com",
  messagingSenderId: "825604138069",
  appId: "1:825604138069:web:ce68f221483006b0da60dc",
  measurementId: "G-J6LW7RT1M2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


export default firebaseApp;