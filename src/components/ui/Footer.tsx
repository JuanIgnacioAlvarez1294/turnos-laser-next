import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-rosa-pastel text-gris-texto py-6 mt-10">
      <div className="container mx-auto text-center space-y-2">
        <p className="text-sm">
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold text-rosa-oscuro">Láser Divino</span>.
          Todos los derechos reservados.
        </p>

        <div className="text-sm space-x-4">
          <a href="/privacy" className="hover:text-rosa-oscuro">
            Política de Privacidad
          </a>
          <a href="/terms" className="hover:text-rosa-oscuro">
            Términos de Servicio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
