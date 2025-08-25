import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkX93h1TOJ1HNErpHSM2ekI8eTHiRGiJA",
  authDomain: "weddingtrizul.firebaseapp.com",
  databaseURL: "https://weddingtrizul-default-rtdb.firebaseio.com",
  projectId: "weddingtrizul",
  storageBucket: "weddingtrizul.firebasestorage.app",
  messagingSenderId: "1024210121195",
  appId: "1:1024210121195:web:259260b45b66d42686e9ae",
  measurementId: "G-0SFG7R9T3F",
};

// Cegah inisialisasi ulang
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
