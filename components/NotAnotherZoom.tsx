const CHANGES = [
  {
    title: "En el amor",
    text: "Dejas de justificar vínculos que no te eligen.",
  },
  {
    title: "En el dinero / negocio",
    text: "Dejas de hacer más desde ansiedad y empiezas a sostener abundancia.",
  },
  {
    title: "En tu energía",
    text: "Reconoces cuándo actúas desde miedo, espera o autosabotaje.",
  },
  {
    title: "En tu forma de elegir",
    text: "Tomas decisiones desde la mujer que lo consigue.",
  },
];

export default function NotAnotherZoom() {
  return (
    <section className="bg-cream px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="section-label">La diferencia</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-4xl">
          Esto no es otro Zoom más
        </h2>

        <p className="mt-6 text-espresso/70">
          No es una clase más, ni una meditación suelta, ni una charla
          bonita que se olvida el lunes siguiente. Tampoco es una promesa
          mágica de "manifiesta y espera".
        </p>
        <p className="mt-4 font-medium text-espresso/85">
          Es un espacio para mirar con honestidad qué deseas, qué patrón
          sigues repitiendo y cómo empezar a convertirte en la mujer que lo
          consigue.
        </p>
        <p className="mt-4 font-medium text-espresso">
          Porque no se trata de desear más. Se trata de convertirte en la
          mujer que puede sostenerlo.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl text-center">
        <p className="font-serif text-xl font-semibold text-espresso sm:text-2xl">
          Esto es lo que puede empezar a moverse
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {CHANGES.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-espresso/10 bg-white/70 p-6 text-left shadow-sm"
            >
              <h4 className="font-serif text-lg font-semibold text-terracotta-600">
                {item.title}
              </h4>
              <p className="mt-2 text-sm text-espresso/75">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
