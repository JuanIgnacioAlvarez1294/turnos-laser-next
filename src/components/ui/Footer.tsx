import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto text-center space-y-2">
        <p className="text-sm">
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold text-white">Turnos Láser</span>. Todos
          los derechos reservados.
        </p>

        <div className="text-sm space-x-4">
          <a href="/privacy" className="hover:text-white transition">
            Política de Privacidad
          </a>
          <a href="/terms" className="hover:text-white transition">
            Términos de Servicio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
