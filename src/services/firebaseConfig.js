// Firebase Cloud Database Configuration (100% Free Spark Plan)
// Firebase Firestore provides permanent, free cloud persistence for projects, leads, and designer profile data!

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Default Firebase Configuration
// Replace these values with your free Firebase Console Project keys (https://console.firebase.google.com)
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKey_ReplaceWithYourFirebaseKey",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ammar-portfolio.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ammar-portfolio",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ammar-portfolio.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

let app = null;
let db = null;

try {
  if (firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('DemoKey')) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
} catch (err) {
  console.warn("Firebase initialization warning (using local fallback until Firebase keys added):", err);
}

export { db };
