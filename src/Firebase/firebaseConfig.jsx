import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4EDllLDnKzUJKtpa2YL19ZY1JBAQumAM",
  authDomain: "chat-app-6e926.firebaseapp.com",
  projectId: "chat-app-6e926",
  storageBucket: "chat-app-6e926.appspot.com",
  messagingSenderId: "211547167141",
  appId: "1:211547167141:web:9f3e18e01605083765304c",
  measurementId: "G-WNLQM1B9JK",
  databaseURL: "https://chat-app-6e926-default-rtdb.firebaseio.com/",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
