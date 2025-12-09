// app/reservas/page.tsx
"use client";

import { useEffect, useState } from "react";
import ReservaTurnoForm from "@/components/turnos/ReservaTurnoForm";
import { getServicios } from "@/services/turnos.service";
import { useAuth } from "@/contexts/AuthContext";

export default function ReservasPage() {
  const { user } = useAuth(); // admin login opcional, user puede ser null
  const [servicios, setServicios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getServicios();
        setServicios(data);
      } catch (err) {
        console.error("Error cargando servicios", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Reservar Turno</h1>
      <ReservaTurnoForm servicios={servicios} user={user ?? null} />
    </div>
  );
}
