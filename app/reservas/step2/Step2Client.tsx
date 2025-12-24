'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Step2Client() {
  const router = useRouter();
  const params = useSearchParams();

  // 👉 El ID del servicio viene por query
  const servicioId = params.get('servicio');

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [horario, setHorario] = useState('');

  const horariosDisponibles = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
  ];

  const handleContinuar = () => {
    router.push(
      `/reservas/confirm?servicio=${servicioId}` +
        `&nombre=${nombre}` +
        `&apellido=${apellido}` +
        `&email=${email}` +
        `&telefono=${telefono}` +
        `&fecha=${fecha}` +
        `&hora=${horario}`
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-rosa-fuerte mb-6 text-center">
        Completa tus datos
      </h1>

      {/* 👉 DATOS PERSONALES */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-rosa-oscuro mb-4">
          Datos del Cliente
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
      </div>

      {/* 📅 FECHA / HORA */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h2 className="text-xl font-semibold text-rosa-oscuro mb-4">
          Elegí Fecha y Horario
        </h2>

        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />

        <div className="grid grid-cols-3 gap-3">
          {horariosDisponibles.map((h) => (
            <button
              key={h}
              onClick={() => setHorario(h)}
              className={`border rounded-lg px-4 py-2 text-center transition ${
                horario === h
                  ? 'bg-rosa-fuerte text-white border-rosa-fuerte'
                  : 'bg-white hover:bg-rosa-pastel text-gray-700'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* 👉 BOTÓN CONTINUAR */}
      <button
        onClick={handleContinuar}
        disabled={
          !nombre || !apellido || !telefono || !email || !fecha || !horario
        }
        className="btn-principal w-full mt-8 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continuar
      </button>
      <button
        onClick={() => router.back()}
        className="btn-principal w-full mt-8 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Volver a la página anterior
      </button>
    </div>
  );
}