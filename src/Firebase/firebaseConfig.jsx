import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDSegPgvdO1pWru9vKxjFVGMdJk0KcM2S0",
  authDomain: "huddle-app-58a5f.firebaseapp.com",
  databaseURL: "https://huddle-app-58a5f-default-rtdb.firebaseio.com",
  projectId: "huddle-app-58a5f",
  storageBucket: "huddle-app-58a5f.appspot.com",
  messagingSenderId: "920216987836",
  appId: "1:920216987836:web:bb78bfe01e1a3eaa9a88b9",
  measurementId: "G-V3F82J7RYJ",
};

//Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase();
// This is for storage
export const storage = getStorage();
