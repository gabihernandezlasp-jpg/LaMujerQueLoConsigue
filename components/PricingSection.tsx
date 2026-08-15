import Image from "next/image";
import Countdown from "./Countdown";
import RegistrationForm from "./RegistrationForm";
import { EARLY_BIRD_DEADLINE_UTC } from "@/lib/pricing";
import { publicImageExists } from "@/lib/publicImage";

export default function PricingSection() {
  const hasCtaPhoto = publicImageExists("images/cta-coach.jpg");

  return (
    <section
      id="inscripcion"
      className="bg-warm-gradient px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="section-label">Tu plaza te espera</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-4xl">
            Reserva tu lugar en el retiro
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-8 rounded-3xl border border-espresso/10 bg-white/80 p-4 shadow-soft sm:mt-14 sm:p-10 lg:grid-cols-2">
          <div className="flex flex-col justify-between">
            <div className="rounded-2xl border-2 border-terracotta/30 bg-terracotta-50 p-4 sm:p-6">
              <span className="inline-block rounded-full bg-terracotta px-3 py-1 text-xs font-bold uppercase tracking-wide text-cream">
                Oferta Early Bird
              </span>

              <div className="mt-4 flex items-end gap-3">
                <span className="font-serif text-6xl font-bold text-terracotta-700">
                  47€
                </span>
                <span className="mb-2 text-2xl font-medium text-espresso/40 line-through">
                  57€
                </span>
              </div>
              <p className="mt-1 text-sm text-espresso/70">
                El precio sube a <strong>57€</strong> a partir del 16 de
                septiembre
              </p>

              <div className="mt-5 border-t border-terracotta/20 pt-5">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-terracotta-700">
                  ⏳ Esta tarifa desaparece en:
                </span>
                <Countdown
                  deadline={EARLY_BIRD_DEADLINE_UTC}
                  expiredMessage="El precio early bird ha finalizado — ahora el retiro cuesta 57€."
                />
              </div>
            </div>

            <ul className="mt-8 space-y-2 text-sm text-espresso/75">
              <li>✦ 3 días en vivo, viernes a domingo</li>
              <li>✦ Workbook + meditaciones guiadas</li>
              <li>✦ Grabaciones disponibles 7 días</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-cream/60 p-5 sm:p-6">
            {hasCtaPhoto && (
              <div className="mb-5 flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/images/cta-coach.jpg"
                    alt="Paty, mentora del retiro, sonriendo a cámara"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <p className="text-sm italic text-espresso/70">
                  Nos encantaría acompañarte estos tres días. — Paty
                </p>
              </div>
            )}
            <RegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
