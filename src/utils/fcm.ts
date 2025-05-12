import { toast } from 'react-toastify';
import { messaging, FIREBASE_VAPID_KEY } from '../firebase/firebase';
import { getToken } from "firebase/messaging";

export const requestForToken = async () => {
  try {
    if (!messaging) {
      toast.error("Firebase messaging is not initialized");
      return null;
    }

    const currentToken = await getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY });
    if (currentToken) {
      return currentToken;
    } else {
      toast.error("No registration token available. Request permission to generate one.");
      return null;
    }
  } catch (err: any) {
    toast.error(err?.message || "Couldn't get token");
    return null;
  }
}