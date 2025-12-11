"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Turno } from "@/types";
import {
  getTurnoById,
  updateTurno,
  getServicios,
} from "@/services/turnos.service";

export default function EditTurnoPage() {
  const params = useParams();
  const router = useRouter();

  // ID crudo que viene de la URL
  const rawId = params.turnoId as string;

  // ID decodificado (email real)
  const decodedId = decodeURIComponent(rawId);

  const [turno, setTurno] = useState<Turno | null>(null);
  const [servicios, setServicios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTurno = async () => {
      const data = await getTurnoById(decodedId);
      const serv = await getServicios();

      setTurno(data);
      setServicios(serv);
      setLoading(false);
    };

    loadTurno();
  }, [decodedId]);

  const handleChange = (e: any) => {
    if (!turno) return;
    setTurno({ ...turno, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    await updateTurno(decodedId, turno!);
    alert("Turno actualizado correctamente");
    router.push("/admin");
  };

  const marcarCompletado = async () => {
    await updateTurno(decodedId, { estado: "completado" });
    alert("Turno marcado como COMPLETADO");
    router.push("/admin");
  };

  const cancelarTurno = async () => {
    await updateTurno(decodedId, { estado: "cancelado" });
    alert("Turno CANCELADO");
    router.push("/admin");
  };

  if (loading) return <div className="p-4">Cargando turno...</div>;
  if (!turno) return <div className="p-4">Turno no encontrado</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Editar Turno</h1>

      {/* Nombre */}
      <label className="block mb-2">Nombre</label>
      <input
        name="nombre"
        value={turno.nombre}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-4"
      />

      {/* Apellido */}
      <label className="block mb-2">Apellido</label>
      <input
        name="apellido"
        value={turno.apellido}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-4"
      />

      {/* Telefono */}
      <label className="block mb-2">Teléfono</label>
      <input
        name="telefono"
        value={turno.telefono}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-4"
      />

      {/* Email */}
      <label className="block mb-2">Email</label>
      <input
        name="email"
        value={turno.email}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-4"
      />

      {/* Email Contacto */}
      <label className="block mb-2">Email de Contacto</label>
      <input
        name="emailContacto"
        value={turno.emailContacto}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-4"
      />

      {/* Fecha */}
      <label className="block mb-2">Fecha</label>
      <input
        type="date"
        name="fecha"
        value={turno.fecha}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-4"
      />

      {/* Hora */}
      <label className="block mb-2">Hora</label>
      <input
        type="time"
        name="hora"
        value={turno.hora}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-4"
      />

      {/* Servicio */}
      <label className="block mb-2">Servicio</label>
      <select
        name="servicioId"
        value={turno.servicioId}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-4"
      >
        <option value="">Seleccionar servicio</option>
        {servicios.map((s) => (
          <option key={s.id} value={s.id}>
            {s.nombre}
          </option>
        ))}
      </select>

      {/* Estado del turno */}
      <label className="block mb-2">Estado del Turno</label>
      <select
        name="estado"
        value={turno.estado}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-4"
      >
        <option value="pendiente">Pendiente</option>
        <option value="reservado">Reservado</option>
        <option value="completado">Completado</option>
        <option value="cancelado">Cancelado</option>
      </select>

      {/* Pago */}
      <label className="block mb-2">Estado de Pago</label>
      <select
        name="pago"
        value={turno.pago}
        onChange={handleChange}
        className="border p-2 w-full rounded mb-6"
      >
        <option value="pendiente">Pendiente</option>
        <option value="aprobado">Aprobado</option>
      </select>

      {/* Botones */}
      <div className="flex justify-between mt-4">
        <button
          onClick={guardarCambios}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Guardar Cambios
        </button>

        <button
          onClick={marcarCompletado}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Marcar Completado
        </button>

        <button
          onClick={cancelarTurno}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Cancelar Turno
        </button>
      </div>

      <button
        onClick={() => router.push("/admin")}
        className="mt-6 w-full text-center py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        Volver al Dashboard
      </button>
    </div>
  );
}