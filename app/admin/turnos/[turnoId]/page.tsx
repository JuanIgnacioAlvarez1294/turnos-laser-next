'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Turno } from '@/types';
import {
  getTurnoById,
  updateTurno,
  getServicios,
  ServicioFromDB,
} from '@/services/turnos.service';
import { toast } from 'react-toastify';

export default function EditTurnoPage() {
  const params = useParams();
  const router = useRouter();

  // El ID ahora es el generado por Firebase
  const turnoId = params.turnoId as string;

  const [turno, setTurno] = useState<Turno | null>(null);
  const [servicios, setServicios] = useState<ServicioFromDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getTurnoById(turnoId);
        const serv = await getServicios();

        if (data) {
          setTurno(data);
        }
        setServicios(serv);
      } catch (error) {
        console.error("Error cargando datos:", error);
        toast.error("No se pudo cargar la información");
      } finally {
        setLoading(false);
      }
    };

    if (turnoId) loadData();
  }, [turnoId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!turno) return;
    setTurno({ ...turno, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    try {
      await updateTurno(turnoId, turno!);
      toast.success('Turno actualizado correctamente');
      router.push('/admin');
    } catch {
      toast.error('Error al guardar');
    }
  };

  const marcarCompletado = async () => {
    try {
      await updateTurno(turnoId, { estado: 'completado' });
      toast.success('Turno marcado como COMPLETADO');
      router.push('/admin');
    } catch {
      toast.error('Error al actualizar estado');
    }
  };

  const cancelarTurno = async () => {
    if (!confirm('¿Estás seguro de cancelar este turno?')) return;
    try {
      await updateTurno(turnoId, { estado: 'cancelado' });
      toast.error('Turno CANCELADO');
      router.push('/admin');
    } catch {
      toast.error('Error al cancelar');
    }
  };

  if (loading) return <div className="p-8 text-center">Cargando detalles del turno...</div>;
  if (!turno) return <div className="p-8 text-center">Turno no encontrado (ID: {turnoId})</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-xl rounded-2xl border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestionar Turno</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input name="nombre" value={turno.nombre} onChange={handleChange} className="border p-2 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
          <input name="apellido" value={turno.apellido} onChange={handleChange} className="border p-2 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input name="telefono" value={turno.telefono} onChange={handleChange} className="border p-2 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Contacto</label>
          <input name="emailContacto" value={turno.emailContacto} onChange={handleChange} className="border p-2 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input type="date" name="fecha" value={turno.fecha} onChange={handleChange} className="border p-2 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
          <input type="time" name="hora" value={turno.hora} onChange={handleChange} className="border p-2 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
      <select name="servicioId" value={turno.servicioId} onChange={handleChange} className="border p-2 w-full rounded-lg mb-4 bg-white outline-none">
        {servicios.map((s) => (
          <option key={s.id} value={s.id}>{s.nombre}</option>
        ))}
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado del Turno</label>
          <select name="estado" value={turno.estado} onChange={handleChange} className="border p-2 w-full rounded-lg mb-4 bg-white outline-none">
            <option value="pendiente">Pendiente (Sin pagar)</option>
            <option value="confirmado">Confirmado (Pagado)</option>
            <option value="completado">Completado ✅</option>
            <option value="cancelado">Cancelado ❌</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado del Pago</label>
          <select name="pago" value={turno.pago} onChange={handleChange} className="border p-2 w-full rounded-lg mb-6 bg-white outline-none">
            <option value="pendiente">Pendiente</option>
            <option value="sena">Seña Pagada</option>
            <option value="total">Total Pagado</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
        <button onClick={guardarCambios} className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition shadow-md font-medium">
          Guardar Cambios
        </button>

        <button onClick={marcarCompletado} className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition shadow-md font-medium">
          Marcar Completado
        </button>

        <button onClick={cancelarTurno} className="bg-white text-red-600 border border-red-200 px-6 py-2 rounded-xl hover:bg-red-50 transition font-medium">
          Cancelar Turno
        </button>
      </div>

      <button onClick={() => router.push('/admin')} className="mt-8 w-full text-center py-2 text-gray-500 hover:text-gray-800 transition text-sm">
        ← Volver al Dashboard
      </button>
    </div>
  );
}