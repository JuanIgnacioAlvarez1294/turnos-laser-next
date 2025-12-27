import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f8d7e3] text-gray-700 py-2 sm:py-3 border-t border-rosa-hover/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
          
          {/* MARCA + SUBTÍTULO - SUPER COMPACTO */}
          <div className="text-center md:text-left leading-tight">
            <h3 className="text-base font-bold text-rosaFuerte leading-none">
              Láser Divino
            </h3>
            <p className="text-[10px] text-gray-600">
              Belleza & Tecnología Láser
            </p>
          </div>

          {/* DERECHOS RESERVADOS - SUBIDOS Y CENTRADOS */}
          <div className="order-3 md:order-2">
            <p className="text-[10px] sm:text-xs text-gray-700">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-rosaFuerte">Láser Divino</span>.
              <span className="hidden sm:inline"> Todos los derechos reservados.</span>
            </p>
          </div>

          {/* BOTÓN INSTAGRAM - MÁS PEQUEÑO (ESTILO NAVBAR) */}
          <div className="order-2 md:order-3">
            <a
              href="https://www.instagram.com/laserdivino/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2 
                bg-white/50 px-3 py-1.5 rounded-full 
                shadow-sm backdrop-blur-sm
                border border-rosa-fuerte/20
                transition-all duration-300
                hover:bg-rosa-fuerte hover:text-white
              "
            >
              <Image
                src="/icons/instagram-pink.svg"
                width={16}
                height={16}
                alt="Instagram"
                className="hover:brightness-200 transition-all"
              />
              <span className="text-[11px] font-semibold tracking-tight">
                Instagram
              </span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;