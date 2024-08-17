// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnUyeqOC5qYQPRTZQFDBxpDPdGgazpff8",
  authDomain: "ecommerce-cart-6f0bb.firebaseapp.com",
  projectId: "ecommerce-cart-6f0bb",
  storageBucket: "ecommerce-cart-6f0bb.appspot.com",
  messagingSenderId: "577125382791",
  appId: "1:577125382791:web:77f0bd8afbaa7e58a05622",
  measurementId: "G-METKZW358H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
