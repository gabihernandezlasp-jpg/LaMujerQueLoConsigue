const FEATURES = [
  {
    title: "En vivo y acompañada",
    text: "Nos veremos en directo durante los 3 días para trabajar juntas, sentir el grupo y sostener el proceso en tiempo real.",
  },
  {
    title: "Accesible desde casa",
    text: "Sin vuelos, sin alojamiento y sin dejar tu casa ni tus responsabilidades durante días enteros.",
  },
  {
    title: "Profundo de verdad",
    text: "Meditaciones guiadas, workbook, preguntas potentes y un grupo sostenido para que el trabajo cale.",
  },
];

export default function DifferentialAngle() {
  return (
    <section className="bg-sand-100 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label">Virtual no es superficial</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-4xl">
          No necesitas irte lejos para volver a ti
        </h2>
        <p className="mt-6 text-lg text-espresso/80">
          Un retiro no se mide por los kilómetros que recorres ni por los
          billetes de avión que compras. Se mide por la profundidad del
          espacio que te permites habitar. Desde tu casa, con tu cámara
          encendida si te apetece, tu cuaderno en la mano y un espacio
          reservado para ti, vamos a crear una experiencia íntima, sostenida
          y en vivo.
        </p>
        <p className="mt-4 text-espresso/70">
          Sin vuelos. Sin hotel. Sin tener que desaparecer de tu vida durante
          una semana.
        </p>
        <p className="mt-2 font-medium text-espresso/80">
          Pero con toda la transformación de una experiencia que te invita a
          verte de verdad.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-10">
          {FEATURES.map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <div className="relative flex aspect-square w-48 flex-col items-center justify-center rounded-full bg-gradient-to-br from-terracotta-500 to-gold-700 p-6 text-center shadow-soft sm:w-56">
                <h3 className="font-serif text-lg font-semibold text-cream">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-snug text-cream/90">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
