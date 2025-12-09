import React from 'react';

interface TurnoCardProps {
  servicio: string;
  fecha: string;
  hora: string;
  sucursal: string;
  estado: 'reservado' | 'cancelado' | 'completado';
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
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{servicio}</h3>
      <p className="text-gray-600">Fecha: {fecha}</p>
      <p className="text-gray-600">Hora: {hora}</p>
      <p className="text-gray-600">Sucursal: {sucursal}</p>
      <p className={`text-sm ${estado === 'reservado' ? 'text-green-500' : 'text-red-500'}`}>
        Estado: {estado}
      </p>
      <div className="mt-4">
        <button
          onClick={onModify}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Modificar
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default TurnoCard;