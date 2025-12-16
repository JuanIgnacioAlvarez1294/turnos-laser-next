import { NextResponse } from 'next/server';
import MercadoPagoConfig, { Payment } from 'mercadopago';
import { updateTurno } from '@/services/turnos.service';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Mercado Pago manda diferentes tipos de eventos
    if (body.type !== 'payment') {
      return NextResponse.json({ ok: true });
    }

    const paymentId = body.data.id;

    const payment = new Payment(client);
    const paymentData = await payment.get({ id: paymentId });

    const turnoId = paymentData.metadata?.turnoId;

    if (!turnoId) {
      console.error('Pago sin turnoId');
      return NextResponse.json({ ok: true });
    }

    if (paymentData.status === 'approved') {
      await updateTurno(turnoId, {
        pago: 'aprobado',
        estado: 'confirmado',
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}