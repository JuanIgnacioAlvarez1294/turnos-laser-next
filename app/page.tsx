'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-rosa-fondo text-gris-texto">
      {/* 🌸 HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center">
        <Image
          src="/images/hero-principal-desktop.webp"
          alt="Laser Divino"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-rosa-fondo/70 backdrop-blur-sm" />

        <div className="relative z-10 text-center px-6 max-w-3xl animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold text-rosa-oscuro mb-4">
            Láser Divino
          </h1>
          <p className="text-lg md:text-xl bg-white/70 rounded-xl px-6 py-3 inline-block">
            Depilación láser & Manicuría profesional
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservas">
              <button className="btn-principal px-8 py-3 text-lg rounded-full">
                Reservar turno
              </button>
            </Link>
            <Link href="#servicios">
              <button className="btn-principal px-8 py-3 text-lg rounded-full">
                Ver servicios
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 🌸 QUIÉNES SOMOS */}
      <section className="py-20 px-6 sm:px-8 lg:px-0 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeIn">
          <h2 className="text-3xl font-bold text-rosa-oscuro mb-4">
            Un proyecto hecho con pasión
          </h2>
          <p className="mb-4 leading-relaxed">
            Láser Divino nace del sueño compartido de dos amigas que decidieron
            transformar su pasión por el cuidado personal en un espacio pensado
            para acompañar, contener y embellecer a cada persona que nos elige.
          </p>
          <p className="mb-4 leading-relaxed">
            Creemos en una atención cercana, honesta y profesional, donde cada
            detalle importa. Por eso trabajamos con dedicación, capacitación
            constante y productos de calidad, priorizando siempre tu bienestar y
            confianza.
          </p>
          <p className="leading-relaxed">
            Nuestro objetivo es que cada visita sea una experiencia positiva,
            donde te sientas cómoda, cuidada y segura, y donde los resultados
            acompañen lo que prometemos.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/nosotras.webp"
            alt="Equipo Laser Divino"
            width={520}
            height={380}
            sizes="(max-width: 768px) 90vw, 520px"
            className="rounded-2xl shadow-xl"
            loading="lazy"
          />
        </div>
      </section>

      {/* 🌸 SERVICIOS */}
      <section id="servicios" className="bg-rosa-pastel/40 py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-rosa-oscuro mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
            {/* DEPILACIÓN */}
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-[380px] w-full">
              <div className="h-[220px] w-full mb-6 overflow-hidden rounded-xl">
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet="/images/depilacion-mobile.webp"
                  />

                  <img
                    src="/images/depilacion-desktop.webp"
                    alt="Depilación láser"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </picture>
              </div>
              <h3 className="text-2xl font-semibold text-rosa-oscuro mb-3">
                Depilación Láser
              </h3>
              <p className="mb-4 leading-relaxed">
                Tecnología de última generación, tratamientos personalizados y
                resultados visibles desde las primeras sesiones.
              </p>
              <Link href="/reservas">
                <button className="btn-principal rounded-full px-6">
                  Ver promos
                </button>
              </Link>
            </div>
            {/* MANICURÍA */}
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-[380px] w-full">
              <div className="h-[220px] w-full mb-6 overflow-hidden rounded-xl">
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet="/images/manicuria-mobile.webp"
                  />

                  <img
                    src="/images/manicuria-desktop.webp"
                    alt="Manicuría profesional"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </picture>
              </div>
              <h3 className="text-2xl font-semibold text-rosa-oscuro mb-3">
                Manicuría
              </h3>
              <p className="mb-4 leading-relaxed">
                Servicios de manicuría con productos de calidad, higiene y
                resultados prolijos y duraderos.
              </p>
              <Link href="/reservas">
                <button className="btn-principal rounded-full px-6">
                  Ver promos
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🌸 BENEFICIOS */}
      <section className="py-20 container">
        <h2 className="text-3xl font-bold text-center text-rosa-oscuro mb-12">
          ¿Por qué elegirnos?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition">
            <Image
              src="/images/atencion-personalizada.webp"
              alt="Atención personalizada"
              width={300}
              height={200}
              sizes="300px"
              className="rounded-xl mx-auto mb-4"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold text-rosa-oscuro mb-2">
              Atención personalizada
            </h3>
            <p className="text-gris-texto leading-relaxed">
              Escuchamos tus necesidades y adaptamos cada tratamiento a tu tipo
              de piel, objetivos y tiempos, para brindarte una experiencia única
              y a medida.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition">
            <Image
              src="/images/ambiente-calido.webp"
              alt="Ambiente cálido y profesional"
              width={300}
              height={200}
              className="rounded-xl mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-rosa-oscuro mb-2">
              Ambiente cálido y profesional
            </h3>
            <p className="text-gris-texto leading-relaxed">
              Creamos un espacio pensado para que te relajes y disfrutes, con
              protocolos de higiene, confort y una atención cercana en cada
              sesión.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition">
            <Image
              src="/images/resultados-visibles.webp"
              alt="Resultados visibles"
              width={300}
              height={200}
              className="rounded-xl mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-rosa-oscuro mb-2">
              Resultados visibles
            </h3>
            <p className="text-gris-texto leading-relaxed">
              Trabajamos con técnicas efectivas y seguras que permiten notar
              cambios reales desde las primeras sesiones, cuidando siempre tu
              piel.
            </p>
          </div>
        </div>
      </section>

      {/* 🌸 CTA FINAL */}
      <section className="py-20 bg-rosa-fondo text-center">
        <h2 className="text-3xl font-bold text-rosa-oscuro mb-6">
          Regalate un momento para vos
        </h2>
        <Link href="/reservas">
          <button className="btn-principal px-10 py-4 rounded-full text-lg">
            Reservar ahora
          </button>
        </Link>
      </section>

      {/* 🌸 WHATSAPP */}
      <a
        href="https://wa.me/5491136723999"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 bg-[#f878a2] p-4 rounded-full shadow-xl
                   hover:scale-110 transition-all duration-300
                   flex items-center justify-center animate-pulse-levemente"
      >
        <Image
          src="/icons/whatsapp.svg"
          width={34}
          height={34}
          alt="WhatsApp"
          priority
          className="invert brightness-0"
        />
      </a>
    </div>
  );
}
