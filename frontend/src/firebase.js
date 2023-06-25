// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV-bmMWTPO_4Iy3Dr_hncDOgZDIGzRyZw",
  authDomain: "crowdfunding-e239e.firebaseapp.com",
  projectId: "crowdfunding-e239e",
  storageBucket: "crowdfunding-e239e.appspot.com",
  messagingSenderId: "1053851046486",
  appId: "1:1053851046486:web:772f470457bd302c05a1f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);