// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAe9kUBx-09L6bUSZLIQxe0uwWSk-_IYU",
  authDomain: "movie-management-62c30.firebaseapp.com",
  projectId: "movie-management-62c30",
  storageBucket: "movie-management-62c30.appspot.com",
  messagingSenderId: "757437639781",
  appId: "1:757437639781:web:df3d2a02b528ce0d08ea8c",
  measurementId: "G-XZRK0GLXE7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
