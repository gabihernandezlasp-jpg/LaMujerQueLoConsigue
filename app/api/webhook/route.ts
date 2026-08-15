import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[webhook] Falta STRIPE_WEBHOOK_SECRET.");
    return NextResponse.json({ error: "Webhook no configurado." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Falta la firma de Stripe." }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Firma inválida";
    console.error("[webhook] Verificación de firma fallida:", message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata ?? {};

    // TODO: aquí se conectará el envío de email de confirmación y WhatsApp.
    console.log("[webhook] Inscripción completada:", {
      nombre: metadata.nombre,
      email: session.customer_email ?? session.customer_details?.email,
      whatsapp: metadata.whatsapp,
      deseo: metadata.deseo,
      expectativa: metadata.expectativa,
      marketing_consent: metadata.marketing_consent,
      price_tier: metadata.price_tier,
      amount_total: session.amount_total,
      session_id: session.id,
    });
  }

  return NextResponse.json({ received: true });
}
