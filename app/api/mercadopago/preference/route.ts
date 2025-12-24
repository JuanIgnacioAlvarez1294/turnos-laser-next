import { NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Extraemos con los nombres que vienen del fetch (titulo y precio)
    const { turnoId, titulo, precio, email, tipoPago } = body;

    // 2. Validaciones de seguridad
    if (!turnoId || !precio) {
      return NextResponse.json(
        { error: "turnoId y precio son requeridos" },
        { status: 400 }
      );
    }

    // Aseguramos que el precio sea un número
    const unitPrice = Number(precio);

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: turnoId,
            title: titulo || "Reserva de Turno",
            quantity: 1,
            unit_price: unitPrice, // ✅ Ahora sí tiene un valor numérico
            currency_id: "ARS",
          },
        ],

        payer: {
          email: email,
        },

        // Usamos metadata para pasar info extra al Webhook
        metadata: {
          turno_id: turnoId,
          tipo_pago: tipoPago,
        },

        external_reference: turnoId,

        // URLs de retorno: Corregido para que apunte a la página final del turno
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/reservas/${turnoId}?pago=success`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/reservas/${turnoId}?pago=failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/reservas/${turnoId}?pago=pending`,
        },

        auto_return: "approved",
      },
    });

    return NextResponse.json({
      init_point: result.init_point,
    });
  } catch (error) {
    console.error("Error MP Preference:", error);
    return NextResponse.json(
      { error: "Error al crear la preferencia" },
      { status: 500 }
    );
  }
}