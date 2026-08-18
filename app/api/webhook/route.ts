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
    const email = session.customer_email ?? session.customer_details?.email;

    // TODO: aquí se conectará el envío de email de confirmación y WhatsApp.
    console.log("[webhook] Inscripción completada:", {
      nombre: metadata.nombre,
      email,
      whatsapp: metadata.whatsapp,
      deseo: metadata.deseo,
      expectativa: metadata.expectativa,
      marketing_consent: metadata.marketing_consent,
      price_tier: metadata.price_tier,
      amount_total: session.amount_total,
      session_id: session.id,
    });

    await syncBrevoContact(email, metadata);
  }

  return NextResponse.json({ received: true });
}

async function syncBrevoContact(
  email: string | null | undefined,
  metadata: Stripe.Metadata
) {
  if (!email) {
    console.error("[webhook->brevo] No hay email en la sesión, se omite la sincronización.");
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[webhook->brevo] Falta BREVO_API_KEY, se omite la sincronización.");
    return;
  }

  // Todo el que paga entra en la lista, haya marcado el checkbox o no;
  // el consentimiento de marketing se registra como atributo del
  // contacto, no como pertenencia a la lista.
  const body: Record<string, unknown> = {
    email,
    attributes: {
      NOMBRE: metadata.nombre,
      WHATSAPP: normalizeWhatsapp(metadata.whatsapp),
      DESEO_PRINCIPAL: metadata.deseo,
      EXPECTATIVA: metadata.expectativa,
      FECHA_COMPRA: new Date().toISOString(),
      CONSENTIMIENTO_MARKETING: metadata.marketing_consent === "true",
    },
    updateEnabled: true,
    listIds: [Number(process.env.BREVO_LIST_ID_MARKETING)],
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text();

      // Brevo puede rechazar el campo WHATSAPP por estar ya asociado a
      // otro contacto o por no tener un formato válido (falta el
      // prefijo de país, etc.). En ambos casos no queremos perder el
      // resto de la sincronización: se reintenta sin ese campo para que
      // el contacto se cree igualmente.
      if (isWhatsappAttributeError(response.status, errorBody)) {
        console.warn(
          "[webhook->brevo] WHATSAPP inválido o duplicado, reintentando sin ese campo:",
          { errorBody, contact: body }
        );
        await syncBrevoContactWithoutWhatsapp(apiKey, body);
        return;
      }

      console.error("[webhook->brevo] Fallo al sincronizar el contacto:", {
        status: response.status,
        errorBody,
        contact: body,
      });
    }
  } catch (err) {
    console.error("[webhook->brevo] Error al llamar a la API de Brevo:", {
      error: err instanceof Error ? err.message : err,
      contact: body,
    });
  }
}

// Brevo exige el número en formato internacional (con prefijo de
// país). El formulario no obliga a escribirlo, así que si la usuaria
// no lo incluyó, asumimos España (+34) en vez de bloquear el registro.
function normalizeWhatsapp(whatsapp: string | undefined): string | undefined {
  if (!whatsapp) return whatsapp;

  const digitsOnly = whatsapp.replace(/[^\d+]/g, "");
  if (digitsOnly.startsWith("+")) return digitsOnly;

  return `+34${digitsOnly}`;
}

function isWhatsappAttributeError(status: number, errorBody: string): boolean {
  if (status !== 400) return false;

  try {
    const parsed = JSON.parse(errorBody) as {
      code?: string;
      message?: string;
      metadata?: { duplicate_identifiers?: string[] };
    };

    const isDuplicate =
      parsed.code === "duplicate_parameter" &&
      Boolean(parsed.metadata?.duplicate_identifiers?.includes("WHATSAPP"));

    const isInvalidFormat =
      parsed.code === "invalid_parameter" &&
      Boolean(parsed.message?.toLowerCase().includes("whatsapp"));

    return isDuplicate || isInvalidFormat;
  } catch {
    return false;
  }
}

async function syncBrevoContactWithoutWhatsapp(
  apiKey: string,
  body: Record<string, unknown>
) {
  const attributes = { ...(body.attributes as Record<string, unknown>) };
  delete attributes.WHATSAPP;
  const retryBody = { ...body, attributes };

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(retryBody),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("[webhook->brevo] Fallo al reintentar sin WHATSAPP:", {
      status: response.status,
      errorBody,
      contact: retryBody,
    });
  }
}
