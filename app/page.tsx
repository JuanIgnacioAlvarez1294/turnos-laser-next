import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-laser.jpg')" }}>
        
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Bienvenida a Turnos Láser
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Depilación láser profesional para una piel suave, segura y duradera.
          </p>
          <Link href="/reservas">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg shadow-lg">
              Reservar Turno
            </button>
          </Link>
        </div>
      </section>


      {/* SECCIÓN SOBRE DEPILACIÓN */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Depilación Láser de Alta Tecnología</h2>
          <p className="text-gray-700 mb-4">
            Disfrutá de resultados visibles desde la primera sesión. Nuestro sistema 
            está diseñado para ofrecer máxima eficacia con mínimo dolor.
          </p>
          <p className="text-gray-700">
            Atendemos con profesionalismo, productos de calidad y un enfoque 
            personalizado para cada paciente.
          </p>
        </div>

        <Image
          src="/images/laser-woman.jpg"
          width={600}
          height={400}
          alt="Depilación láser"
          className="rounded-xl shadow-lg"
        />
      </section>


      {/* SERVICIOS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Nuestros Servicios</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <Image src="/images/service-legs.jpg" width={300} height={200} alt="Piernas" className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Piernas Completas</h3>
              <p className="text-gray-600">Resultados duraderos con tecnología avanzada.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <Image src="/images/service-face.jpg" width={300} height={200} alt="Rostro" className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rostro</h3>
              <p className="text-gray-600">Tratamientos suaves para pieles sensibles.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <Image src="/images/service-arms.jpg" width={300} height={200} alt="Brazos" className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Brazos</h3>
              <p className="text-gray-600">Olvidate del rasurado constante.</p>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/reservas">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow">
                Ver Precios y Reservar
              </button>
            </Link>
          </div>
        </div>
      </section>


      {/* POR QUÉ ELEGIRNOS */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">¿Por qué elegirnos?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-2">Atención Personalizada</h3>
            <p className="text-gray-600">Cada paciente recibe un tratamiento adaptado a su piel.</p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-2">Tecnología Profesional</h3>
            <p className="text-gray-600">Equipos modernos que aseguran eficacia y confort.</p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-2">Resultados Reales</h3>
            <p className="text-gray-600">Piel suave por mucho más tiempo.</p>
          </div>
        </div>
      </section>


      {/* BOTÓN DE WHATSAPP */}
      <a
        href="https://wa.me/549XXXXXXXXX"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        <Image src="/icons/whatsapp.svg" width={40} height={40} alt="WhatsApp" />
      </a>
    </div>
  );
}