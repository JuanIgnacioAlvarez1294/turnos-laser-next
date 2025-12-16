import { NextResponse } from 'next/server';
import MercadoPagoConfig, { Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  console.log('MP TOKEN:', process.env.MERCADOPAGO_ACCESS_TOKEN);
  try {
    const body = await req.json();

    const { titulo, precio, turnoId, email } = body;

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: turnoId, // obligatorio
            title: titulo,
            quantity: 1,
            currency_id: 'ARS',
            unit_price: Number(precio),
          },
        ],

        payer: {
          email,
        },

        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/reservas/${turnoId}?pago=success`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/reservas/${turnoId}?pago=failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/reservas/${turnoId}?pago=pending`,
        },

        auto_return: 'approved',

        notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercadopago/webhook`, // 🔥 AQUÍ

        metadata: {
          turnoId,
        },
      },
    });

    return NextResponse.json({
      init_point: result.init_point,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error creando preferencia' },
      { status: 500 }
    );
  }
}