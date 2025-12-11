import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* 🌸 HERO PRINCIPAL */}
      <section
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-laser.jpg')" }}
      >
        <div className="absolute inset-0 bg-rosaBB/40"></div>

        <div className="relative z-10 text-center px-6 max-w-3xl animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold text-rosaFuerte drop-shadow-lg">
            Láser Divino
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-700 font-medium bg-white/50 px-4 py-2 rounded-xl inline-block backdrop-blur">
            Depilación láser profesional con resultados reales y seguros.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/reservas">
              <button className="btn-principal px-8 py-3 rounded-full text-lg">
                Reservar Turno
              </button>
            </Link>

            <Link href="#servicios">
              <button className="btn-secundario px-8 py-3 rounded-full text-lg">
                Ver Servicios
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 🌸 SECCIÓN SOBRE */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeIn">
          <h2 className="text-3xl font-bold text-rosaFuerte mb-4">
            Tecnología de Última Generación
          </h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Lográ una piel suave desde las primeras sesiones gracias a nuestra
            tecnología láser segura, moderna y apta para todo tipo de piel.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Atención personalizada, confort en cada sesión y resultados reales.
          </p>

          <Link href="/reservas">
            <button className="btn-principal mt-6">Agendar Turno</button>
          </Link>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/laser-woman.jpg"
            width={600}
            height={400}
            alt="Depilación láser"
            className="rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* 🌸 SERVICIOS */}
      <section id="servicios" className="bg-rosaPastel/40 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-rosaFuerte mb-10">
            Nuestros Servicios
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
              <Image
                src="/images/service-legs.jpg"
                width={300}
                height={200}
                alt="Piernas Completas"
                className="rounded-xl mb-4"
              />

              <h3 className="text-xl font-semibold text-rosaFuerte mb-2">
                Piernas Completas
              </h3>
              <p className="text-gray-600">
                Eliminación duradera y segura para una suavidad increíble.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
              <Image
                src="/images/service-face.jpg"
                width={300}
                height={200}
                alt="Rostro"
                className="rounded-xl mb-4"
              />

              <h3 className="text-xl font-semibold text-rosaFuerte mb-2">
                Rostro
              </h3>
              <p className="text-gray-600">
                Ideal para pieles sensibles. Suave, seguro y eficaz.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
              <Image
                src="/images/service-arms.jpg"
                width={300}
                height={200}
                alt="Brazos"
                className="rounded-xl mb-4"
              />

              <h3 className="text-xl font-semibold text-rosaFuerte mb-2">
                Brazos
              </h3>
              <p className="text-gray-600">
                Decile adiós al rasurado frecuente. Resultados duraderos.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/reservas">
              <button className="btn-principal px-8 py-3 rounded-full text-lg">
                Ver Precios y Reservar
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 🌸 POR QUÉ ELEGIRNOS */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-rosaFuerte mb-12">
          ¿Por qué elegir Láser Divino?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-8 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold text-rosaFuerte mb-2">
              Atención Personalizada
            </h3>
            <p className="text-gray-600">
              Cada piel recibe su tratamiento ideal.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold text-rosaFuerte mb-2">
              Tecnología Premium
            </h3>
            <p className="text-gray-600">
              Equipamiento moderno, seguro y eficaz.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold text-rosaFuerte mb-2">
              Resultados Reales
            </h3>
            <p className="text-gray-600">
              La suavidad que buscás, por más tiempo.
            </p>
          </div>
        </div>
      </section>

      {/* 🌸 BOTÓN WHATSAPP COLOR ROSA FUERTE */}
      <a
        href="https://wa.me/+5491136723999"
        target="_blank"
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
          className="invert brightness-0 saturate-0"
        />
      </a>
    </div>
  );
}
