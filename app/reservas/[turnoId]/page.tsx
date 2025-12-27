export const dynamic = 'force-dynamic';

import { getTurnoById, updateTurno } from '@/services/turnos.service';
import type { Turno } from '@/types';
import Link from 'next/link';

interface PageProps {
  params: { turnoId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DetalleReservaPage({
  params,
  searchParams,
}: PageProps) {
  const id = params?.turnoId;

  try {
    if (!id) throw new Error('ID de turno no proporcionado');

    const turno: Turno | null = await getTurnoById(id);

    if (!turno) {
      return (
        <div className="p-10 text-center">
          <h1 className="text-xl font-bold">Reserva no encontrada</h1>
          <Link href="/" className="text-pink-500 underline">
            Volver al inicio
          </Link>
        </div>
      );
    }

    const status = searchParams?.status || searchParams?.collection_status;

    const esExitoso = status === 'approved' || turno.estado === 'confirmado';

    // ✅ ACTUALIZAMOS EL TURNO SOLO SI EL PAGO FUE APROBADO
    if (esExitoso && turno.estado !== 'confirmado') {
      await updateTurno(id, {
        estado: 'confirmado',
        metodoPago: 'mercadopago',
      });
    }

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/emails/confirmacion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: turno.nombre,
        apellido: turno.apellido,
        email: turno.emailContacto,
        fecha: turno.fecha,
        hora: turno.hora,
        servicio: turno.servicioId,
        estado: turno.estado,
      }),
    });

    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">
          <div className="px-6 py-5 text-center border-b">
            <h1 className="text-2xl font-bold text-pink-600">
              🌸 Reserva Confirmada
            </h1>
          </div>

          <div className="p-6 space-y-3 text-sm text-gray-700">
            <p>
              <strong className="text-pink-600">Servicio:</strong>{' '}
              {turno.servicioId}
            </p>

            <p>
              <strong className="text-pink-600">Cliente:</strong> {turno.nombre}{' '}
              {turno.apellido}
            </p>

            <p>
              <strong className="text-pink-600">Fecha:</strong> {turno.fecha}
            </p>

            <p>
              <strong className="text-pink-600">Hora:</strong> {turno.hora}
            </p>

            <p>
              <strong className="text-pink-600">Email:</strong>{' '}
              {turno.emailContacto ?? '—'}
            </p>

            <p className="mt-3 text-center text-sm text-gray-500">
              📧 Vas a recibir un correo con la confirmación de tu turno
            </p>

            <div
              className={`mt-4 text-center font-semibold py-2 rounded-lg ${
                esExitoso
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {turno.pago === 'sena'
                ? 'RESERVADO (PAGO SEÑA)'
                : 'RESERVADO (PAGO TOTAL)'}
            </div>

            <Link
              href="/"
              className="block w-full mt-4 text-center bg-pink-500 text-white py-3 rounded-xl font-semibold"
            >
              Volver a Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Ocurrió un error al cargar la reserva</p>
      </div>
    );
  }
}
