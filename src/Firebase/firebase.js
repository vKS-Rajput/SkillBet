// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa02Gr7fVsiRjDPDdqXEEsFq7V_qlm4KI",
  authDomain: "skillbet-3226b.firebaseapp.com",
  projectId: "skillbet-3226b",
  storageBucket: "skillbet-3226b.firebasestorage.app",
  messagingSenderId: "1096256652374",
  appId: "1:1096256652374:web:af0ef26e0f18613d8ee7f7",
  measurementId: "G-YG8G93HV2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Corrected exports
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
