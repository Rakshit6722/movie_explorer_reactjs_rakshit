import { useEffect } from "react";
import { messaging, FIREBASE_VAPID_KEY } from "../firebase/firebase";
import { getToken, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addNotification } from "../redux/slices/notificationSlice";

function FirebaseProvider({ children }: any) {

    const dispatch = useDispatch()

    const audioUrl = '/sounds/notification-sound.mp3';

    useEffect(() => {
        if (!messaging) {
            console.error('Firebase messaging not initialized');
            return;
        }

        const setupMessaging = async () => {
            try {

                if ('serviceWorker' in navigator) {
                    try {

                        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
                            scope: '/'
                        });
                        console.log('Service worker registered successfully:', registration.scope);
                    } catch (err) {
                        console.error('Service worker registration failed:', err);
                    }
                }

                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    console.log('Notification permission granted.');

                    try {
                        const currentToken = await getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY });
                        if (currentToken) {
                            console.log('Got FCM token:', currentToken);
                        } else {
                            console.log('No token available');
                        }
                    } catch (err) {
                        console.log('An error occurred while getting token:', err);
                    }

                    onMessage(messaging, (payload) => {
                        try {
                            console.log("inside onMessage");
                            console.log('Message received. ', payload);
                            console.log('Foreground message received:', payload);

              
                            const audio = new Audio(audioUrl);
                            audio.play().catch(err => console.log('Sound play error:', err));

                        
                            dispatch(addNotification({
                                id: Date.now().toString(),
                                title: payload.notification?.title || 'New Notification',
                                body: payload.notification?.body || '',
                                timestamp: Date.now(),
                                read: false,
                                ...payload.data
                            }));

                            if (Notification.permission === 'granted') {
                                navigator.serviceWorker.ready.then(registration => {
                                    registration.showNotification(
                                        payload.notification?.title || 'New Notification',
                                        {
                                            body: payload.notification?.body || '',
                                            icon: '/favicon.ico',
                                            tag: 'movie-explorer-notification',
                                            badge: '/favicon.ico',
                                            requireInteraction: true,
                                            data: payload.data
                                        }
                                    );
                                });
                            }
                        } catch (error) {
                            console.error('Error processing message:', error);
                        }
                    });
                  
                }
            } catch (error) {
                console.error('Error setting up notifications:', error);
            }
        };

        setupMessaging();
    }, []);

    return <>{children}</>;
}


export default FirebaseProvider;