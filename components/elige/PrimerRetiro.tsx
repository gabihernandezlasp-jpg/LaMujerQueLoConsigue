import fs from "node:fs";
import path from "node:path";
import { publicImageExists } from "@/lib/publicImage";
import Pendiente from "./Pendiente";

/**
 * "Lo que dicen ellas" + tráiler del primer retiro (octubre 2026).
 *
 * Para rellenarla basta con dejar los archivos en /public:
 *  - Tráiler: public/videos/primer-retiro.mp4 (y opcional public/images/primer-retiro-poster.jpg)
 *  - Mensajes: capturas en public/images/primer-retiro/ (jpg, png o webp), por orden alfabético
 * Sin archivos, la sección no muestra nada en producción.
 */
const FEEDBACK_DIR = path.join(process.cwd(), "public", "images", "primer-retiro");

function getFeedbackImages(): string[] {
  try {
    return fs
      .readdirSync(FEEDBACK_DIR)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => `/images/primer-retiro/${f}`);
  } catch {
    return [];
  }
}

export default function PrimerRetiro() {
  const hasTrailer = publicImageExists("videos/primer-retiro.mp4");
  const hasPoster = publicImageExists("images/primer-retiro-poster.jpg");
  const feedback = getFeedbackImages();
  const isProd = process.env.NODE_ENV === "production";

  if (isProd && !hasTrailer && feedback.length === 0) return null;

  return (
    <section id="ellas" className="bg-espresso px-4 py-16 text-cream sm:px-6 sm:py-24">
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
          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl shadow-soft ring-1 ring-cream/10">
            <video
              controls
              preload="none"
              playsInline
              poster={hasPoster ? "/images/primer-retiro-poster.jpg" : undefined}
              className="aspect-video w-full bg-black object-cover"
            >
              <source src="/videos/primer-retiro.mp4" type="video/mp4" />
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
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {feedback.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`Mensaje de una participante (${i + 1})`}
                loading="lazy"
                className="mb-4 w-full break-inside-avoid rounded-2xl shadow-soft"
              />
            ))}
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
