"use client";

import { useState } from "react";

const DAYS = [
  {
    id: "dia1",
    tab: "Día 1 · Viernes",
    dateLabel: "Día 1 · Viernes 2 de octubre · 18:00 - 21:00",
    title: "Dejas de mirar tu deseo como algo lejano",
    intro:
      "Conectamos con lo que realmente quieres y con la versión de ti que ya lo consiguió, para que tu deseo deje de sentirse como una fantasía y empiece a convertirse en una dirección.",
    bullets: [
      "Ponemos nombre a lo que de verdad quieres, sin filtros ni versiones bonitas para los demás.",
      "Identificamos la brecha entre lo que dices que quieres y lo que realmente estás sosteniendo.",
      "Miramos qué has intentado hasta ahora y por qué no ha sido suficiente.",
      "Activamos la claridad como primer paso para poder conseguirlo.",
      "Conectamos con la mujer que ya vive eso que tú deseas.",
    ],
    meditacion: "Encontrarte con la mujer que ya lo consiguió.",
  },
  {
    id: "dia2",
    tab: "Día 2 · Sábado",
    dateLabel: "Día 2 · Sábado 3 de octubre · 09:00 - 14:00 y 16:00 - 21:00",
    title: "Nada será igual cuando veas qué te estaba frenando",
    intro:
      "Este será el día más profundo del retiro. Vamos a ir a la raíz: patrones, bloqueadores, creencias y formas de actuar que quizá llevas años repitiendo sin darte cuenta. No para culparte. No para exigirte más. Sino para que por fin puedas ver con claridad qué necesitas soltar para dejar de crear desde la misma versión de siempre.",
    bullets: [
      "Reconocemos los patrones inconscientes que repiten el mismo resultado en el amor, el dinero, el negocio o la visibilidad.",
      "Identificamos qué pensamientos, decisiones, permisos o tolerancias mantienen tu realidad actual.",
      "Miramos la parte de ti que sigue eligiendo desde miedo, ansiedad, espera, control o autosabotaje.",
      "Trabajamos las creencias y bloqueadores que sostienen el 'por más que hago, no lo consigo'.",
      "Diferenciamos acción alineada de acción desde ansiedad.",
      "Soltamos lo que ya no puede venir contigo.",
    ],
    meditacion: "Soltar la versión que ya no puede venir contigo.",
  },
  {
    id: "dia3",
    tab: "Día 3 · Domingo",
    dateLabel: "Día 3 · Domingo 4 de octubre · 09:00 - 14:00",
    title: "Empiezas a actuar como la mujer que lo consigue",
    intro:
      "Después de nombrar tu deseo y ver qué te estaba frenando, cerramos el retiro integrando una nueva forma de elegir, actuar y sostenerte. No vienes a irte solo inspirada. Vienes a irte con claridad, dirección y un plan para empezar a llevarlo a tu vida real.",
    bullets: [
      "Integramos una nueva identidad: la mujer que ya no persigue, no se esconde y no se conforma.",
      "Diseñamos tus primeros pasos concretos para sostener el cambio al volver a tu día a día.",
      "Creamos un plan de integración para los siguientes 7 días.",
      "Creamos una visión inicial para los siguientes 30 días.",
      "Cerramos el retiro con claridad, dirección y compromiso contigo.",
      "Abrimos el siguiente paso para quienes quieran continuar este proceso en la mentoría de 3 meses.",
    ],
    meditacion: "Encarnar a la mujer que lo consigue.",
  },
];

export default function ProgramTabs() {
  const [active, setActive] = useState(DAYS[0].id);
  const activeDay = DAYS.find((d) => d.id === active) ?? DAYS[0];

  return (
    <section className="bg-cream px-4 py-16 sm:px-6 sm:py-24" id="programa">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label">El recorrido</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-4xl">
          Programa día a día
        </h2>

        <p className="mt-6 text-espresso/80">
          Durante 3 días vas a entender qué te está frenando, qué patrón
          sigues repitiendo y cómo empezar a convertirte en la mujer que sí
          sostiene eso que desea.
        </p>
        <p className="mt-4 text-espresso/60">
          No es otro taller más.
          <br />
          No es solo una clase.
        </p>
        <p className="mt-2 font-medium text-espresso/80">
          Es una experiencia guiada para mirar tu deseo, soltar lo que ya no
          puede venir contigo y empezar a actuar desde la mujer que lo
          consigue.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-3">
          {DAYS.map((day) => (
            <button
              key={day.id}
              onClick={() => setActive(day.id)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition sm:text-base ${
                active === day.id
                  ? "bg-terracotta text-cream shadow-soft"
                  : "bg-white/70 text-espresso/70 hover:bg-white"
              }`}
            >
              {day.tab}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-espresso/10 bg-white/70 p-6 shadow-sm sm:p-10">
          <p className="section-label">{activeDay.dateLabel}</p>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-espresso">
            {activeDay.title}
          </h3>
          <p className="mt-3 text-espresso/80">{activeDay.intro}</p>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-terracotta-600">
            Qué vamos a trabajar
          </p>
          <ul className="mt-3 space-y-3">
            {activeDay.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span className="mt-1 text-terracotta">✦</span>
                <span className="text-espresso/80">{bullet}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl bg-sand-100 px-4 py-3 text-sm font-medium text-espresso/75">
            🧘 Meditación de cierre: {activeDay.meditacion}
          </p>
        </div>

        <p className="mt-4 text-center text-sm text-espresso/60">
          Si estás en LATAM o US, revisa tu horario local antes de reservar.
          El retiro será en vivo, pero tendrás acceso a las grabaciones
          durante 7 días para que puedas vivir el proceso aunque alguna
          sesión no te encaje en directo.
        </p>
      </div>
    </section>
  );
}
