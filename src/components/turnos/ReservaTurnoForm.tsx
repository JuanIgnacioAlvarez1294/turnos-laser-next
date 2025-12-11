'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTurno, getTurnosByFecha } from '@/services/turnos.service';
import { notifySuccess, notifyError } from '@/utils/notifications';
import { Turno } from '@/types';

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

  const HORARIOS_BASE = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  const servicioSeleccionado = servicios.find((s) => s.id === servicioId);
  const precio = servicioSeleccionado?.precio ?? 0;
  const senia = Math.round(precio * 0.2);

  useEffect(() => {
    const fetch = async () => {
      if (!fecha) {
        setHorariosDisponibles([]);
        return;
      }
      setLoadingHoras(true);
      try {
        const turnos = await getTurnosByFecha(fecha);
        const ocupados = turnos.map((t) => t.hora);
        const libres = HORARIOS_BASE.filter((h) => !ocupados.includes(h));
        setHorariosDisponibles(libres);
      } catch (err) {
        console.error(err);
        notifyError('Error cargando horarios');
      } finally {
        setLoadingHoras(false);
      }
    };
    fetch();
  }, [fecha]);

  const validarYCrear = async () => {
    if (!nombre.trim() || !apellido.trim())
      return notifyError('Nombre y apellido son obligatorios');

    if (!emailContacto || !emailContacto.includes('@'))
      return notifyError('Email inválido');

    if (!servicioId) return notifyError('Selecciona un servicio');
    if (!fecha || !hora) return notifyError('Selecciona fecha y hora');

    const nuevoTurno: Omit<Turno, 'turnoId'> = {
      userId: user?.uid ?? '',
      nombre,
      apellido,
      telefono,
      email: emailContacto,
      emailContacto,
      servicioId,
      fecha,
      hora,
      estado: 'pendiente',
      pago: 'pendiente',
      sucursal: 'principal',
      tiempoEstimado: '30m',
      createdAt: new Date(),
    };

    try {
      const id = await createTurno(nuevoTurno);
      notifySuccess('Turno creado correctamente');
      router.push(`/reservas/${id}`);
    } catch (err) {
      console.error(err);
      notifyError('Error al crear el turno');
    }
  };

  const mpLinkSenia = `https://mpago.la/senia?amount=${senia}`;
  const mpLinkTotal = `https://mpago.la/total?amount=${precio}`;

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

      {/* Datos personales */}
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
          placeholder="Teléfono"
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

      {/* Servicio y fecha */}
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

      {/* Horarios */}
      <div>
        <label className="block mb-2 font-medium text-pink-600">Horarios disponibles</label>

        {loadingHoras ? (
          <p className="text-pink-500">Cargando horarios...</p>
        ) : horariosDisponibles.length === 0 ? (
          <p className="text-red-500">No hay horarios disponibles</p>
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
                    : 'border-pink-300 hover:bg-pink-100'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Pago */}
      <div className="p-4 bg-pink-50 border border-pink-200 rounded-xl shadow-sm">
        <p className="font-medium text-pink-700">
          💗 Para confirmar tu reserva debes abonar una seña del 20%.
        </p>

        <div className="mt-3 text-pink-700 space-y-1">
          <p>Precio total: <strong>{formatCurrency(precio)}</strong></p>
          <p>Seña (20%): <strong>{formatCurrency(senia)}</strong></p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <a
            href={mpLinkSenia}
            target="_blank"
            className="flex-1 text-center p-3 bg-white border border-pink-300 rounded-xl hover:bg-pink-100"
          >
            Pagar Seña (20%)
          </a>
          <a
            href={mpLinkTotal}
            target="_blank"
            className="flex-1 text-center p-3 bg-white border border-pink-300 rounded-xl hover:bg-pink-100"
          >
            Pagar Total
          </a>
        </div>
      </div>

      {/* Confirmar */}
      <button
        onClick={validarYCrear}
        className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl shadow transition"
      >
        Confirmar Reserva
      </button>
    </div>
  );
}