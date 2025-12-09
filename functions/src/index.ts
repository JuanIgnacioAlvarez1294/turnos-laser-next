import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const sendPushNotification = functions.firestore
    .document('/turnos/{turnoId}')
    .onCreate(async (snap, context) => {
        const turnoData = snap.data();
        const userId = turnoData.userId;

        // Fetch user token from Firestore
        const userDoc = await admin.firestore().collection('users').doc(userId).get();
        const userData = userDoc.data();

        if (userData && userData.token) {
            const payload = {
                notification: {
                    title: 'Turno Reservado',
                    body: `Tu turno para ${turnoData.servicioId} ha sido reservado.`,
                },
            };

            await admin.messaging().sendToDevice(userData.token, payload);
        }
    });

export const mercadoPagoWebhook = functions.https.onRequest(async (req, res) => {
    const event = req.body;

    // Handle Mercado Pago webhook events
    if (event.type === 'payment') {
        const paymentId = event.data.id;
        // Process payment information and update Firestore accordingly
    }

    res.status(200).send('Webhook received');
});