// src/components/turnos/ReservaTurnoForm.tsx
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
  const [servicioId, setServicioId] = useState("");
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([]);
  const [loadingHoras, setLoadingHoras] = useState(false);

  const HORARIOS_BASE = [
    '10:00',
    '11:00',
    '12:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  // Obtener precio del servicio seleccionado
  const servicioSeleccionado = servicios.find((s) => s.id === servicioId);
  const precio = servicioSeleccionado?.precio ?? 0;
  const senia = Math.round((precio || 0) * 0.2);

  useEffect(() => {
    // cuando cambia la fecha, cargar horarios disponibles
    const fetch = async () => {
      if (!fecha) {
        setHorariosDisponibles([]);
        return;
      }
      setLoadingHoras(true);
      try {
        const turnos = await getTurnosByFecha(fecha);
        const ocup = turnos.map((t) => t.hora);
        const libres = HORARIOS_BASE.filter((h) => !ocup.includes(h));
        setHorariosDisponibles(libres);
      } catch (err) {
        console.error(err);
        notifyError('Error cargando horarios');
      } finally {
        setLoadingHoras(false);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fecha]);

  const validarYCrear = async () => {
    // validaciones
    if (!nombre.trim() || !apellido.trim())
      return notifyError('Nombre y apellido son obligatorios');
    if (!emailContacto || !emailContacto.includes('@'))
      return notifyError('Email de contacto inválido');
    if (!servicioId) return notifyError('Selecciona un servicio');
    if (!fecha || !hora) return notifyError('Selecciona fecha y hora');

    // construir turno (sin turnoId)
    const nuevoTurno: Omit<Turno, 'turnoId'> = {
      userId: user?.uid ?? '', // si no hay user, se guarda cadena vacía
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

  // Enlaces temporales de Mercado Pago (reemplazar por los definitivos)
  const mpLinkSenia = `https://mpago.la/tu-link-de-prueba-senia?amount=${senia}`;
  const mpLinkTotal = `https://mpago.la/tu-link-de-prueba-total?amount=${precio}`;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(value);

  return (
    <div className="p-4 border rounded-md shadow-sm bg-white space-y-4">
      <h3 className="text-xl font-semibold">
        {/* titulo condicional si querés */}Reservar Turno
      </h3>

      <div className="grid grid-cols-2 gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Email de contacto"
          value={emailContacto}
          onChange={(e) => setEmailContacto(e.target.value)}
          type="email"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select
          className="border p-2 rounded"
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
          className="border p-2 rounded"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div>
        <label className="block mb-1">Hora</label>
        {loadingHoras ? (
          <p>Cargando horarios...</p>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {horariosDisponibles.length === 0 ? (
              <p className="text-red-600">No hay horarios disponibles</p>
            ) : (
              horariosDisponibles.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHora(h)}
                  className={`border rounded px-3 py-1 ${
                    hora === h ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {h}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* AVISO DE PAGO */}
      <div className="border-l-4 border-blue-400 bg-blue-50 p-3 rounded">
        <p className="font-medium">
          🔷 Para finalizar la reserva es necesario abonar una seña del 20% del
          valor del servicio seleccionado.
        </p>
        <div className="mt-2 flex flex-col gap-1">
          <div>
            Precio total: <strong>{formatCurrency(precio)}</strong>
          </div>
          <div>
            Monto de la seña (20%): <strong>{formatCurrency(senia)}</strong>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <a
            href={mpLinkSenia}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center border p-2 rounded bg-white hover:shadow"
          >
            Pagar Seña (20%)
          </a>
          <a
            href={mpLinkTotal}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center border p-2 rounded bg-white hover:shadow"
          >
            Pagar Turno Completo
          </a>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          Al pagar serás redirigido al sistema de pago. Actualmente estos links
          son de prueba y deben reemplazarse por los definitivos de Mercado
          Pago.
        </p>
      </div>

      <div>
        <button
          onClick={validarYCrear}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Confirmar reserva (guardar turno)
        </button>
      </div>
    </div>
  );
}
