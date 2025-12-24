// app/api/mercadopago/webhook/route.ts
import { NextResponse } from 'next/server';
import { updateTurno } from '@/services/turnos.service';

export async function POST(req: Request) {
  try {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    if (!accessToken) {
      console.error('❌ MERCADOPAGO_ACCESS_TOKEN no definido');
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    const { default: MercadoPagoConfig, Payment } = await import('mercadopago');

    const client = new MercadoPagoConfig({ accessToken });

    const body = await req.json();

    if (body.action !== 'payment.created' && body.type !== 'payment') {
      return NextResponse.json({ ok: true });
    }

    const paymentId = body.data?.id || body.id;
    if (!paymentId) {
      return NextResponse.json({ ok: true });
    }

    const payment = new Payment(client);
    const paymentData = await payment.get({ id: paymentId });

    const turnoId =
      paymentData.external_reference ||
      paymentData.metadata?.turno_id;

    const tipoPago = paymentData.metadata?.tipo_pago;

    if (!turnoId) {
      console.warn('⚠️ Pago sin turnoId', paymentId);
      return NextResponse.json({ ok: true });
    }

    if (paymentData.status === 'approved') {
      await updateTurno(turnoId, {
        pago: tipoPago === 'total' ? 'total' : 'sena',
        estado: 'confirmado',
      });

      console.log(`✅ Turno ${turnoId} confirmado (${tipoPago})`);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}