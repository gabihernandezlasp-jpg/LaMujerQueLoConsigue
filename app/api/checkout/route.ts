import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getPriceCents, getPriceTier, getPriceLabel, PRODUCT_ID } from "@/lib/pricing";
import type { RegistrationPayload } from "@/lib/types";

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Partial<RegistrationPayload>;
  const { nombre, email, whatsapp, deseo, expectativa, marketingConsent } = payload;

  if (!nombre || !email || !whatsapp || !deseo || !expectativa) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios." },
      { status: 400 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    return NextResponse.json(
      { error: "Falta configurar NEXT_PUBLIC_SITE_URL." },
      { status: 500 }
    );
  }

  // El precio se calcula siempre en el servidor: nunca confiamos en lo
  // que pueda enviar el cliente.
  const tier = getPriceTier();
  const amountCents = getPriceCents();
  const label = getPriceLabel(tier);

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: amountCents,
          product_data: {
            name: `La Mujer Que Lo Consigue — Entrada ${label}`,
            description:
              "Retiro virtual de 3 días, 2-4 de octubre de 2026.",
          },
        },
      },
    ],
    metadata: {
      product: PRODUCT_ID,
      nombre,
      whatsapp,
      deseo,
      expectativa,
      marketing_consent: String(marketingConsent === true),
      price_tier: tier,
    },
    invoice_creation: {
      enabled: true,
      invoice_data: {
        description: `La Mujer Que Lo Consigue — Entrada ${label}`,
        metadata: { product: PRODUCT_ID },
      },
    },
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/#inscripcion`,
  });

  return NextResponse.json({ url: session.url });
}
