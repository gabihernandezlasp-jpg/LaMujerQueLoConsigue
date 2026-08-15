import Link from "next/link";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  let email: string | null = null;
  let error: string | null = null;

  if (!sessionId) {
    error = "No se ha encontrado la información de tu pago.";
  } else {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      email = session.customer_email ?? session.customer_details?.email ?? null;
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
            <p className="mt-3 text-espresso/80">
              Gracias por inscribirte en "La Mujer Que Lo Consigue".
              {email && (
                <>
                  {" "}
                  Hemos registrado tu pago con el email{" "}
                  <span className="font-semibold">{email}</span>.
                </>
              )}
            </p>
            <p className="mt-4 text-sm text-espresso/70">
              En breve recibirás la confirmación y los próximos pasos por
              email y por WhatsApp. Si no la ves, revisa también tu carpeta
              de spam.
            </p>
          </>
        )}

        <Link href="/" className="btn-secondary mt-8 inline-flex">
          Volver a la página principal
        </Link>
      </div>
    </main>
  );
}
