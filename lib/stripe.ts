import Stripe from "stripe";

let stripeClient: Stripe | null = null;

// Instanciación perezosa: si se creara al importar el módulo, Next.js
// fallaría en `next build` al recolectar datos de las rutas incluso sin
// llegar a atender ninguna petición real. Así solo falla si de verdad se
// invoca sin STRIPE_SECRET_KEY configurada.
export function getStripe(): Stripe {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Falta la variable de entorno STRIPE_SECRET_KEY");
  }

  stripeClient = new Stripe(secretKey, {
    apiVersion: "2024-06-20",
  });
  return stripeClient;
}
