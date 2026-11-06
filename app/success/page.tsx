import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { RETIRO_ELIGE } from "@/lib/events";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  let error: string | null = null;
  let productId: string | undefined;

  if (!sessionId) {
    error = "No se ha encontrado la información de tu pago.";
  } else {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      productId = session.metadata?.product;
      if (session.payment_status !== "paid") {
        error = "Tu pago aún no se ha confirmado. Si crees que es un error, contáctanos.";
      }
    } catch {
      error = "No hemos podido verificar tu pago. Contáctanos si el problema persiste.";
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-warm-gradient px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-lg rounded-3xl border border-espresso/10 bg-white/80 p-8 text-center shadow-soft sm:p-12">
        {error ? (
          <>
            <p className="text-4xl">⚠️</p>
            <h1 className="mt-4 font-serif text-2xl font-semibold text-espresso">
              Algo no ha ido bien
            </h1>
            <p className="mt-3 text-espresso/75">{error}</p>
          </>
        ) : (
          <>
            <p className="text-4xl">🌿</p>
            <h1 className="mt-4 font-serif text-2xl font-semibold text-espresso sm:text-3xl">
              ¡Tu plaza está reservada!
            </h1>
            {productId === RETIRO_ELIGE.productId ? (
            <p className="mt-3 text-espresso/80">
              ¡Bienvenida a La Mujer Que Se Elige! Nos vemos del 29 al 31
              de enero de 2027 por Zoom. Te llegará un email con la
              confirmación de tu pago y te añadiremos al grupo de WhatsApp
              del retiro, donde compartiremos las novedades y los enlaces de
              Zoom.
            </p>
            ) : (
            <p className="mt-3 text-espresso/80">
              ¡Bienvenida! Nos vemos del 2 al 4 de Octubre para transformar
              tu vida. Únete a nuestra comunidad de WhatsApp{" "}
              <a
                href="https://chat.whatsapp.com/DeJVLzHx1wUHsWrbAM5Afd"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline hover:text-terracotta-600"
              >
                aquí
              </a>{" "}
              y pronto recibirás más información.
            </p>
            )}
            <p className="mt-4 text-sm text-espresso/70">
              En breve recibirás un email de confirmación. Si no lo ves,
              revisa también tu carpeta de spam.
            </p>
          </>
        )}

        <Link
          href={productId === RETIRO_ELIGE.productId ? RETIRO_ELIGE.path : "/"}
          className="btn-secondary mt-8 inline-flex"
        >
          Volver a la página principal
        </Link>
      </div>
    </main>
  );
}
