
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMVIwAt-eNIG6AuJoaJ11raaWXqXb-o5M",
  authDomain: "imgupload-a980a.firebaseapp.com",
  projectId: "imgupload-a980a",
  storageBucket: "imgupload-a980a.appspot.com",
  messagingSenderId: "1094730439110",
  appId: "1:1094730439110:web:01cefbd5abfc57535e7ac7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imgUpload = getStorage(app)