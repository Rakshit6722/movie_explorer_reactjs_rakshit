// import { initializeApp } from "firebase/app";
// import { getMessaging, isSupported } from "firebase/messaging";
// import { getInstallations } from "firebase/installations";
// import { toast } from "react-toastify";

// export const firebaseConfig = {
//   apiKey: "AIzaSyBD9LE28yQAUD8VgBc3-pGH_vSJvkvq7q0",
//   authDomain: "fir-messaginservice.firebaseapp.com",
//   projectId: "fir-messaginservice",
//   storageBucket: "fir-messaginservice.firebasestorage.app",
//   messagingSenderId: "753278980485",
//   appId: "1:753278980485:web:3f4436e86e55a3b05df4ec",
//   measurementId: "G-YR2NW0T0XW"
// };

// export const FIREBASE_VAPID_KEY = "BNIzu7CfP2_7yZTXxQ7hyI57c7Keav_P3sfuHw00UlVJ-aY6uKf_a8gAa-6t-EGAdsWrmV7o8t6nz-PWFUHhTwg";

// export const app = initializeApp(firebaseConfig);
// export const installations = getInstallations(app);
// export const messaging = getMessaging(app);

// export const initializeMessaging = async () => {

//   try {
//     const supported = await isSupported();
//     if (!supported) {
//       console.warn("Firebase Messaging is not supported in this browser.");
//       return null;
//     }

//     if ('serviceWorker' in navigator) {
//       const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
//       const messaging = getMessaging(app);
//       console.log("Firebase Messaging initialized");
//       return messaging;
//     } else {
//       console.warn("Service workers are not supported in this environment.");
//       return null;
//     }
//   } catch (err) {
//     console.error("Failed to initialize Firebase Messaging:", err);
//     toast.error("Couldn't initialize Firebase messaging");
//     return null;
//   }
// };

// export const messaging = initializeMessaging();


import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";
import { getInstallations } from "firebase/installations";
import { toast } from "react-toastify";

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBD9LE28yQAUD8VgBc3-pGH_vSJvkvq7q0",
  authDomain: "fir-messaginservice.firebaseapp.com",
  projectId: "fir-messaginservice",
  storageBucket: "fir-messaginservice.firebasestorage.app",
  messagingSenderId: "753278980485",
  appId: "1:753278980485:web:3f4436e86e55a3b05df4ec",
  measurementId: "G-YR2NW0T0XW",
};

export const FIREBASE_VAPID_KEY = "BNIzu7CfP2_7yZTXxQ7hyI57c7Keav_P3sfuHw00UlVJ-aY6uKf_a8gAa-6t-EGAdsWrmV7o8t6nz-PWFUHhTwg";

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Initialize installations
export const installations = getInstallations(app);

// Initialize messaging with support check
export const messaging = (() => {
  try {
    // Check if browser supports FCM (synchronous call)
    if (!isSupported()) {
      toast.warn("This browser does not support Firebase Cloud Messaging.");
      console.warn("FCM is not supported in this browser.");
      return null;
    }

    // Initialize messaging
    const messagingInstance = getMessaging(app);
    console.log("Firebase Messaging initialized successfully.");

    // Register Service Worker for FCM
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js", { scope: "/" })
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
          toast.error(`Failed to register Service Worker: ${error.message}`);
        });
    } else {
      console.warn("Service Workers are not supported in this browser.");
      toast.warn("Service Workers are not supported in this browser.");
      return null;
    }

    return messagingInstance;
  } catch (error: any) {
    console.error("Error initializing Firebase Messaging:", error);
    toast.error(`Failed to initialize messaging: ${error.message}`);
    return null;
  }
})();