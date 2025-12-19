'use client';

import React, { useEffect, useState } from 'react';
import { Turno } from '@/types';
import {
  getServiciosMap,
  getTurnos,
  updateTurno,
  deleteTurno,
} from '@/services/turnos.service';
import { Trash2, Edit, XCircle } from 'lucide-react';

const TurnosTable: React.FC = () => {
  const [serviciosMap, setServiciosMap] = useState<Record<string, string>>({});
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const [mapServicios, dataTurnos] = await Promise.all([
      getServiciosMap(),
      getTurnos(),
    ]);
    setServiciosMap(mapServicios);
    setTurnos(dataTurnos);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const cancelarTurno = async (id: string) => {
    await updateTurno(id, { estado: 'cancelado' });
    loadData();
  };

  const borrarTurno = async (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar este turno?')) return;
    await deleteTurno(id);
    loadData();
  };

  if (loading) return <div>Cargando turnos...</div>;

  return (
    <div className="max-h-[400px] overflow-y-auto rounded-xl shadow border border-pink-300 bg-white mt-8">
      <table className="min-w-full bg-white border border-rosa-pastel shadow-xl rounded-xl">
        <thead className="bg-rosa-pastel text-rosa-oscuro sticky top-0 z-10">
          <tr>
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Cliente</th>
            <th className="py-3 px-4 border-b">Servicio</th>
            <th className="py-3 px-4 border-b">Fecha</th>
            <th className="py-3 px-4 border-b">Hora</th>
            <th className="py-3 px-4 border-b">Estado</th>
            <th className="py-3 px-4 border-b">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {turnos.map((turno) => (
            <tr
              key={turno.turnoId}
              className="text-center hover:bg-rosa-fondo transition"
            >
              <td className="py-2 px-4 border-b">
                {decodeURIComponent(turno.turnoId)}
              </td>

              <td className="py-2 px-4 border-b">
                {turno.nombre} {turno.apellido}
              </td>

              <td className="py-2 px-4 border-b">
                {serviciosMap[turno.servicioId] ?? 'Servicio eliminado'}
              </td>

              <td className="py-2 px-4 border-b">{turno.fecha}</td>
              <td className="py-2 px-4 border-b">{turno.hora}</td>

              <td className="py-2 px-4 border-b font-semibold">
                {turno.estado === 'reservado' && turno.pago === 'pendiente' && (
                  <span className="text-yellow-600">Reservado (sin pago)</span>
                )}

                {turno.estado === 'reservado' && turno.pago === 'sena' && (
                  <span className="text-orange-600">Reservado (Seña)</span>
                )}

                {turno.estado === 'reservado' && turno.pago === 'total' && (
                  <span className="text-green-600">Reservado (Pago total)</span>
                )}

                {turno.estado !== 'reservado' && (
                  <span
                    className={
                      turno.estado === 'pendiente'
                        ? 'text-rosa-oscuro'
                        : turno.estado === 'completado'
                        ? 'text-green-600'
                        : 'text-red-500'
                    }
                  >
                    {turno.estado}
                  </span>
                )}
              </td>

              <td className="py-2 px-4 border-b flex justify-center gap-3">
                <button
                  onClick={() =>
                    (window.location.href = `/admin/turnos/${turno.turnoId}`)
                  }
                  className="bg-rosa-fuerte text-white px-3 py-1 rounded hover:bg-rosa-oscuro transition flex items-center gap-1"
                >
                  <Edit size={16} />
                  Editar
                </button>

                <button
                  onClick={() => cancelarTurno(turno.turnoId)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition flex items-center gap-1"
                >
                  <XCircle size={16} />
                  Cancelar
                </button>

                <button
                  onClick={() => borrarTurno(turno.turnoId)}
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TurnosTable;