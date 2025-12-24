'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createTurno } from '@/services/turnos.service';
import { toast } from 'react-toastify';

export default function ConfirmClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extraer datos de la URL
  const servicioId = searchParams.get('servicio');
  const nombre = searchParams.get('nombre');
  const apellido = searchParams.get('apellido') || '';
  const telefono = searchParams.get('telefono');
  const email = searchParams.get('email');
  const fecha = searchParams.get('fecha');
  const hora = searchParams.get('hora');

  const [servicioData, setServicioData] = useState<{ nombre: string; precio: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [tipoPago, setTipoPago] = useState<'sena' | 'total' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------------------------------------------
      OBTENER DATOS DEL SERVICIO
  ---------------------------------------------- */
  useEffect(() => {
    const fetchServicio = async () => {
      if (!servicioId) return;
      try {
        const res = await fetch(`/api/servicio?id=${servicioId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setServicioData(data);
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar datos del servicio');
      } finally {
        setLoading(false);
      }
    };
    fetchServicio();
  }, [servicioId]);

  // Cálculo de seña (50%)
  const precioTotal = servicioData?.precio || 0;
  const montoSena = precioTotal * 0.5;

  /* ---------------------------------------------
      CONFIRMAR RESERVA + MERCADO PAGO
  ---------------------------------------------- */
  const confirmarYPay = async () => {
    if (!tipoPago) {
      toast.error('Por favor, selecciona un método de pago');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Crear el turno en Firebase (Estado inicial: pendiente)
      const turnoId = await createTurno({
        nombre: nombre || '',
        apellido: apellido || '',
        telefono: telefono || '',
        emailContacto: email || '',
        servicioId: servicioId || '',
        fecha: fecha || '',
        hora: hora || '',
      });

      // 2. Determinar monto final según elección
      const montoAFacturar = tipoPago === 'sena' ? montoSena : precioTotal;

      // 3. Crear preferencia en Mercado Pago
      const res = await fetch('/api/mercadopago/preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: `Reserva: ${servicioData?.nombre || 'Servicio'}`,
          precio: montoAFacturar,
          turnoId: turnoId, // Usamos el ID de Firebase
          email: email,
          tipoPago: tipoPago,
        }),
      });

      const data = await res.json();

      if (data.init_point) {
        // 4. Redirigir al checkout de Mercado Pago
        window.location.href = data.init_point;
      } else {
        throw new Error('No se pudo generar el link de pago');
      }
    } catch (error) {
      console.error(error);
      toast.error('Hubo un error al procesar tu reserva');
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-pink-500">Cargando resumen...</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        Confirmar tu Reserva
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-100 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><strong>Servicio:</strong> {servicioData?.nombre}</p>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p><strong>Hora:</strong> {hora}</p>
          <p><strong>Cliente:</strong> {nombre} {apellido}</p>
        </div>

        <hr className="border-pink-100" />

        <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
          <p className="text-pink-800 font-medium mb-4">
            Selecciona cuánto deseas abonar ahora para asegurar tu lugar:
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setTipoPago('sena')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                tipoPago === 'sena'
                  ? 'border-pink-500 bg-pink-500 text-white shadow-md'
                  : 'border-pink-300 bg-white text-pink-700 hover:border-pink-400'
              }`}
            >
              <span className="block font-bold text-lg">Seña 50%</span>
              <span className="block text-sm opacity-90">${montoSena}</span>
            </button>

            <button
              onClick={() => setTipoPago('total')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                tipoPago === 'total'
                  ? 'border-pink-500 bg-pink-500 text-white shadow-md'
                  : 'border-pink-300 bg-white text-pink-700 hover:border-pink-400'
              }`}
            >
              <span className="block font-bold text-lg">Total</span>
              <span className="block text-sm opacity-90">${precioTotal}</span>
            </button>
          </div>
        </div>

        <div className="pt-6 space-y-3">
          <button
            onClick={confirmarYPay}
            disabled={isSubmitting || !tipoPago}
            className="w-full py-4 bg-pink-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? 'Procesando...' : 'Ir a Pagar con Mercado Pago ➔'}
          </button>

          <button
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="w-full py-2 text-gray-500 hover:text-pink-600 transition"
          >
            Volver y corregir datos
          </button>
        </div>
      </div>
    </div>
  );
}