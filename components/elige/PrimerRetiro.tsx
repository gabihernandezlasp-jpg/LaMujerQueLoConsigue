import Image from "next/image";
import { publicImageExists } from "@/lib/publicImage";
import Pendiente from "./Pendiente";

/**
 * "Lo que dicen ellas" + vídeo del primer retiro (octubre 2026).
 *  - Vídeo: public/videos/primer-retiro.mp4 (y opcional public/images/primer-retiro-poster.jpg)
 *  - Mensajes: capturas anonimizadas (sin nombres, fotos ni teléfonos) en
 *    public/images/primer-retiro/, mostradas en cinta lateral como en la home.
 */
const FEEDBACK = [
  { src: "/images/primer-retiro/feedback-2.jpg", width: 985, height: 760 },
  { src: "/images/primer-retiro/feedback-4.jpg", width: 980, height: 718 },
  { src: "/images/primer-retiro/feedback-7.png", width: 526, height: 274 },
  { src: "/images/primer-retiro/feedback-3.jpg", width: 1031, height: 488 },
  { src: "/images/primer-retiro/feedback-1.jpg", width: 920, height: 1515 },
  { src: "/images/primer-retiro/feedback-6.png", width: 522, height: 577 },
].filter((f) => publicImageExists(f.src.slice(1)));

export default function PrimerRetiro() {
  const hasTrailer = publicImageExists("videos/primer-retiro.mp4");
  const hasPoster = publicImageExists("images/primer-retiro-poster.jpg");
  const feedback = FEEDBACK;
  // Lista duplicada para que la cinta haga un loop continuo sin salto.
  const marquee = [...feedback, ...feedback];
  const isProd = process.env.NODE_ENV === "production";

  if (isProd && !hasTrailer && feedback.length === 0) return null;

  return (
    <section id="ellas" className="overflow-hidden bg-espresso px-4 py-16 text-cream sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
            Lo que dicen ellas
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
            Así se vivió el primer retiro
          </h2>
          <p className="mt-4 text-cream/75">
            En octubre de 2026 nos reunimos por primera vez en{" "}
            <em className="text-gold-300">La Mujer Que Lo Consigue</em>. Esto
            es un pedacito de lo que pasó.
          </p>
        </div>

        {hasTrailer ? (
          <div className="mx-auto mt-10 w-full max-w-[22rem] overflow-hidden rounded-3xl shadow-soft ring-1 ring-cream/10">
            {/* Vídeo vertical (576x1024). Sin póster, #t=0.1 muestra el primer fotograma. */}
            <video
              controls
              preload="metadata"
              playsInline
              poster={hasPoster ? "/images/primer-retiro-poster.jpg" : undefined}
              className="aspect-[9/16] w-full bg-black object-cover"
            >
              <source src={hasPoster ? "/videos/primer-retiro.mp4" : "/videos/primer-retiro.mp4#t=0.1"} type="video/mp4" />
            </video>
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-3xl">
            <Pendiente>
              Tráiler del primer retiro: deja el vídeo en{" "}
              <code>public/videos/primer-retiro.mp4</code>.
            </Pendiente>
          </div>
        )}

        {feedback.length > 0 ? (
          <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden sm:mt-14">
            <div className="animate-marquee flex w-max items-center gap-5">
              {marquee.map((t, i) => (
                <div
                  key={i}
                  className="w-64 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm"
                  aria-hidden={i >= feedback.length}
                >
                  <Image
                    src={t.src}
                    alt={i < feedback.length ? `Mensaje de una participante del primer retiro (${i + 1})` : ""}
                    width={t.width}
                    height={t.height}
                    sizes="256px"
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-6 max-w-3xl">
            <Pendiente>
              Elegir 3 o 4 mensajes reales de mujeres del retiro de octubre o
              de alumnas de Corazón Empoderado (mejor si hablan de relaciones
              o autoestima), con nombre o inicial y permiso. Capturas en{" "}
              <code>public/images/primer-retiro/</code>.
            </Pendiente>
          </div>
        )}
      </div>
    </section>
  );
}
