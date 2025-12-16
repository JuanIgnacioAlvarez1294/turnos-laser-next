import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f8d7e3] text-gray-700 mt-16 pt-4 pb-3">
      <div className="max-w-6xl mx-auto px-6">

        {/* PARTE SUPERIOR - AHORA MÁS COMPACTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-2">

          {/* MARCA + SUBTÍTULO */}
          <div className="text-center md:text-left leading-tight">
            <h3 className="text-xl font-bold text-rosaFuerte">
              Láser Divino
            </h3>
            <p className="text-xs text-gray-600 -mt-1">
              Belleza & Tecnología Láser
            </p>
          </div>

          {/* BOTÓN INSTAGRAM - HOVER CORREGIDO */}
          <a
            href="https://www.instagram.com/laserdivino/"
            target="_blank"
            className="
              flex items-center gap-3 
              bg-white/70 px-4 py-2 rounded-full 
              shadow-md backdrop-blur 
              border border-rosa-fuerte/30
              transition 
              hover:bg-rosa-fuerte hover:text-white hover:border-rosa-fuerte
            "
          >
            <Image
              src="/icons/instagram-pink.svg"
              width={24}
              height={24}
              alt="Instagram"
              className="transition"
            />
            <span className="text-sm font-medium">
              Seguinos en Instagram
            </span>
          </a>

        </div>

        {/* LÍNEA DIVISORIA */}
        <div className="border-t border-rosa-hover/40 pt-3 text-center">
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-rosaFuerte">Láser Divino</span>.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;