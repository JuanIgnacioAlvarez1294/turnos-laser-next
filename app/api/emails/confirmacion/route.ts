import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      nombre,
      apellido,
      email,
      fecha,
      hora,
      servicio,
      estado,
    } = await req.json();

    await resend.emails.send({
      from: "Láser Divino <onboarding@resend.dev>",
      to: email,
      subject: "🌸 Confirmación de tu turno",
      html: `
        <h2>Hola ${nombre} ${apellido} 💖</h2>
        <p>Tu turno fue confirmado con los siguientes datos:</p>

        <ul>
          <li><strong>Servicio:</strong> ${servicio}</li>
          <li><strong>Fecha:</strong> ${fecha}</li>
          <li><strong>Hora:</strong> ${hora}</li>
          <li><strong>Estado:</strong> ${estado}</li>
        </ul>

        <p>Si tenés alguna consulta, no dudes en contactarnos ✨</p>
        <p><strong>Láser Divino</strong></p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error enviando email", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
