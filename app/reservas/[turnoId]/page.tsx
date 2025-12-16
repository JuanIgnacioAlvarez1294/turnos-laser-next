// Importar Resend
import { Resend } from 'resend';
import { getTurnoById, getServicios } from '@/services/turnos.service';

// Iniciar Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY!);

// Función para enviar el correo de confirmación
async function sendConfirmationEmail(
  email: string,
  servicio: string,
  fecha: string,
  hora: string
) {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Reserva Confirmada',
      html: `
        <p>🌸 Tu turno de <strong>${servicio}</strong> está confirmado.</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Hora:</strong> ${hora}</p>
        <p>¡Te esperamos! 💖</p>
      `,
    });
    console.log('Correo de confirmación enviado');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

export default async function TurnoPage({
  params,
  searchParams,
}: {
  params: { turnoId: string };
  searchParams: { pago?: string };
}) {
  const turno = await getTurnoById(params.turnoId);

  if (!turno) {
    return <div className="p-4">No se encontró el turno.</div>;
  }

  const servicios = await getServicios();
  const servicio = servicios.find((s) => s.id === turno.servicioId);

  // 🔎 Detectar si viene de Mercado Pago
  const pagoExitoso = searchParams?.pago === 'success';

  // 📧 Enviar email SOLO si el pago fue exitoso
  if (pagoExitoso && turno.estado === 'confirmado') {
    await sendConfirmationEmail(
      turno.emailContacto,
      servicio?.nombre || 'Servicio',
      turno.fecha,
      turno.hora
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-rosa">

        {/* ✅ MENSAJE DE PAGO */}
        {pagoExitoso && (
          <div className="mb-6 p-4 rounded-xl bg-green-100 text-green-800 text-center font-semibold">
            💖 Pago confirmado correctamente. Tu turno ya está asegurado.
          </div>
        )}

        <h1 className="text-3xl font-bold text-rosa-fuerte text-center mb-6">
          🌸 Turno Confirmado
        </h1>

        <div className="space-y-3 text-gray-700 text-lg">
          <p>
            <strong className="text-rosa-fuerte">Servicio:</strong>{' '}
            {servicio?.nombre}
          </p>
          <p>
            <strong className="text-rosa-fuerte">Fecha:</strong> {turno.fecha}
          </p>
          <p>
            <strong className="text-rosa-fuerte">Hora:</strong> {turno.hora}
          </p>
          <p>
            <strong className="text-rosa-fuerte">Cliente:</strong>{' '}
            {turno.nombre}
          </p>
          <p>
            <strong className="text-rosa-fuerte">Email:</strong>{' '}
            {turno.emailContacto}
          </p>
          <p>
            <strong className="text-rosa-fuerte">Estado:</strong>{' '}
            {turno.estado}
          </p>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Recibirás un correo con la confirmación 💌
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-rosa-fuerte text-white rounded-xl hover:bg-rosa-oscuro transition shadow"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}