'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createTurno } from '@/services/turnos.service';
import { toast } from 'react-toastify';

export default function ConfirmPage() {
  const router = useRouter();
  const params = useSearchParams();

  const servicioId = params.get('servicio')!;
  const nombre = params.get('nombre')!;
  const apellido = params.get('apellido') || '';
  const telefono = params.get('telefono')!;
  const email = params.get('email')!;
  const fecha = params.get('fecha')!;
  const hora = params.get('hora')!;

  const [precioTotal, setPrecioTotal] = useState<number | null>(null);
  const [loadingPrecio, setLoadingPrecio] = useState(true);
  const [tipoPago, setTipoPago] = useState<'sena' | 'total' | null>(null);

  /* ---------------------------------------------
     OBTENER PRECIO REAL DEL SERVICIO
  ---------------------------------------------- */
  useEffect(() => {
    const fetchPrecio = async () => {
      try {
        const res = await fetch(`/api/servicio?id=${servicioId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        setPrecioTotal(data.precio);
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar el precio del servicio');
      } finally {
        setLoadingPrecio(false);
      }
    };

    fetchPrecio();
  }, [servicioId]);

  const sena = precioTotal ? precioTotal * 0.5 : 0;

  /* ---------------------------------------------
     CONFIRMAR RESERVA + MERCADO PAGO
  ---------------------------------------------- */
  const confirmarReserva = async () => {
    if (!precioTotal) return;

    if (!tipoPago) {
      toast.error('Seleccioná si querés pagar seña o total');
      return;
    }

    try {
      // 1️⃣ Crear turno
      const turnoId = await createTurno({
        nombre,
        apellido,
        telefono,
        email,
        emailContacto: email,
        servicioId,
        fecha,
        hora,
        estado: 'reservado',
        pago: 'pendiente',
      });

      // 2️⃣ Calcular monto a pagar
      const monto = tipoPago === 'sena' ? sena : precioTotal;

      // 3️⃣ Crear preferencia Mercado Pago
      const res = await fetch('/api/mercadopago/preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: `Reserva ${servicioId}`,
          precio: monto,
          turnoId,
          email,
        }),
      });

      const data = await res.json();

      if (!data.init_point) {
        throw new Error('No se pudo iniciar el pago');
      }

      // 4️⃣ Redirigir a Mercado Pago
      window.location.href = data.init_point;

    } catch (error) {
      toast.error('Error al crear el turno o iniciar el pago');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-rosa-fuerte mb-6 text-center">
        Confirmar reserva
      </h1>

      {/* 🧾 TARJETA */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-3">
        <p><strong>Servicio:</strong> {servicioId}</p>
        <p><strong>Nombre:</strong> {nombre} {apellido}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Teléfono:</strong> {telefono}</p>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Hora:</strong> {hora}</p>
      </div>

      {/* 💳 INFO PAGO */}
      <div className="mt-6 bg-rosa-pastel/40 p-4 rounded-xl text-sm text-gray-700">
        {loadingPrecio ? (
          <p>Cargando precio del servicio...</p>
        ) : (
          <>
            <p>
              💗 Para confirmar tu reserva debés abonar una seña del{' '}
              <strong>50%</strong> o el total del servicio.
            </p>
            <p className="mt-2"><strong>Total:</strong> ${precioTotal}</p>
            <p><strong>Seña (50%):</strong> ${sena}</p>
          </>
        )}
      </div>

      {/* 💰 BOTONES DE PAGO */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          onClick={() => setTipoPago('sena')}
          className={`py-3 rounded-lg border ${
            tipoPago === 'sena'
              ? 'bg-rosa-fuerte text-white'
              : 'border-rosa-fuerte text-rosa-fuerte'
          }`}
        >
          Pagar seña 50%
        </button>

        <button
          onClick={() => setTipoPago('total')}
          className={`py-3 rounded-lg border ${
            tipoPago === 'total'
              ? 'bg-rosa-fuerte text-white'
              : 'border-rosa-fuerte text-rosa-fuerte'
          }`}
        >
          Pagar total
        </button>
      </div>

      {/* ✅ CONFIRMAR */}
      <div className="mt-6">
        <button
          onClick={confirmarReserva}
          disabled={loadingPrecio}
          className="btn-principal w-full py-3 rounded-lg disabled:opacity-50"
        >
          Confirmar reserva
        </button>

        <button
          onClick={() => router.back()}
          className="w-full mt-6 py-3 rounded-lg border border-rosa text-rosa-fuerte hover:bg-gray-100 transition"
        >
          Volver a la página anterior
        </button>
      </div>
    </div>
  );
}