
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

const storeNotification = (payload) => {
  const storedNotifications = self.indexedDB && self.indexedDB.open ?
    getStoredNotifications() : [];

  const newNotification = {
    id: Date.now().toString(),
    title: payload.notification.title,
    body: payload.notification.body,
    timestamp: Date.now(),
    read: false,
    imageUrl: payload.notification.image
  };

  storedNotifications.unshift(newNotification);

  const updatedNotifications = storedNotifications.slice(0, 50);
  if (self.indexedDB && self.indexedDB.open) {
    saveNotifications(updatedNotifications);
  }
}

const getStoredNotifications = () => {
  try{
    const stored = localStorage.getItem('notifications');
    return stored ? JSON.parse(stored) : [];
  }catch(err){
    console.error("Error getting stored notifications: ", err);
  }
}

const saveNotifications = (notifications) => {
  try{
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }catch(err){
    console.error("Error saving notifications: ", err);
  }
}

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  });

});