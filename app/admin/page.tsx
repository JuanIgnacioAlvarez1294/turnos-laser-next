"use client";

import { useAuth } from "@/contexts/AuthContext";
import DashboardCards from "@/components/admin/DashboardCards";
import TurnosTable from "@/components/admin/TurnosTable";

export default function AdminDashboard() {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>No autorizado. <a href="/admin/login" className="text-blue-600 underline">Iniciar sesión</a></p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panel Administrativo</h1>
      <DashboardCards />
      <TurnosTable />
    </div>
  );
}