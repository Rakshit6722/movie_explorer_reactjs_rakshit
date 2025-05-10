import { messaging, FIREBASE_VAPID_KEY } from '../firebase/firebase';
import { getToken } from "firebase/messaging";

export const requestForToken = async () => {
  try {
    if (!messaging) {
      console.error('Firebase messaging not initialized');
      return null;
    }

    const currentToken = await getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY });
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