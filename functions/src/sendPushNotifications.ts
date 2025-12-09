import admin from 'firebase-admin';
import { getMessaging } from 'firebase-admin/messaging';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const sendPushNotification = async (token: string, title: string, body: string) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    const response = await getMessaging().send(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};