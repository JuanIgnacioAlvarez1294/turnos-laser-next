export const dynamic = 'force-dynamic';

import { getTurnoById } from "@/services/turnos.service";
import Link from "next/link";

// 1. Definimos la estructura del Turno para que TypeScript no se queje
interface Turno {
  id: string;
  nombre: string;
  apellido: string;
  fecha: string;
  hora: string;
  estado: string;
}

interface PageProps {
  params: { turnoId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DetalleReservaPage({ params, searchParams }: PageProps) {
  const id = params?.turnoId;
  
  try {
    if (!id) throw new Error("ID de turno no proporcionado");

    // 2. Le decimos a TS que lo que devuelve getTurnoById es un Turno o null
    const turno = await getTurnoById(id) as Turno | null;

    if (!turno) {
      return (
        <div className="p-10 text-center font-sans">
          <h1 className="text-xl font-bold text-gray-800">Reserva no encontrada</h1>
          <p className="text-gray-500 mb-6">No pudimos encontrar el turno con ID: {id}</p>
          <Link href="/" className="bg-pink-500 text-white px-6 py-2 rounded-full">Volver al inicio</Link>
        </div>
      );
    }

    const status = searchParams?.status || searchParams?.collection_status;
    const esExitoso = status === "approved" || turno.estado === "confirmado";

    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className={`p-8 text-center ${esExitoso ? 'bg-green-500' : 'bg-pink-500'} text-white`}>
            <h1 className="text-2xl font-bold uppercase tracking-tight">
              {esExitoso ? "¡Pago Confirmado!" : "Estado de Reserva"}
            </h1>
          </div>
          <div className="p-8 space-y-4 text-gray-800">
            {/* Ahora TS ya sabe que estas propiedades existen */}
            <p className="text-sm"><strong>Paciente:</strong> {turno.nombre} {turno.apellido}</p>
            <p className="text-sm"><strong>Fecha:</strong> {turno.fecha}</p>
            <p className="text-sm"><strong>Hora:</strong> {turno.hora} hs</p>
            <div className={`p-3 rounded-lg text-center font-bold ${esExitoso ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {esExitoso ? "PAGO APROBADO" : "PENDIENTE DE PAGO"}
            </div>
            <Link href="/" className="block w-full text-center py-3 bg-gray-900 text-white rounded-xl font-bold mt-4">
              Finalizar
            </Link>
          </div>
        </div>
      </div>
    );

  } catch (error: unknown) {
    // Usamos unknown y una verificación de error para evitar el error de ESLint "any"
    const message = error instanceof Error ? error.message : "Error desconocido";
    
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-500 max-w-sm w-full text-center">
          <h2 className="text-red-600 font-bold text-lg mb-2">Estado del Turno</h2>
          <p className="text-gray-600 text-sm mb-4">
            Tu reserva fue procesada. Si tienes dudas, contáctanos con tu ID de turno.
          </p>
          <div className="bg-gray-50 p-2 rounded text-[10px] font-mono text-gray-400 break-all">
            ID: {id} | {message}
          </div>
          <Link href="/" className="mt-4 block bg-pink-500 text-white py-2 rounded-lg text-sm font-bold">
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }
}