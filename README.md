# Coachingconpaty — La Mujer Que Lo Consigue

Landing page de una sola página para el retiro virtual "La Mujer que lo
Consigue" (2-4 de octubre de 2026), construida con Next.js (App Router),
TypeScript, Tailwind CSS y Stripe Checkout.

## Estructura

- `app/page.tsx` — página principal, ensambla todas las secciones.
- `components/` — Hero, Countdown, secciones de la landing y el
  formulario de inscripción.
- `lib/pricing.ts` — lógica de precio dinámico (early bird / regular).
- `lib/stripe.ts` — cliente de Stripe (servidor).
- `app/api/register/route.ts` — guarda (de momento con `console.log`) los
  datos del formulario antes de ir a pago.
- `app/api/checkout/route.ts` — crea la Checkout Session de Stripe con el
  precio calculado en el servidor.
- `app/api/webhook/route.ts` — escucha `checkout.session.completed` y
  loguea el registro completo.
- `app/success/page.tsx` — página de confirmación tras el pago.

## Requisitos

- Node.js 18.18+ o 20+
- Una cuenta de Stripe (modo test es suficiente para desarrollo)
- [Stripe CLI](https://docs.stripe.com/stripe-cli) para probar el webhook
  en local

## 1. Instalar dependencias

```bash
npm install
```

## 2. Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.local.example .env.local
```

Rellena `.env.local` con tus claves de Stripe en modo test
(`Dashboard de Stripe → Developers → API keys`):

- `STRIPE_SECRET_KEY` — clave secreta (`sk_test_...`)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — clave publicable (`pk_test_...`),
  no se usa todavía en el cliente pero queda lista para el futuro
- `STRIPE_WEBHOOK_SECRET` — se obtiene en el paso 4 (`stripe listen`)
- `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000` en local

Nunca subas `.env.local` al repositorio (ya está en `.gitignore`) ni
hardcodees claves en el código: todo se lee desde `process.env`.

## 3. Levantar el servidor de desarrollo

```bash
npm run dev
```

La landing estará en `http://localhost:3000`.

## 4. Probar el webhook de Stripe en local

En otra terminal, con la Stripe CLI ya autenticada (`stripe login`):

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

(También puedes usar `npm run stripe:listen`, que ejecuta el mismo
comando.)

La CLI imprimirá un secreto `whsec_...`: cópialo en `STRIPE_WEBHOOK_SECRET`
dentro de `.env.local` y reinicia `npm run dev`.

## 5. Probar el flujo completo

1. Rellena el formulario de inscripción en la sección de precio.
2. Al enviarlo, se llama a `/api/register` (verás el payload en la
   consola del servidor) y luego a `/api/checkout`, que crea la sesión de
   Stripe y te redirige al Checkout.
3. Usa una [tarjeta de prueba de Stripe](https://docs.stripe.com/testing),
   por ejemplo `4242 4242 4242 4242`, cualquier fecha futura y CVC.
4. Tras pagar, Stripe te redirige a `/success?session_id=...`, que
   recupera la sesión y muestra la confirmación.
5. En la terminal donde corre `stripe listen` verás el evento
   `checkout.session.completed` reenviado, y en la terminal de
   `npm run dev` el log completo del registro (nombre, email, whatsapp,
   deseo, expectativa, aceptación de privacidad).

## Precio dinámico

El precio nunca se confía desde el cliente. `lib/pricing.ts` calcula en
el servidor si aplica el precio Early Bird (47€) o el precio Regular
(57€) comparando la hora actual con el corte fijado el 16 de septiembre
de 2026 a las 00:00 CET (`2026-09-15T22:00:00Z` en UTC, ya que España
está en horario de verano —CEST, UTC+2— en esa fecha). Tanto el
countdown de la landing como `app/api/checkout/route.ts` usan esta misma
constante para no desincronizarse.

Para probar manualmente el cambio de precio antes de esa fecha real,
puedes editar temporalmente `EARLY_BIRD_DEADLINE_UTC` en
`lib/pricing.ts`.

## Pendiente (fuera de alcance de esta entrega)

- Integración de `/api/register` con Notion/CRM (hoy solo hace
  `console.log`).
- Envío real de email/WhatsApp de confirmación desde el webhook (hoy solo
  hace `console.log` del registro completo).
- Sustituir los testimonios placeholder por casos reales.
