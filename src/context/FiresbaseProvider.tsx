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
            toast.error("Firebase messaging is not initialized");
            return;
        }

        const setupMessaging = async () => {
            try {
                if ('serviceWorker' in navigator) {
                    try {

                        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
                            scope: '/'
                        });
                    } catch (err: any) {
                        toast.error(err?.message || "Couldn't register service worker");
                    }
                }

                const permission = await Notification.requestPermission();
                if (permission === 'granted') {

                    try {
                        const currentToken = await getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY });
                    } catch (err: any) {
                        toast.error(err?.message || "Couldn't get token");
                    }

                    onMessage(messaging, (payload) => {
                        try {
            
                            const audio = new Audio(audioUrl);
                            audio.volume = 1
                            audio.play()


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
                        } catch (error: any) {
                            toast.error(error?.message || "Couldn't handle notification");
                        }
                    });

                }
            } catch (error: any) {
                toast.error(error?.message || "Couldn't setup messaging");
            }
        };

        setupMessaging();
    }, []);

    return <>{children}</>;
}


export default FirebaseProvider;