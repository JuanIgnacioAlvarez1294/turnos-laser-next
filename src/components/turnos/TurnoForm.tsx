import { Turno } from '@/types';

interface Props {
  turno?: Turno;
  servicios: { id: string; nombre: string }[];
  onSubmit: (data: Turno) => void;
}

export default function TurnoForm({ turno, servicios, onSubmit }: Props) {
  if (!turno) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // TypeScript: name es una key de Turno
    (turno as any)[name] = value;
  };

  return (
    <form
      className="bg-white p-6 rounded-2xl shadow-md border border-pink-200 max-w-xl mx-auto space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(turno);
      }}
    >
      <h2 className="text-2xl font-semibold text-pink-600 mb-2">
        Editar Información del Turno
      </h2>

      {/* Servicio */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700">Servicio</label>
        <select
          name="servicioId"
          value={turno.servicioId}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-2 w-full focus:ring-2 focus:ring-pink-300"
        >
          {servicios.map((srv) => (
            <option key={srv.id} value={srv.id}>
              {srv.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Fecha */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700">Fecha</label>
        <input
          type="date"
          name="fecha"
          defaultValue={turno.fecha}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-2 w-full focus:ring-2 focus:ring-pink-300"
        />
      </div>

      {/* Hora */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700">Hora</label>
        <input
          type="time"
          name="hora"
          defaultValue={turno.hora}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-2 w-full focus:ring-2 focus:ring-pink-300"
        />
      </div>

      {/* Botón Guardar */}
      <button
        type="submit"
        className="w-full bg-pink-500 text-white py-2 rounded-xl shadow hover:bg-pink-600 transition"
      >
        Guardar Cambios
      </button>
    </form>
  );
}
