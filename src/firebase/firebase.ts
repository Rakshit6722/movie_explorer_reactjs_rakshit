import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";
import { getInstallations } from "firebase/installations";
import { toast } from "react-toastify";

export const firebaseConfig = {
  apiKey: "AIzaSyBD9LE28yQAUD8VgBc3-pGH_vSJvkvq7q0",
  authDomain: "fir-messaginservice.firebaseapp.com",
  projectId: "fir-messaginservice",
  storageBucket: "fir-messaginservice.firebasestorage.app",
  messagingSenderId: "753278980485",
  appId: "1:753278980485:web:3f4436e86e55a3b05df4ec",
  measurementId: "G-YR2NW0T0XW"
};

export const FIREBASE_VAPID_KEY = "BNIzu7CfP2_7yZTXxQ7hyI57c7Keav_P3sfuHw00UlVJ-aY6uKf_a8gAa-6t-EGAdsWrmV7o8t6nz-PWFUHhTwg";

export const app = initializeApp(firebaseConfig);
export const installations = getInstallations(app);

// Messaging must be initialized safely
export const initializeMessaging = async () => {
  try {
    const supported = await isSupported();
    if (!supported) {
      console.warn("Firebase Messaging is not supported in this browser.");
      return null;
    }

    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      const messaging = getMessaging(app);
      console.log("Firebase Messaging initialized");
      return messaging;
    } else {
      console.warn("Service workers are not supported in this environment.");
      return null;
    }
  } catch (err) {
    console.error("Failed to initialize Firebase Messaging:", err);
    toast.error("Couldn't initialize Firebase messaging");
    return null;
  }
};
