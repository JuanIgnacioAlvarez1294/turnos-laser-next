import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import admin from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import MercadoPago from 'mercadopago';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');

if (!admin.apps.length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

MercadoPago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const buf = await buffer(req);
  const signature = req.headers['x-mp-signature'];

  if (!signature) {
    return res.status(400).send('Missing signature');
  }

  const isValid = MercadoPago.webhook.verify(buf.toString(), signature);

  if (!isValid) {
    return res.status(400).send('Invalid signature');
  }

  const event = JSON.parse(buf.toString());

  switch (event.type) {
    case 'payment':
      const payment = event.data;
      const paymentId = payment.id;
      const status = payment.status;

      // Update payment status in Firestore
      await db.collection('turnos').doc(paymentId).update({
        pago: status === 'approved' ? 'aprobado' : 'pendiente',
      });

      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).send('Webhook received');
};

export default webhookHandler;