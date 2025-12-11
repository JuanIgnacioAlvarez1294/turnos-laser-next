import React from "react";

interface TurnoCardProps {
  servicio: string;
  fecha: string;
  hora: string;
  sucursal: string;
  estado: "reservado" | "cancelado" | "completado";
  onCancel: () => void;
  onModify: () => void;
}

const TurnoCard: React.FC<TurnoCardProps> = ({
  servicio,
  fecha,
  hora,
  sucursal,
  estado,
  onCancel,
  onModify,
}) => {
  const estadoColors: Record<string, string> = {
    reservado: "text-green-600 bg-green-100",
    completado: "text-blue-600 bg-blue-100",
    cancelado: "text-red-600 bg-red-100",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-pink-200 p-6 mb-4 hover:shadow-lg transition">
      {/* Servicio */}
      <h3 className="text-2xl font-semibold text-pink-600 mb-2">{servicio}</h3>

      {/* Info del turno */}
      <div className="space-y-1 text-gray-700">
        <p><strong>📅 Fecha:</strong> {fecha}</p>
        <p><strong>⏰ Hora:</strong> {hora}</p>
        <p><strong>📍 Sucursal:</strong> {sucursal}</p>

        <p
          className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${estadoColors[estado]}`}
        >
          Estado: {estado}
        </p>
      </div>

      {/* BOTONES */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={onModify}
          className="flex-1 bg-pink-500 text-white py-2 rounded-xl shadow-sm hover:bg-pink-600 transition"
        >
          ✏️ Modificar
        </button>

        <button
          onClick={onCancel}
          className="flex-1 bg-red-500 text-white py-2 rounded-xl shadow-sm hover:bg-red-600 transition"
        >
          ❌ Cancelar
        </button>
      </div>
    </div>
  );
};

export default TurnoCard;