import Image from "next/image";
import { publicImageExists } from "@/lib/publicImage";

// Capturas reales de WhatsApp enviadas por el cliente, mostradas tal cual
// en vez de transcritas, para que se vea la conversación original.
const TESTIMONIAL_IMAGES = [
  {
    src: "images/testimonial-1.jpg",
    width: 700,
    height: 436,
    alt: "Captura de WhatsApp de una alumna agradeciendo la meditación del amor",
  },
  {
    src: "images/testimonial-2.jpg",
    width: 700,
    height: 353,
    alt: "Captura de WhatsApp de una alumna contando cómo se sintió tras una sesión",
  },
  {
    src: "images/testimonial-3.jpg",
    width: 700,
    height: 311,
    alt: "Captura de WhatsApp de una alumna sintiendo más alegría y vitalidad",
  },
  {
    src: "images/testimonial-4.jpg",
    width: 700,
    height: 150,
    alt: "Captura de WhatsApp de una alumna agradeciendo la primera sesión",
  },
  {
    src: "images/testimonial-5.jpg",
    width: 700,
    height: 568,
    alt: "Captura de WhatsApp de una alumna sobre la meditación para atraer el amor",
  },
  {
    src: "images/testimonial-6.jpg",
    width: 700,
    height: 583,
    alt: "Captura de una conversación de WhatsApp sobre cómo le cambió el día",
  },
  {
    src: "images/testimonial-7.jpg",
    width: 700,
    height: 485,
    alt: "Captura de WhatsApp agradeciendo el acompañamiento de Paty",
  },
];

// Se duplica la lista para que la cinta de burbujas pueda hacer un loop
// visual continuo sin salto al llegar al final.
const MARQUEE_ITEMS = [...TESTIMONIAL_IMAGES, ...TESTIMONIAL_IMAGES];

export default function Testimonials() {
  const hasHeaderPhoto = publicImageExists("images/para-quien.jpg");

  return (
    <section className="overflow-hidden bg-cream px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label">Voces del camino</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-4xl">
          Mujeres que lo han conseguido
        </h2>
      </div>

      {hasHeaderPhoto && (
        <div className="relative mx-auto mt-8 aspect-video w-full max-w-xs overflow-hidden rounded-2xl shadow-soft sm:max-w-sm">
          <Image
            src="/images/para-quien.jpg"
            alt="Grupo de mujeres escuchando en directo una charla de Paty"
            fill
            sizes="(min-width: 640px) 384px, 320px"
            className="object-cover"
          />
        </div>
      )}

      <div className="relative mt-10 sm:mt-14">
        <div className="animate-marquee flex w-max items-center gap-5">
          {MARQUEE_ITEMS.map((t, i) => (
            <div
              key={i}
              className="w-64 shrink-0 overflow-hidden rounded-2xl shadow-sm"
            >
              <Image
                src={`/${t.src}`}
                alt={t.alt}
                width={t.width}
                height={t.height}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
