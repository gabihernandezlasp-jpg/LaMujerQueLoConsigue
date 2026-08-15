import Image from "next/image";
import Countdown from "./Countdown";
import { EARLY_BIRD_DEADLINE_UTC } from "@/lib/pricing";
import { publicImageExists } from "@/lib/publicImage";

export default function Hero() {
  const hasCoachPhoto = publicImageExists("images/hero-coach.jpg");
  const hasSocialProof = publicImageExists("images/social-proof.jpg");

  return (
    <section className="relative overflow-hidden bg-warm-gradient px-4 pb-12 pt-10 sm:px-6 sm:pb-20 sm:pt-16">
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="section-label">Retiro virtual en vivo · 2, 3 y 4 de octubre</p>

          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-espresso sm:text-6xl">
            La Mujer Que Lo Consigue
          </h1>

          <p className="mt-5 max-w-xl text-lg text-espresso/80 sm:text-xl">
            Un retiro virtual de{" "}
            <strong className="font-bold text-espresso">3 días</strong> para
            mujeres que desean una relación de amor sana, más abundancia o un
            siguiente nivel en su negocio, pero sienten que{" "}
            <strong className="font-bold text-espresso">
              por más que hacen, no logran conseguirlo
            </strong>
            .
          </p>

          <div className="mt-6 space-y-1">
            <p className="text-base font-semibold text-terracotta-600 sm:text-lg">
              2, 3 y 4 de octubre de 2026
            </p>
            <p className="text-base font-semibold text-terracotta-600 sm:text-lg">
              Virtual y en vivo
            </p>
            <p className="text-sm text-espresso/60">
              Incluye workbook, meditaciones guiadas y grabaciones durante 7
              días
            </p>
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-terracotta/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-terracotta-700">
            🔥 Oferta Early Bird activa
          </span>

          <a href="#inscripcion" className="btn-primary mt-4 w-full sm:w-auto">
            Reservar mi plaza por 47 €
          </a>

          <p className="mt-3 text-xs text-espresso/60">
            Precio early bird disponible hasta el 15 de septiembre.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
            <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">
              ⏳ La oferta Early Bird termina en
            </span>
            <Countdown deadline={EARLY_BIRD_DEADLINE_UTC} />
          </div>
        </div>

        {(hasSocialProof || hasCoachPhoto) && (
          <div className="order-first mx-auto flex w-40 flex-col gap-3 sm:w-56 lg:order-last lg:mx-0 lg:w-full">
            {hasSocialProof && (
              <div className="relative aspect-[1000/392] w-full overflow-hidden rounded-2xl bg-white shadow-soft">
                <Image
                  src="/images/social-proof.jpg"
                  alt="Perfil de Instagram de Paty Valero, mentora de autoestima, con más de 450 mil seguidores"
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 224px"
                  className="object-contain"
                />
              </div>
            )}
            {hasCoachPhoto && (
              <div className="relative aspect-[7/6] w-full overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src="/images/hero-coach.jpg"
                  alt="Paty, mentora del retiro La Mujer Que Lo Consigue"
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 224px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
