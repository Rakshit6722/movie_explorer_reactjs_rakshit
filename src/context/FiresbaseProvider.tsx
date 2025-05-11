import { useEffect } from 'react';
import { messaging, FIREBASE_VAPID_KEY } from '../firebase/firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/slices/notificationSlice';

function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const audioUrl = '/sounds/notification-sound.mp3';

  useEffect(() => {
    if (!messaging) {
      console.error('Firebase messaging not initialized');
      toast.error('Firebase messaging not initialized');
      return;
    }

    const setupMessaging = async () => {
      try {
        // Register service worker
        if ('serviceWorker' in navigator) {
          try {
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
              scope: '/',
            });
            console.log('Service worker registered successfully:', registration.scope);
          } catch (err) {
            console.error('Service worker registration failed:', err);
            toast.error('Failed to register service worker');
            return;
          }
        } else {
          console.error('Service workers not supported in this browser');
          toast.error('Service workers not supported');
          return;
        }

        // Request notification permission
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.warn('Notification permission denied');
          toast.warn('Please enable notifications for updates');
          return;
        }

        console.log('Notification permission granted');

        // Get FCM token
        let currentToken;
        try {
          currentToken = await getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY, serviceWorkerRegistration: navigator.serviceWorker });
          if (currentToken) {
            console.log('Got FCM token:', currentToken);
          } else {
            console.log('No token available');
            toast.warn('No FCM token available');
          }
        } catch (err) {
          console.error('Error getting FCM token:', err);
          toast.error('Error setting up notifications');
          return;
        }

        // Handle foreground messages
        onMessage(messaging, (payload) => {
          try {
            console.log('Foreground message received:', payload);

            // Play notification sound
            const audio = new Audio(audioUrl);
            audio.play().catch((err) => console.error('Sound play error:', err));

            // Dispatch notification to Redux
            dispatch(
              addNotification({
                id: Date.now().toString(),
                title: payload.notification?.title || 'New Notification',
                body: payload.notification?.body || '',
                timestamp: Date.now(),
                read: false,
                ...payload.data,
              })
            );

            // Show browser notification
            if (Notification.permission === 'granted') {
              navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(payload.notification?.title || 'New Notification', {
                  body: payload.notification?.body || '',
                  icon: '/favicon.ico',
                  tag: 'movie-explorer-notification',
                  badge: '/favicon.ico',
                  requireInteraction: true,
                  data: payload.data,
                });
              });
            }
          } catch (error) {
            console.error('Error processing message:', error);
            toast.error('Error processing notification');
          }
        });
      } catch (error) {
        console.error('Error setting up notifications:', error);
        toast.error('Error setting up notifications');
      }
    };

    setupMessaging();
  }, [dispatch]);

  return <>{children}</>;
}

export default FirebaseProvider;