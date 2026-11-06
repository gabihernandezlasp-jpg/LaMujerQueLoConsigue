import type { Metadata } from "next";
import Image from "next/image";
import Countdown from "@/components/Countdown";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";
import FAQElige from "@/components/elige/FAQElige";
import PrimerRetiro from "@/components/elige/PrimerRetiro";
import StickyCTA from "@/components/elige/StickyCTA";
import { CurrentPrice, EarlyBirdOnly } from "@/components/PriceTag";
import { RETIRO_ELIGE as R } from "@/lib/events";
import { DESEO_OPCIONES_ELIGE } from "@/lib/types";
import { publicImageExists } from "@/lib/publicImage";

export const metadata: Metadata = {
  title: "La Mujer Que Se Elige — Retiro online con Paty Valero | 29-31 enero 2027",
  description:
    "3 días en directo por Zoom para dejar de conformarte con migajas en el amor, en tus relaciones y contigo misma. 29, 30 y 31 de enero de 2027.",
  openGraph: {
    title: "La Mujer Que Se Elige — Retiro online con Paty Valero",
    description:
      "Antes de que alguien te elija, te eliges tú. Retiro online en directo, 29-31 de enero de 2027.",
    type: "website",
  },
};

const DIAS = [
  {
    corto: "Vie 29",
    dia: "Viernes 29",
    horas: "18:00 – 21:00",
    titulo: "Abrir el corazón",
    texto: "No empezamos analizando el problema, empezamos abriendo el corazón. Te encontrarás con la versión de ti que ya vive el amor que deseas y mirarás con honestidad qué se repite en tu historia.",
  },
  {
    corto: "Sáb 30",
    dia: "Sábado 30",
    horas: "9:00 – 20:00, con descansos",
    titulo: "Soltar las migajas",
    texto: "Descubrirás dónde aprendiste qué era el amor, por qué sigues aceptando menos de lo que mereces y qué te impide sostener algo mejor cuando llega. Soltarás a la mujer que se conformaba y sentirás en el cuerpo cómo es sentirte amada, elegida y en paz.",
  },
  {
    corto: "Dom 31",
    dia: "Domingo 31",
    horas: "9:00 – 16:00, con descansos",
    titulo: "Elegirte",
    texto: "Convertirás todo lo vivido en decisiones concretas: qué límite vas a poner, qué conversación vas a tener y cómo vas a sostenerte cuando vuelvan las situaciones de siempre. Te vas con un plan para los días siguientes, hasta San Valentín.",
  },
];

// Enero: España CET. Argentina/Chile/Uruguay −4 h; Colombia/Perú/Ecuador −6 h; CDMX −7 h.
const PAISES = [
  { pais: "España", vie: "18 a 21 h", sab: "9 a 20 h", dom: "9 a 16 h" },
  { pais: "Argentina, Chile y Uruguay", vie: "14 a 17 h", sab: "5 a 16 h", dom: "5 a 12 h" },
  { pais: "Colombia, Perú y Ecuador", vie: "12 a 15 h", sab: "3 a 14 h", dom: "3 a 10 h" },
  { pais: "México (CDMX)", vie: "11 a 14 h", sab: "2 a 13 h", dom: "2 a 9 h" },
];

const COUNTDOWN_BOX = "bg-white text-terracotta-700 ring-1 ring-terracotta/20 shadow-sm";

function Precio() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-end justify-center gap-3">
        <span className="font-serif text-6xl font-semibold text-espresso">
          <CurrentPrice retiro={R} />
        </span>
        <EarlyBirdOnly retiro={R}>
          <span className="mb-2 text-2xl text-espresso/40 line-through">57 €</span>
        </EarlyBirdOnly>
      </div>
      <EarlyBirdOnly retiro={R}>
        <span className="rounded-full bg-gold/30 px-3 py-1 text-xs font-semibold text-espresso">
          Precio early bird hasta el 7 de enero · después, 57 €
        </span>
      </EarlyBirdOnly>
      <p className="text-sm text-espresso/65">Precio completo, sin pagos adicionales.</p>
    </div>
  );
}

function BotonCompra() {
  return (
    <a href="#inscripcion" className="btn-primary w-full sm:w-auto">
      Quiero elegirme&nbsp;·&nbsp;<CurrentPrice retiro={R} />
    </a>
  );
}

function FormCard({ idPrefix, id, className = "" }: { idPrefix: string; id: string; className?: string }) {
  return (
    <div
      data-reserva
      id={id}
      className={`scroll-mt-6 rounded-3xl bg-white p-5 text-left shadow-soft ring-1 ring-espresso/5 sm:p-7 ${className}`}
    >
      <p className="mb-4 text-center font-serif text-2xl text-espresso">Reserva tu plaza</p>
      <RegistrationForm
        idPrefix={idPrefix}
        retiro={R.productId}
        deseoLabel="¿En qué relación quieres elegirte?"
        deseoOpciones={DESEO_OPCIONES_ELIGE}
        expectativaLabel="¿Qué te gustaría llevarte del retiro?"
        submitLabel="Quiero elegirme y pagar"
        defaultCountry="ES"
        compact
      />
    </div>
  );
}

export default function LaMujerQueSeElige() {
  const hasHeroPhoto = publicImageExists("images/paty-portrait-1.jpg");
  const hasAboutPhoto = publicImageExists("images/cta-coach.jpg");

  return (
    <div className="theme-invierno min-h-screen">
      <main>
        {/* CABECERA (formulario solo en escritorio) */}
        <section className="bg-gradient-to-b from-sand-100 via-cream to-cream px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-14">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-12">
            <div className="text-center">
              {hasHeroPhoto && (
                <div className="relative mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full shadow-soft ring-4 ring-white">
                  <Image src="/images/paty-portrait-1.jpg" alt="Paty Valero" fill priority sizes="96px" className="object-cover" />
                </div>
              )}
              <p className="section-label">Retiro online con Paty Valero</p>
              <h1 className="mt-3 font-serif text-[2.6rem] font-semibold leading-[1.05] text-espresso sm:text-6xl">
                La Mujer Que <em className="font-medium italic text-terracotta">Se Elige</em>
              </h1>
              <p className="mx-auto mt-4 max-w-md text-lg text-espresso/80">
                3 días para dejar de conformarte con migajas en el amor, en tus
                relaciones y contigo misma.
              </p>

              <p className="mt-6 font-serif text-2xl text-espresso">29, 30 y 31 de enero de 2027</p>
              <p className="mt-1 text-sm font-medium text-terracotta-700">Online y en directo por Zoom</p>

              <div className="mt-7">
                <Precio />
              </div>
              <EarlyBirdOnly retiro={R}>
                <div className="mt-4 flex justify-center">
                  <Countdown
                    deadline={R.earlyBirdDeadlineUtc}
                    boxClassName={COUNTDOWN_BOX}
                    expiredMessage="Ahora el retiro cuesta 57 €."
                  />
                </div>
              </EarlyBirdOnly>

              <div data-oculta-sticky className="mt-7 lg:hidden">
                <BotonCompra />
              </div>
            </div>

            <FormCard idPrefix="top-" id="reserva" className="hidden lg:block" />
          </div>
        </section>

        {/* PROGRAMA + HORARIO */}
        <section id="programa" className="bg-sand-100 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-serif text-3xl font-semibold text-espresso sm:text-4xl">El fin de semana</h2>
            <p className="mt-2 text-sm text-espresso/60">29, 30 y 31 de enero · hora de España</p>
            <ol className="mt-8 grid gap-4 lg:grid-cols-3">
              {DIAS.map((d, i) => (
                <li key={d.dia} className="flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm ring-1 ring-espresso/5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta font-serif text-lg text-cream">
                    {i + 1}
                  </span>
                  <p className="mt-3 font-serif text-2xl text-espresso">{d.titulo}</p>
                  <p className="mt-1 text-sm font-semibold text-terracotta-700">
                    {d.dia} · {d.horas}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-espresso/75">{d.texto}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm text-espresso/70">
              Si no puedes conectarte a alguna parte en directo, tienes todas las sesiones grabadas durante 2 semanas.
            </p>

            <details className="group mx-auto mt-6 max-w-2xl rounded-2xl bg-white/80 ring-1 ring-espresso/10">
              <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-espresso">
                🌎 Ver el horario en tu país
                <span className="text-terracotta transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <div className="overflow-x-auto px-2 pb-3">
                <table className="w-full min-w-[460px] text-center text-sm">
                  <thead className="text-espresso/60">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">País</th>
                      <th className="px-3 py-2 font-medium">Viernes</th>
                      <th className="px-3 py-2 font-medium">Sábado</th>
                      <th className="px-3 py-2 font-medium">Domingo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-espresso/10 text-espresso/80">
                    {PAISES.map((p) => (
                      <tr key={p.pais}>
                        <td className="px-3 py-2 text-left font-medium text-espresso">{p.pais}</td>
                        <td className="px-3 py-2">{p.vie}</td>
                        <td className="px-3 py-2">{p.sab}</td>
                        <td className="px-3 py-2">{p.dom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </section>

        {/* LA IDEA CENTRAL */}
        <section className="bg-cream px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-semibold leading-tight text-espresso sm:text-5xl">
              No es mala suerte. Es que todavía <em className="font-medium italic text-terracotta">no te has elegido</em>.
            </h2>
            <div className="mx-auto mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-espresso/80">
              <p>
                La vida te trata como tú te tratas. Si te abandonas cuando más te
                necesitas, si te hablas con dureza, si aceptas menos de lo que
                mereces, tus relaciones te devuelven exactamente eso.
              </p>
              <p>
                Por eso cambiar de pareja, de amigas o de ciudad no basta. Si tú
                sigues siendo la misma, acabas recreando la misma historia con
                otra decoración.
              </p>
              <p>
                Pero cuando te eliges, todo empieza a cambiar: lo que permites,
                lo que pides, a quién atraes y a quién dejas ir. Elegirte no es
                egoísmo. Es la base de cualquier amor sano.
              </p>
            </div>
            <p className="mt-10 font-serif text-2xl italic text-espresso">
              Antes de que alguien te elija, te eliges tú.
            </p>
          </div>
        </section>

        {/* SOBRE PATY */}
        <section className="bg-sand-100 px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            {hasAboutPhoto && (
              <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full shadow-soft ring-4 ring-white">
                <Image src="/images/cta-coach.jpg" alt="Paty Valero" fill sizes="176px" className="object-cover" />
              </div>
            )}
            <p className="section-label mt-6">Sobre Paty</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-4xl">
              Soy Paty Valero, coach de autoestima y manifestación.
            </h2>
            <div className="mt-6 space-y-4 text-espresso/80">
              <p>
                Yo también acepté migajas. Desde pequeña aprendí que si pasaba
                desapercibida no molestaba a nadie, y me convertí en una mujer
                que se hacía pequeña en el trabajo y en el amor. Tuve relaciones
                en las que aceptaba menos de lo que merecía, no porque no lo
                supiera, sino porque todavía no me había elegido.
              </p>
              <p>
                Un día decidí que prefería estar sola que mal acompañada. Esa
                decisión lo cambió todo. Y la mujer que ya no aceptaba migajas
                fue la que conoció a Martín, mi pareja.
              </p>
              <p>
                Hoy acompaño a mujeres a hacer ese mismo cambio con mi método,{" "}
                <strong className="text-espresso">Autoestima Manifestadora</strong>,
                que une neurociencia, espiritualidad y trabajo de identidad. Me
                siguen más de 600.000 personas en redes y escribí el libro{" "}
                <em>Primero tú, después el milagro</em>.
              </p>
            </div>
          </div>
        </section>

        {/* LO QUE DICEN ELLAS + TRÁILER */}
        <PrimerRetiro />

        {/* FORMULARIO FINAL */}
        <section className="bg-warm-gradient px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-4xl items-center gap-8 lg:grid-cols-[1fr_minmax(0,420px)]">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-semibold text-espresso sm:text-4xl">La Mujer Que Se Elige</h2>
              <p className="mt-2 font-serif text-xl text-espresso/80">29, 30 y 31 de enero · online en directo</p>
              <div className="mt-6">
                <Precio />
              </div>
            </div>
            <FormCard idPrefix="bottom-" id="inscripcion" />
          </div>
        </section>

        <FAQElige />
      </main>

      <Footer nombre="La Mujer Que Se Elige" fechas={R.fechasTexto} grabaciones="durante 2 semanas después del retiro" />
      <StickyCTA />
      <div className="h-20 sm:hidden" aria-hidden="true" />
    </div>
  );
}
