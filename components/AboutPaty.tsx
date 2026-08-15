import Image from "next/image";
import { publicImageExists } from "@/lib/publicImage";

const SOCIALS = [
  {
    label: "Instagram",
    emoji: "📷",
    href: "https://www.instagram.com/coachingconpaty/",
  },
  {
    label: "TikTok",
    emoji: "🎵",
    href: "https://www.tiktok.com/@coachingconpaty",
  },
  {
    label: "YouTube",
    emoji: "▶️",
    href: "https://www.youtube.com/@patyvalerocoaching",
  },
];

const PHOTOS = [
  {
    src: "images/paty-portrait-1.jpg",
    alt: "Paty Valero, mentora y coach",
  },
  {
    src: "images/paty-portrait-4.jpg",
    alt: "Paty Valero hablando en un evento en directo",
  },
  {
    src: "images/paty-portrait-2.jpg",
    alt: "Paty Valero acompañando una meditación grupal en directo",
  },
  {
    src: "images/footer-ambient.jpg",
    alt: "Paty Valero en un momento de conexión y meditación",
  },
];

export default function AboutPaty() {
  const photos = PHOTOS.filter((p) => publicImageExists(p.src));

  return (
    <section className="bg-sand-100 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {photos.length > 0 && (
          <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-4 lg:mx-0">
            {photos.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-soft"
              >
                <Image
                  src={`/${photo.src}`}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 250px, 200px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="text-center lg:text-left">
          <p className="section-label">Sobre Paty</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-4xl">
            Soy Paty Valero
          </h2>

          <div className="mt-6 space-y-4 text-espresso/80">
            <p>
              Mentora, coach y creadora de una comunidad de más de{" "}
              <strong className="font-bold text-espresso">
                600.000 mujeres
              </strong>{" "}
              en redes sociales.
            </p>
            <p>
              Antes de dedicarme a esto, estudié Derecho y trabajé como
              abogada en España. Después me formé en coaching personal,
              coaching de equipos y ACT —Acceptance and Commitment
              Therapy—, pero mi mayor escuela también ha sido mi propia
              vida.
            </p>
            <p>
              Durante años viví desde la exigencia, la comparación y una
              autoestima muy baja, hasta que una etapa muy difícil me obligó
              a parar y empezar a cambiar de verdad.
            </p>
            <p>
              Hoy acompaño a mujeres a dejar de repetirse, dejar de
              conformarse y empezar a sostener el amor, la abundancia y la
              vida que desean.
            </p>
            <p className="font-medium text-espresso">
              Mi trabajo no va de darte más teoría. Va de ayudarte a ver qué
              te frena y cómo empezar a convertirte en la mujer que sí lo
              consigue.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-espresso/15 bg-white/70 px-4 py-2 text-sm font-medium text-espresso transition hover:bg-white"
              >
                <span aria-hidden="true">{social.emoji}</span>
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
