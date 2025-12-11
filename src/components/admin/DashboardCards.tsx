"use client";

import React, { useEffect, useState } from "react";
import { getTurnos } from "@/services/turnos.service";
import { Turno } from "@/types";

const DashboardCards: React.FC = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTurnos().then((data) => {
      setTurnos(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center mt-4">Cargando estadísticas...</div>;

  const total = turnos.length;
  const pendientes = turnos.filter((t) => t.estado === "pendiente").length;
  const completados = turnos.filter((t) => t.estado === "completado").length;
  const cancelados = turnos.filter((t) => t.estado === "cancelado").length;

  const cards = [
    { title: "Turnos Totales", value: total },
    { title: "Pendientes", value: pendientes },
    { title: "Completados", value: completados },
    { title: "Cancelados", value: cancelados },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="
            bg-white border border-rosa-pastel 
            shadow-lg rounded-xl p-6
            transition-all duration-300 hover:shadow-xl hover:-translate-y-1
            flex flex-col items-center text-center
          "
        >
          <h2 className="text-lg font-semibold text-rosa-oscuro">{card.title}</h2>
          <p className="text-4xl font-bold mt-2 text-rosa-fuerte">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
