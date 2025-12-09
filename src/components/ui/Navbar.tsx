"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";

const Navbar: React.FC = () => {
  const { user } = useAuth();

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Turnos Láser
        </Link>

        <div className="space-x-4 flex items-center">

          {/* Reservas siempre visible */}
          <Link href="/reservas" className="text-white hover:text-blue-300">
            Reservas
          </Link>

          {/* Admin solo si hay usuario logueado */}
          {user && (
            <Link href="/admin" className="text-white hover:text-blue-300">
              Admin
            </Link>
          )}

          {/* Login Admin */}
          {!user && (
            <Link href="/admin/login" className="text-white hover:text-blue-300">
              Login Admin
            </Link>
          )}

          {/* Logout */}
          {user && (
            <button
              onClick={logout}
              className="text-white hover:text-red-300"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;