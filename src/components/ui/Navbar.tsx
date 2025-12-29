'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  const logout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  return (
    <nav className="bg-rosa shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* LOGO */}
        <Link
          href="/"
          className="text-rosa-oscuro text-xl font-extrabold tracking-wide"
        >
          Láser Divino
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-3">
          {/* RESERVAS — CTA */}
          <Link
            href="/reservas"
            className="
              px-4 py-2 rounded-full
              bg-rosa-oscuro text-white
              font-semibold text-sm
              hover:bg-rosa-oscuro/90
              focus:outline-none focus-visible:ring-2 focus-visible:ring-rosa-oscuro
              transition
            "
          >
            Reservas
          </Link>

          {/* ADMIN */}
          {user && (
            <Link
              href="/admin"
              className="
                px-3 py-2 rounded-lg
                text-gris-texto font-medium text-sm
                hover:text-rosa-oscuro hover:bg-white/40
                transition
              "
            >
              Admin
            </Link>
          )}

          {!user && (
            <Link
              href="/admin/login"
              className="
                px-3 py-2 rounded-lg
                text-gris-texto font-medium text-sm
                hover:text-rosa-oscuro hover:bg-white/40
                transition
              "
            >
              Login Admin
            </Link>
          )}

          {/* LOGOUT */}
          {user && (
            <button
              onClick={logout}
              className="
                px-3 py-2 rounded-lg
                text-red-600 font-semibold text-sm
                hover:bg-red-50 hover:text-red-700
                transition
              "
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;