import { messaging } from '../firebase/firebase';
import { getToken } from "firebase/messaging";

export const requestForToken = async () => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID});
        if (currentToken) {
          console.log('FCM device token:', currentToken);
          return currentToken;
        } else {
          console.log('No registration token available. Request permission to generate one.');
          return null;
        }
      } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
        return null;
      }
}