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
                        console.log('Foreground message received:', payload);

                        dispatch(addNotification({
                            title: payload.notification?.title || 'New Notification',
                            body: payload.notification?.body || ''
                        }))

                        if (Notification.permission === 'granted') {
                            const notification = new Notification(payload.notification?.title || 'New Notification', {
                                body: payload.notification?.body || '',
                                tag: 'movie-explorer-notification',
                                silent: false
                            });
                            notification.onclick = () => {
                                window.focus();
                                notification.close();
                            };

                            setTimeout(() => notification.close(), 5000);
                        }

             
                        //   <div>
                        //     <h4 className="font-bold">{payload.notification?.title || 'New Notification'}</h4>
                        //     <p>{payload.notification?.body || ''}</p>
                        //   </div>,
                        //   {
                        //     position: "top-right",
                        //     autoClose: 5000,
                        //     hideProgressBar: false,
                        //     closeOnClick: true,
                        //     pauseOnHover: true,
                        //     draggable: true
                        //   }
                        // );
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