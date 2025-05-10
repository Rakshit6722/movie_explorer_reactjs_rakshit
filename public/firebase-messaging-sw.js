
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
const DB_NAME = 'notifications-store';
const STORE_NAME = 'notifications';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
  });
};

const storeNotification = async (payload) => {
  try {
    if (!payload.notification) {
      console.error('Invalid notification payload');
      return;
    }

    const newNotification = {
      id: Date.now().toString(),
      title: payload.notification.title,
      body: payload.notification.body,
      timestamp: Date.now(),
      read: false,
      imageUrl: payload.notification.image || null
    };

    const storedNotifications = await getStoredNotifications();
    storedNotifications.unshift(newNotification);

    // Limit to 50 notifications
    const updatedNotifications = storedNotifications.slice(0, 50);

    await saveNotifications(updatedNotifications);

    // Post message to client for immediate UI update
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'NEW_NOTIFICATION',
          notification: newNotification
        });
      });
    });
  } catch (error) {
    console.error('Error storing notification:', error);
  }
};

const saveNotifications = async (notifications) => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    store.clear();

    notifications.forEach(notification => {
      store.add(notification);
    });

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error('Error saving notifications:', error);
  }
};

const getStoredNotifications = async () => {
  try {
    const db = await openDB();
    console.log('Database opened successfully');
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const notifications = request.result || [];
        // Sort by timestamp, newest first
        notifications.sort((a, b) => b.timestamp - a.timestamp);
        resolve(notifications);
      };
    });
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
};
messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Store notification asynchronously (won't block)
  storeNotification(payload);

  // Show the notification
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico'
  };

  if (payload.notification.image) {
    notificationOptions.image = payload.notification.image;
  }

  return self.registration.showNotification(payload.notification.title, notificationOptions);
});