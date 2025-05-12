
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBD9LE28yQAUD8VgBc3-pGH_vSJvkvq7q0",
  authDomain: "fir-messaginservice.firebaseapp.com",
  projectId: "fir-messaginservice",
  storageBucket: "fir-messaginservice.firebasestorage.app",
  messagingSenderId: "753278980485",
  appId: "G-1:753278980485:web:3f4436e86e55a3b05df4ec",
  measurementId: "G-YR2NW0T0XW"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onMessage((payload) => {
  console.log('Service Worker: Foreground message received:', payload);
});