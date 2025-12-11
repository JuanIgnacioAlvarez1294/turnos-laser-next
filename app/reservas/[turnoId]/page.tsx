import { getTurnoById, getServicios } from '@/services/turnos.service';

export default async function TurnoPage({
  params,
}: {
  params: { turnoId: string };
}) {
  const turno = await getTurnoById(params.turnoId);

  if (!turno) {
    return <div className="p-4">No se encontró el turno.</div>;
  }

  const servicios = await getServicios();
  const servicio = servicios.find((s) => s.id === turno.servicioId);

  return (
    <div className="max-w-xl mx-auto py-12">
      <div
        className="bg-white border border-pink-200 shadow-lg rounded-2xl p-8 
                    animate-fadeIn"
      >
        <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">
          🌸 Reserva Confirmada
        </h1>

        <div className="space-y-2 text-gray-700 text-lg">
          <p>
            <strong className="text-pink-600">Servicio:</strong>{' '}
            {servicio?.nombre ?? 'Servicio eliminado'}
          </p>
          <p>
            <strong className="text-pink-600">Fecha:</strong> {turno.fecha}
          </p>
          <p>
            <strong className="text-pink-600">Hora:</strong> {turno.hora}
          </p>
          <p>
            <strong className="text-pink-600">Estado:</strong> {turno.estado}
          </p>
          <p>
            <strong className="text-pink-600">Email de contacto:</strong>{' '}
            {turno.emailContacto}
          </p>
        </div>

        <p className="mt-6 text-gray-600 text-center">
          Este turno ya fue registrado correctamente.
          <br />
          Te llegará un correo recordatorio 💌.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-pink-500 text-white rounded-xl shadow 
                     hover:bg-pink-600 transition font-medium"
          >
            Volver a Inicio
          </a>
        </div>
      </div>
    </div>
  );
}
