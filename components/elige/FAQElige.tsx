"use client";

import { useState } from "react";
import { usePriceTier } from "../PriceTag";
import { RETIRO_ELIGE } from "@/lib/events";

type Tier = "early_bird" | "regular";

type Faq = { q: string; a: string | ((tier: Tier) => string); pendiente?: boolean };

const FAQS: Faq[] = [
  {
    q: "¿Sirve si tengo pareja?",
    a: "Sí. El retiro trabaja cómo te relacionas tú: lo que permites, lo que pides y cómo te tratas. Eso cambia cualquier relación, también la que ya tienes.",
  },
  {
    q: "¿Y si mi problema no es la pareja sino mis amigas o mi familia?",
    a: "También es para ti. Los patrones que repites en el amor suelen aparecer en todas tus relaciones, y aprenderás a ponerles límites con amor.",
  },
  {
    q: "¿Y si no puedo asistir a todo en directo, o estoy en Latinoamérica?",
    a: "Tendrás las grabaciones de todas las sesiones durante 2 semanas y las meditaciones grabadas para repetirlas.",
  },
  {
    q: "¿Necesito experiencia meditando?",
    a: "No. Las meditaciones son guiadas, con respiración y conexión con el corazón. No hace falta dejar la mente en blanco ni \"hacerlo bien\".",
  },
  {
    q: "¿Necesito haber hecho el retiro de octubre?",
    a: "No. Es un retiro independiente. Si viniste en octubre, aquí lo llevarás al terreno de tus relaciones.",
  },
  {
    q: "¿Es el precio completo?",
    a: (tier) =>
      tier === "early_bird"
        ? "Sí, sin pagos adicionales. 47 € hasta el 7 de enero; desde el 8 de enero, 57 € hasta el 28 de enero."
        : "Sí, 57 € sin pagos adicionales. Inscripciones abiertas hasta el 28 de enero.",
  },
  {
    q: "¿Qué pasa después de pagar?",
    a: "Recibirás un email con la confirmación de tu pago y te añadiremos a un grupo de WhatsApp, donde compartiremos todas las novedades, avisos y los enlaces de Zoom.",
  },
  {
    q: "¿Hay devoluciones?",
    a: "No. Una vez hecha la inscripción no se admiten devoluciones.",
  },
];

const IS_PROD = process.env.NODE_ENV === "production";

export default function FAQElige() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const tier = usePriceTier(RETIRO_ELIGE) ?? "early_bird";
  const faqs = FAQS.filter((f) => !(IS_PROD && f.pendiente));

  return (
    <section id="preguntas" className="bg-cream px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="section-label">Dudas</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-4xl">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="mt-10 divide-y divide-espresso/10 border-y border-espresso/10 sm:mt-14">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-medium text-espresso">
                    {item.q}
                    {item.pendiente && (
                      <span className="ml-2 rounded bg-terracotta px-1.5 py-0.5 align-middle text-[10px] font-bold uppercase text-cream">
                        Pendiente
                      </span>
                    )}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-terracotta/40 text-terracotta transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 pr-10 text-sm leading-relaxed text-espresso/75">
                    {typeof item.a === "function" ? item.a(tier) : item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-espresso/60">
          Este retiro no sustituye terapia ni atención médica.
        </p>
      </div>
    </section>
  );
}
