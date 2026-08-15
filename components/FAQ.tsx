"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "¿Cuándo es el retiro?",
    a: "El retiro será del viernes 2 al domingo 4 de octubre de 2026. El viernes será por la tarde, el sábado tendremos una jornada más completa y el domingo cerraremos por la mañana.",
  },
  {
    q: "¿Cuáles son los horarios?",
    a: "El retiro será en horario España peninsular: viernes 2 de octubre de 18:00 a 21:00, sábado 3 de octubre de 09:00 a 14:00 y de 16:00 a 21:00, y domingo 4 de octubre de 09:00 a 14:00.",
  },
  {
    q: "Estoy en LATAM o US, ¿puedo apuntarme?",
    a: "Sí. El retiro será en horario España peninsular, pero tendrás acceso a las grabaciones durante 7 días. Si alguna sesión te queda de madrugada o no puedes asistir en directo, podrás verla después y seguir el proceso con el workbook.",
  },
  {
    q: "¿Dónde será?",
    a: "Será 100% virtual y en vivo. Podrás vivirlo desde casa o desde el lugar en el que te encuentres, siempre que tengas conexión a internet y un espacio tranquilo.",
  },
  {
    q: "¿Qué pasa si no puedo estar en directo?",
    a: "Tendrás acceso a las grabaciones durante 7 días después del retiro. Aun así, te recomiendo vivirlo en directo si puedes, porque la energía del grupo y el acompañamiento en tiempo real forman parte de la experiencia.",
  },
  {
    q: "¿Necesito experiencia meditando?",
    a: "No. Las meditaciones serán guiadas y accesibles. No necesitas haber meditado antes ni hacerlo \"perfecto\". Solo necesitas venir con apertura y regalarte ese espacio.",
  },
  {
    q: "¿Esto es solo para mujeres que quieren pareja?",
    a: "No. El retiro es para mujeres que sienten que hay algo que desean y no logran conseguir: puede ser una relación de amor sana, más abundancia, más clientes, más visibilidad o un siguiente nivel en su vida o negocio. El hilo común no es el área. El hilo común es el patrón que se repite.",
  },
  {
    q: "¿Esto es solo para mujeres con negocio?",
    a: "No. Si tienes negocio, trabajaremos también abundancia, ventas, visibilidad y crecimiento. Pero si tu deseo principal está en el amor, la autoestima o la relación contigo, también es para ti.",
  },
  {
    q: "¿Qué incluye el workbook?",
    a: "El workbook incluirá ejercicios, preguntas de reflexión y espacios de integración para acompañar cada día del retiro. La idea es que no solo escuches, sino que puedas aterrizar lo que se mueve en ti.",
  },
  {
    q: "¿Tendré acceso a las grabaciones?",
    a: "Sí. Tendrás acceso durante 7 días después del retiro.",
  },
  {
    q: "¿Es lo mismo que la mentoría de 3 meses?",
    a: "No. El retiro es una experiencia de 3 días para abrir claridad, reconocer patrones y empezar a conectar con la mujer que lo consigue. La mentoría de 3 meses es el proceso más profundo para sostener ese cambio en tu vida real con acompañamiento continuado.",
  },
  {
    q: "¿El precio del retiro se descuenta si entro en la mentoría?",
    a: "Sí. Si decides entrar en la mentoría durante los 7 días posteriores al retiro, se te descuenta el importe del retiro.",
  },
  {
    q: "¿Hasta cuándo está disponible el precio early bird?",
    a: "El precio early bird de 47 € estará disponible hasta el 15 de septiembre. A partir del 16 de septiembre, el precio será 57 €.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-cream px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="section-label">Dudas frecuentes</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-4xl">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="mt-10 space-y-3 sm:mt-14">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="rounded-2xl border border-espresso/10 bg-white/70 shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-espresso">{item.q}</span>
                  <span
                    className={`shrink-0 text-xl text-terracotta transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-sm text-espresso/75">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
