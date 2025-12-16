"use client";
import Link from "next/link";

export default function ReservasPage() {
  // Servicios de depilación
  const depilacion = [
    { id: "piernas-completas", nombre: "Piernas Completas", precio: 18000 },
    { id: "piernas-media", nombre: "Piernas 1/2", precio: 12000 },
    { id: "bikini", nombre: "Bikini Completo", precio: 9000 },
    { id: "axilas", nombre: "Axilas", precio: 7000 },
    { id: "rostro", nombre: "Rostro Completo", precio: 10000 },
    { id: "bozo", nombre: "Bozo", precio: 4500 },
    { id: "brazos", nombre: "Brazos Completos", precio: 11000 },
    { id: "abdomen", nombre: "Abdomen", precio: 8000 },
    { id: "espalda", nombre: "Espalda Completa", precio: 15000 },
    { id: "gluteos", nombre: "Glúteos", precio: 9500 },
  ];

  // Servicios de manicura
  const manicuria = [
    { id: "manicura-tradicional", nombre: "Manicura Tradicional", precio: 4000 },
    { id: "manicura-semi", nombre: "Manicura Semipermanente", precio: 7000 },
    { id: "gel", nombre: "Esmaltado en Gel", precio: 8500 },
    { id: "kapping", nombre: "Kapping Gel", precio: 10000 },
    { id: "acrilico", nombre: "Acrílico Esculpido", precio: 12000 },
    { id: "nailart-b", nombre: "Nail Art Básico", precio: 2000 },
    { id: "nailart-p", nombre: "Nail Art Premium", precio: 4500 },
    { id: "pedicura", nombre: "Pedicura Completa", precio: 8000 },
    { id: "pedicura-spa", nombre: "Pedicura Spa", precio: 10000 },
    { id: "softgel", nombre: "Uñas Soft Gel", precio: 11000 },
  ];

  // Promos depilación
  const promosDepi = [
    { id: "promo-piernas-axilas", nombre: "Piernas + Axilas", precio: 22000 },
    { id: "promo-rostro-axilas-bozo", nombre: "Rostro + Axilas + Bozo", precio: 15000 },
    { id: "promo-bikini-gluteos", nombre: "Bikini + Glúteos", precio: 16000 },
    { id: "promo-full-piernas", nombre: "Full Piernas + Bikini + Axilas", precio: 28000 },
    { id: "promo-torso-completo", nombre: "Espalda + Pecho + Abdomen", precio: 32000 },
  ];

  // Promos manicura
  const promosMano = [
    { id: "promo-manicura-gel", nombre: "Manicura + Esmaltado Gel", precio: 9500 },
    { id: "promo-kapping-nailart", nombre: "Kapping + Nail Art Básico", precio: 12500 },
    { id: "promo-softgel-premium", nombre: "Soft Gel + Nail Art Premium", precio: 14000 },
    { id: "promo-mani-pedi-spa", nombre: "Manicura + Pedicura Spa", precio: 16800 },
    { id: "promo-gel-pedicura", nombre: "Esmaltado Gel + Pedicura Completa", precio: 14500 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Título principal */}
      <h1 className="text-4xl font-bold text-center text-rosa-fuerte mb-10">
        Servicios
      </h1>

      {/* Dos columnas */}
      <div className="grid md:grid-cols-2 gap-10">
        
        {/* DEPILACIÓN */}
        <div>
          <h2 className="text-2xl font-semibold text-rosa-fuerte mb-4 text-center">
            Depilación Láser
          </h2>

          <div className="space-y-4">
            {depilacion.map((s) => (
              <div
                key={s.id}
                className="p-5 bg-white shadow-md rounded-xl border border-rosa hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{s.nombre}</p>
                    <p className="text-rosa-fuerte font-bold">${s.precio}</p>
                  </div>

                  <Link href={`/reservas/step2?servicio=${s.id}`}>
                    <button className="btn-principal px-4 py-2 text-sm">
                      Reservar
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MANICURÍA */}
        <div>
          <h2 className="text-2xl font-semibold text-rosa-fuerte mb-4 text-center">
            Manicuría
          </h2>

          <div className="space-y-4">
            {manicuria.map((s) => (
              <div
                key={s.id}
                className="p-5 bg-white shadow-md rounded-xl border border-rosa hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{s.nombre}</p>
                    <p className="text-rosa-fuerte font-bold">${s.precio}</p>
                  </div>

                  <Link href={`/reservas/step2?servicio=${s.id}`}>
                    <button className="btn-principal px-4 py-2 text-sm">
                      Reservar
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* PROMOS */}
      <h2 className="text-3xl font-bold text-center text-rosa-fuerte mt-16 mb-10">
        Promos Especiales
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* PROMOS DEPILACION */}
        <div>
          <h3 className="text-xl font-semibold text-rosa-fuerte mb-4 text-center">
            Promos Depilación
          </h3>

          <div className="space-y-4">
            {promosDepi.map((p) => (
              <div
                key={p.id}
                className="p-5 bg-rosa-pastel/40 rounded-xl border border-rosa shadow hover:shadow-lg transition hover:-translate-y-1"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{p.nombre}</p>
                    <p className="font-bold text-rosa-fuerte">${p.precio}</p>
                  </div>

                  <Link href={`/reservas/step2?servicio=${p.id}`}>
                    <button className="btn-principal px-4 py-2 text-sm">
                      Reservar
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROMOS MANICURÍA */}
        <div>
          <h3 className="text-xl font-semibold text-rosa-fuerte mb-4 text-center">
            Promos Manicuría
          </h3>

          <div className="space-y-4">
            {promosMano.map((p) => (
              <div
                key={p.id}
                className="p-5 bg-rosa-pastel/40 rounded-xl border border-rosa shadow hover:shadow-lg transition hover:-translate-y-1"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{p.nombre}</p>
                    <p className="font-bold text-rosa-fuerte">${p.precio}</p>
                  </div>

                  <Link href={`/reservas/step2?servicio=${p.id}`}>
                    <button className="btn-principal px-4 py-2 text-sm">
                      Reservar
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}