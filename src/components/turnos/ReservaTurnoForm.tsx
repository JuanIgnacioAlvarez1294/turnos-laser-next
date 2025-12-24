'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTurnosByFecha } from '@/services/turnos.service';
import { notifyError } from '@/utils/notifications';

// ✅ Movido fuera del componente para evitar errores de dependencias en useEffect
const HORARIOS_BASE = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

type Servicio = {
  id: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
  promo?: boolean;
};

interface Props {
  servicios: Servicio[];
  user?: { uid?: string | null; email?: string | null } | null;
}

export default function ReservaTurnoForm({ servicios, user = null }: Props) {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [emailContacto, setEmailContacto] = useState(user?.email ?? '');
  const [servicioId, setServicioId] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([]);
  const [loadingHoras, setLoadingHoras] = useState(false);

  // Cargar horarios ocupados desde Firebase
  useEffect(() => {
    const fetchHorarios = async () => {
      if (!fecha) {
        setHorariosDisponibles([]);
        return;
      }
      setLoadingHoras(true);
      try {
        const turnos = await getTurnosByFecha(fecha);
        const ocupados = turnos.map((t) => t.hora);
        // Ahora HORARIOS_BASE es accesible sin ser dependencia
        const libres = HORARIOS_BASE.filter((h) => !ocupados.includes(h));
        setHorariosDisponibles(libres);
      } catch (err) {
        console.error(err);
        notifyError('Error cargando horarios');
      } finally {
        setLoadingHoras(false);
      }
    };
    fetchHorarios();
  }, [fecha]); // ✅ ESLint ya no se queja porque HORARIOS_BASE es externa

  const irAConfirmacion = () => {
    if (!nombre.trim() || !apellido.trim()) return notifyError('Nombre y apellido son obligatorios');
    if (!emailContacto || !emailContacto.includes('@')) return notifyError('Email inválido');
    if (!servicioId) return notifyError('Selecciona un servicio');
    if (!fecha || !hora) return notifyError('Selecciona fecha y hora');

    const params = new URLSearchParams({
      servicio: servicioId,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      telefono: telefono.trim(),
      email: emailContacto.trim(),
      fecha,
      hora
    });

    router.push(`/reservas/confirm?${params.toString()}`);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(value);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-pink-200 space-y-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold text-pink-600 text-center">
        🌸 Reservar Turno
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="border border-pink-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="border border-pink-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="border border-pink-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Teléfono (Ej: 1122334455)"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          className="border border-pink-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Email de contacto"
          value={emailContacto}
          onChange={(e) => setEmailContacto(e.target.value)}
          type="email"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          className="border border-pink-300 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={servicioId}
          onChange={(e) => setServicioId(e.target.value)}
        >
          <option value="">Seleccionar servicio...</option>
          {servicios.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre} {s.precio ? `- ${formatCurrency(s.precio)}` : ''}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border border-pink-300 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-pink-600">Horarios disponibles</label>
        {loadingHoras ? (
          <p className="text-pink-500">Cargando horarios...</p>
        ) : horariosDisponibles.length === 0 ? (
          <p className="text-gray-400 text-sm italic">Selecciona una fecha para ver horarios</p>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {horariosDisponibles.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHora(h)}
                className={`px-4 py-2 rounded-xl border transition ${
                  hora === h
                    ? 'bg-pink-500 text-white border-pink-600 shadow'
                    : 'border-pink-300 hover:bg-pink-100 text-pink-700'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4">
        <button
          onClick={irAConfirmacion}
          className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-lg transition-all transform hover:scale-[1.01]"
        >
          Siguiente: Confirmar y Pagar ➔
        </button>
        <p className="text-center text-xs text-gray-500 mt-3">
          Podrás elegir pagar seña o total en el siguiente paso.
        </p>
      </div>
    </div>
  );
}