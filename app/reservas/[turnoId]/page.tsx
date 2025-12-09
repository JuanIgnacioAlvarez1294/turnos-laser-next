import * as turnosService from "@/services/turnos.service";

export default async function TurnoPage({ params }: { params: { turnoId: string } }) {
  const turno = await turnosService.getTurnoById(params.turnoId);

  if (!turno) {
    return <div className="p-4">No se encontró el turno.</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <div className="p-4 border rounded shadow bg-white">
        <h1 className="text-xl font-semibold mb-4">Reserva Confirmada</h1>

        <p><strong>Servicio:</strong> {turno.servicioId}</p>
        <p><strong>Fecha:</strong> {turno.fecha}</p>
        <p><strong>Hora:</strong> {turno.hora}</p>
        <p><strong>Estado:</strong> {turno.estado}</p>
        <p><strong>Email de contacto:</strong> {turno.emailContacto}</p>

        <p className="mt-4 text-gray-600">
          Este turno ya fue registrado correctamente. Te llegará un correo recordatorio.
        </p>
      </div>
    </div>
  );
}