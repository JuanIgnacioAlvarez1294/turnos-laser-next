import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import '@/styles/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Láser Divino',
  description: 'Depilación Láser - Turnos online',
  icons: {
    icon: '/images/logo-laserdivino.png',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <AuthProvider>

          {/* Navbar siempre arriba */}
          <Navbar />

          {/* Contenido que se expande */}
          <main className="flex-grow px-4 py-6">
            {children}
          </main>

          {/* Footer siempre abajo */}
          <Footer />

          {/* Toast notifications */}
          <ToastContainer position="top-right" />

        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;