import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | La Mujer Que Lo Consigue",
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-serif text-3xl font-semibold text-espresso sm:text-4xl">
        Política de Privacidad
      </h1>

      <p className="mt-6 text-espresso/80">
        Esta página es un placeholder pendiente de redactar con el texto
        legal definitivo (responsable del tratamiento, finalidades exactas,
        base legal, plazos de conservación, derechos ARCO-POL, y
        procesadores de datos como Stripe y la plataforma de email
        utilizada).
      </p>

      <p className="mt-4 text-espresso/80">
        En resumen: los datos que nos facilitas en el formulario de
        inscripción se usan para gestionar tu plaza en el retiro y, solo si
        marcas la casilla correspondiente, para enviarte comunicaciones
        sobre este y futuros contenidos, ofertas y programas. Puedes
        darte de baja de esas comunicaciones en cualquier momento.
      </p>

      <p className="mt-8">
        <Link href="/" className="underline hover:text-terracotta-600">
          Volver a la página principal
        </Link>
      </p>
    </main>
  );
}
