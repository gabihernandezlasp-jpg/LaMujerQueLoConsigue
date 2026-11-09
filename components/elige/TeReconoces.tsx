"use client";

import { useState } from "react";

const CASOS = [
  {
    tab: "Estoy soltera",
    puntos: [
      "Conoces a alguien, empieza intenso, y de repente pierde el interés o desaparece.",
      "Te atraen los que no están disponibles.",
      "Aceptas ser “una opción” y te convences de que tú también lo eliges.",
      "Y cuando aparece alguien disponible, te aburre o desconfías.",
    ],
  },
  {
    tab: "Tengo pareja",
    puntos: [
      "Eres tú la que busca, la que propone, la que sostiene.",
      "Mendigas presencia y cariño.",
      "Justificas lo que te duele para no tener que enfrentarlo.",
      "Y te sientes más sola acompañada que sin nadie.",
    ],
  },
  {
    tab: "Amigas o familia",
    puntos: [
      "Eres la que siempre está, la que escucha, la que cede.",
      "Te llaman cuando necesitan algo.",
      "Y cuando por fin pones un límite, la culpa no te deja dormir.",
    ],
  },
];

const FRASES = [
  "No me eligen.",
  "Doy todo de mí y no me valoran.",
  "Tengo que mendigar cariño.",
  "Me engancho con una persona y después se van.",
  "No puedo soltar a mi ex por miedo.",
  "Me quedo atrapada donde ya no es.",
  "¿Por qué en el amor siempre me pasa lo mismo?",
  "Ya he ido a terapia mil veces.",
];

export default function TeReconoces() {
  const [activo, setActivo] = useState(0);
  const caso = CASOS[activo];

  return (
    <section id="te-reconoces" className="overflow-hidden bg-cream px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="section-label">¿Te reconoces?</p>
        <h2 className="mt-3 font-serif text-2xl font-semibold text-espresso sm:text-3xl">
          Para la mujer que lo da todo… y aun así siente que no la eligen.
        </h2>

        <div
          role="tablist"
          aria-label="Tu situación"
          className="mt-7 inline-flex flex-wrap justify-center gap-2"
        >
          {CASOS.map((c, i) => (
            <button
              key={c.tab}
              type="button"
              role="tab"
              id={`reconoces-tab-${i}`}
              aria-selected={activo === i}
              aria-controls="reconoces-panel"
              onClick={() => setActivo(i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activo === i
                  ? "bg-terracotta text-cream shadow-sm"
                  : "bg-white text-espresso/70 ring-1 ring-espresso/10 hover:text-terracotta-700"
              }`}
            >
              {c.tab}
            </button>
          ))}
        </div>

        <ul
          key={activo}
          id="reconoces-panel"
          role="tabpanel"
          aria-labelledby={`reconoces-tab-${activo}`}
          className="animate-fade-in mx-auto mt-5 max-w-xl space-y-2.5 rounded-3xl bg-white p-6 text-left shadow-sm ring-1 ring-espresso/5 sm:p-7"
        >
          {caso.puntos.map((p) => (
            <li key={p} className="flex gap-3 text-[15px] leading-snug text-espresso/80">
              <span aria-hidden="true" className="mt-0.5 text-terracotta">♡</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 font-serif text-xl text-espresso">¿Te suena alguna de estas frases?</p>
      </div>

      {/* Cinta de frases (lista duplicada para un loop continuo) */}
      <div className="relative left-1/2 mt-5 w-screen -translate-x-1/2 overflow-hidden">
        <ul className="animate-marquee flex w-max gap-3" aria-label="Frases reales de mujeres de la comunidad">
          {[...FRASES, ...FRASES].map((f, i) => (
            <li
              key={i}
              aria-hidden={i >= FRASES.length}
              className="shrink-0 rounded-full bg-sand-100 px-5 py-2.5 font-serif text-base italic text-espresso ring-1 ring-espresso/5"
            >
              &ldquo;{f}&rdquo;
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <p className="mt-3 text-xs text-espresso/55">
          Frases reales que nos han escrito mujeres de esta comunidad.
        </p>
        <p className="mt-8 font-serif text-xl leading-snug text-espresso sm:text-2xl">
          No te pasa nada malo. Es que todavía no te has elegido.{" "}
          <em className="text-terracotta-700">Y eso se aprende.</em>
        </p>
      </div>
    </section>
  );
}
