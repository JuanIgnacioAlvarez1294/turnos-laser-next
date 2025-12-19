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
          tipoPago,
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
        <p>
          <strong>Servicio:</strong> {servicioId}
        </p>
        <p>
          <strong>Nombre:</strong> {nombre} {apellido}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Teléfono:</strong> {telefono}
        </p>
        <p>
          <strong>Fecha:</strong> {fecha}
        </p>
        <p>
          <strong>Hora:</strong> {hora}
        </p>
      </div>

      {/* 💳 PAGO */}
      <div className="mt-6 p-4 bg-pink-50 border border-pink-200 rounded-xl shadow-sm">
        {loadingPrecio ? (
          <p className="text-pink-700">Cargando precio del servicio...</p>
        ) : (
          <>
            <p className="font-medium text-pink-700">
              💗 Para confirmar tu reserva debés abonar una seña del{' '}
              <strong>50%</strong> o el total del servicio.
            </p>

            <div className="mt-3 text-pink-700 space-y-1">
              <p>
                Precio total: <strong>${precioTotal}</strong>
              </p>
              <p>
                Seña (50%): <strong>${sena}</strong>
              </p>
            </div>

            {/* 💰 BOTONES */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setTipoPago('sena')}
                className={`flex-1 text-center p-3 rounded-xl border transition
            ${
              tipoPago === 'sena'
                ? 'bg-pink-200 border-pink-400 text-pink-900 font-semibold'
                : 'bg-white border-pink-300 text-pink-700 hover:bg-pink-100'
            }`}
              >
                Pagar seña 50%
              </button>

              <button
                type="button"
                onClick={() => setTipoPago('total')}
                className={`flex-1 text-center p-3 rounded-xl border transition
            ${
              tipoPago === 'total'
                ? 'bg-pink-200 border-pink-400 text-pink-900 font-semibold'
                : 'bg-white border-pink-300 text-pink-700 hover:bg-pink-100'
            }`}
              >
                Pagar total
              </button>
            </div>
          </>
        )}
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
          className="btn-principal w-full mt-8 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Volver a la página anterior
        </button>
      </div>
    </div>
  );
}