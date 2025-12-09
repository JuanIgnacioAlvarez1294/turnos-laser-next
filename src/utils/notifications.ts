import { getMessaging, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

export const initializeNotifications = () => {
  const messaging = getMessaging();

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);

    if (payload.notification && payload.notification.title) {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
      };

      new Notification(notificationTitle, notificationOptions);
    }
  });
};

export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
  } else {
    console.error("Unable to get permission to notify.");
  }
};

// 🔥 AGREGAR ESTO 🔥
export const notifySuccess = (msg: string) => {
  toast.success(msg);
};

export const notifyError = (msg: string) => {
  toast.error(msg);
};