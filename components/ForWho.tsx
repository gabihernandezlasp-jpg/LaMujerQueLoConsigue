const PHRASES = [
  { text: "No tengo la relación que deseo, y no sé si algún día la tendré.", emoji: "💔" },
  { text: "Mi negocio no da el salto, por más que hago, hago y hago.", emoji: "😮‍💨" },
  { text: "Siento que hay algo en mí que me frena, pero no sé qué es.", emoji: "🤍" },
  {
    text: "Atraigo siempre el mismo tipo de vínculo, cliente o situación, y estoy cansada de repetirlo.",
    emoji: "🔁",
  },
  {
    text: "Tengo la sensación de que el éxito, el amor o la abundancia son para otras, no para mí.",
    emoji: "😔",
  },
  { text: "He hecho terapia, cursos, mentorías… y sigo sin conseguirlo del todo.", emoji: "🎯" },
];

export default function ForWho() {
  return (
    <section className="bg-cream px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label">¿Es esto para ti?</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-4xl">
          Este retiro es para ti si alguna vez te has dicho...
        </h2>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:mt-14 sm:grid-cols-2">
        {PHRASES.map((phrase) => (
          <div
            key={phrase.text}
            className="flex items-start gap-3 rounded-2xl border border-espresso/10 bg-white/60 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="mt-0.5 text-2xl" aria-hidden="true">
              {phrase.emoji}
            </span>
            <p className="text-espresso/85">"{phrase.text}"</p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-espresso/70">
        Si te reconoces en alguna de estas frases, este retiro no viene a
        darte más información para guardar en una libreta. Viene a ayudarte a
        mirar qué parte de ti sigue sosteniendo la realidad que dices que
        quieres cambiar.
      </p>
    </section>
  );
}
