// Firebase Cloud Database Configuration (100% Free Spark Plan)
// Official Cloud Database Instance for Mohamed Shafi Ammar Portfolio

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDIRojzjILxPMNTzHp7ZlJDsBrbXE3yXZM",
  authDomain: "ammar-portfolio-f27d1.firebaseapp.com",
  projectId: "ammar-portfolio-f27d1",
  storageBucket: "ammar-portfolio-f27d1.firebasestorage.app",
  messagingSenderId: "274870003908",
  appId: "1:274870003908:web:a7b6947da1f4894c334191",
  measurementId: "G-4RP2T1FWG5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
