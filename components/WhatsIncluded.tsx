const ITEMS = [
  {
    icon: "🎥",
    title: "Retiro de 3 días",
    text: "Viernes tarde, sábado completo y domingo por la mañana para trabajar juntas en directo, con guía, profundidad y acompañamiento.",
  },
  {
    icon: "📓",
    title: "Workbook del retiro",
    text: "Un cuaderno de trabajo digital para acompañar cada sesión, aterrizar lo vivido y quedarte con claridad después del retiro.",
  },
  {
    icon: "🧘",
    title: "Meditaciones guiadas",
    text: "Meditaciones diseñadas para conectar con tu deseo, soltar la versión antigua y encarnar a la mujer que ya lo consiguió.",
  },
  {
    icon: "⏳",
    title: "Grabaciones durante 7 días",
    text: "Acceso a las grabaciones de las sesiones en directo durante los 7 días posteriores al retiro.",
  },
  {
    icon: "🗺️",
    title: "Plan de integración",
    text: "Un cierre práctico para que no te quedes solo con la emoción del retiro, sino que sepas qué empezar a sostener después.",
  },
  {
    icon: "💌",
    title: "Invitación especial a la mentoría",
    text: "Al final del retiro podrás continuar conmigo en mi mentoría de 3 meses. Si entras durante los 7 días posteriores, se te descuenta el importe del retiro.",
  },
];

export default function WhatsIncluded() {
  return (
    <section className="bg-warm-gradient px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label">Qué incluye</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-4xl">
          Todo lo que recibes en el retiro
        </h2>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-white/80 p-6 text-center shadow-sm"
          >
            <div className="text-3xl">{item.icon}</div>
            <h3 className="mt-3 font-serif text-lg font-semibold text-espresso">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-espresso/75">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
