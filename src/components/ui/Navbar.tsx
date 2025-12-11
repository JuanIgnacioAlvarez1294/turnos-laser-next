'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/auth';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  const logout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  return (
    <nav className="bg-rosa shadow-md py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-rosa-oscuro text-lg font-bold">
          Láser Divino
        </Link>

        <div className="space-x-4 flex items-center">
          <Link
            href="/reservas"
            className="text-gris-texto hover:text-rosa-oscuro"
          >
            Reservas
          </Link>

          {user && (
            <Link
              href="/admin"
              className="text-gris-texto hover:text-rosa-oscuro"
            >
              Admin
            </Link>
          )}

          {!user && (
            <Link
              href="/admin/login"
              className="text-gris-texto hover:text-rosa-oscuro"
            >
              Login Admin
            </Link>
          )}

          {user && (
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-700 font-semibold"
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
