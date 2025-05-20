import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { toast } from "react-toastify";

export const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  // appId: import.meta.env.VITE_FIREBASE_APPID,
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
  apiKey: "AIzaSyBD9LE28yQAUD8VgBc3-pGH_vSJvkvq7q0",
  authDomain: "fir-messaginservice.firebaseapp.com",
  projectId: "fir-messaginservice",
  storageBucket: "fir-messaginservice.firebasestorage.app",
  messagingSenderId: "753278980485",
  appId: "1:753278980485:web:3f4436e86e55a3b05df4ec",
  measurementId: "G-YR2NW0T0XW"
};

export const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);
export const FIREBASE_VAPID_KEY = "BNIzu7CfP2_7yZTXxQ7hyI57c7Keav_P3sfuHw00UlVJ-aY6uKf_a8gAa-6t-EGAdsWrmV7o8t6nz-PWFUHhTwg"
// export const FIREBASE_VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID

export let messaging: any = null;

if(typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.serviceWorker) {
    messaging = getMessaging(app);
}