import Image from "next/image";
import { publicImageExists } from "@/lib/publicImage";

export default function Footer() {
  const hasAmbientPhoto = publicImageExists("images/footer-ambient.jpg");

  return (
    <footer className="relative overflow-hidden border-t border-espresso/10 bg-espresso px-4 py-10 text-cream/80 sm:px-6">
      {hasAmbientPhoto && (
        <>
          <Image
            src="/images/footer-ambient.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-espresso/85" />
        </>
      )}

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-serif text-lg font-semibold text-cream">
          La Mujer Que Lo Consigue
        </p>
        <p className="mt-2 text-sm">
          Retiro virtual · 2-4 de octubre de 2026
        </p>
        <p className="mt-4 text-xs text-cream/60">
          Contacto:{" "}
          <a href="mailto:hola@coachingconpaty.com" className="underline">
            hola@coachingconpaty.com
          </a>{" "}
          (placeholder)
        </p>
        <p className="mx-auto mt-4 max-w-xl text-[11px] leading-relaxed text-cream/50">
          Al inscribirte aceptas nuestros términos y condiciones y política
          de privacidad. Este programa no sustituye tratamiento psicológico
          o médico profesional. Plazas limitadas. El acceso a las
          grabaciones estará disponible durante 7 días tras cada sesión en
          directo.
        </p>
        <p className="mt-4 text-[11px] text-cream/40">
          © {new Date().getFullYear()} Coaching con Paty. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
