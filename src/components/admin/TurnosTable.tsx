"use client";

import React, { useEffect, useState } from "react";
import { Turno } from "@/types";
import { getTurnos, updateTurno, deleteTurno } from "@/services/turnos.service";
import { Trash2, Edit, XCircle } from "lucide-react";

const TurnosTable: React.FC = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTurnos = async () => {
    try {
      const data = await getTurnos();
      setTurnos(data);
    } catch (error) {
      console.error("Error fetching turnos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTurnos();
  }, []);

  const cancelarTurno = async (id: string) => {
    await updateTurno(id, { estado: "cancelado" });
    loadTurnos();
  };

  const borrarTurno = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este turno?")) return;
    await deleteTurno(id);
    loadTurnos();
  };

  if (loading) return <div>Cargando turnos...</div>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-xl">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Cliente</th>
            <th className="py-2 px-4 border-b">Servicio</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Hora</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {turnos.map((turno) => (
            <tr key={turno.turnoId} className="text-center">
              <td className="py-2 px-4 border-b">{turno.turnoId}</td>
              <td className="py-2 px-4 border-b">
                {turno.nombre} {turno.apellido}
              </td>
              <td className="py-2 px-4 border-b">{turno.servicioId}</td>
              <td className="py-2 px-4 border-b">{turno.fecha}</td>
              <td className="py-2 px-4 border-b">{turno.hora}</td>

              <td className="py-2 px-4 border-b font-semibold">
                <span
                  className={
                    turno.estado === "pendiente"
                      ? "text-yellow-600"
                      : turno.estado === "completado"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {turno.estado}
                </span>
              </td>

              <td className="py-2 px-4 border-b flex justify-center gap-3">

                {/* BOTÓN MODIFICAR */}
                <button
                  onClick={() =>
                    (window.location.href = `/admin/turnos/${turno.turnoId}`)
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-700"
                >
                  <Edit size={16} />
                  Modificar
                </button>

                {/* BOTÓN CANCELAR */}
                <button
                  onClick={() => cancelarTurno(turno.turnoId)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-yellow-600"
                >
                  <XCircle size={16} />
                  Cancelar
                </button>

                {/* ICONO BORRAR */}
                <button
                  onClick={() => borrarTurno(turno.turnoId)}
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
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