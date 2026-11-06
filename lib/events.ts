import {
  EARLY_BIRD_DEADLINE_UTC,
  EARLY_BIRD_PRICE_CENTS,
  REGULAR_PRICE_CENTS,
  PRODUCT_ID,
  type PriceTier,
} from "./pricing";

/**
 * Configuración de cada retiro que se vende desde esta web. El checkout y
 * el webhook eligen la configuración a partir de `id`, de modo que cada
 * edición tiene su propio precio, su propio texto en Stripe y su propia
 * lista de Brevo.
 */
export type RetiroConfig = {
  /** Valor que se guarda en metadata.product de la sesión de Stripe. */
  productId: string;
  nombre: string;
  /** Ruta de la landing, usada para el cancel_url de Stripe. */
  path: string;
  fechasTexto: string;
  stripeDescripcion: string;
  earlyBirdDeadlineUtc: string;
  earlyBirdCents: number;
  regularCents: number;
  /** Variable de entorno con el ID numérico de la lista de Brevo. */
  brevoListEnv: string;
  /** A partir de este instante el checkout deja de aceptar inscripciones. */
  ventasCierranUtc?: string;
};

export const RETIRO_CONSIGUE: RetiroConfig = {
  productId: PRODUCT_ID,
  nombre: "La Mujer Que Lo Consigue",
  path: "/",
  fechasTexto: "2-4 de octubre de 2026",
  stripeDescripcion: "Retiro virtual de 3 días, 2-4 de octubre de 2026.",
  earlyBirdDeadlineUtc: EARLY_BIRD_DEADLINE_UTC,
  earlyBirdCents: EARLY_BIRD_PRICE_CENTS,
  regularCents: REGULAR_PRICE_CENTS,
  brevoListEnv: "BREVO_LIST_ID_MARKETING",
};

/**
 * "La Mujer Que Se Elige" — 29, 30 y 31 de enero de 2027.
 *
 * El early bird dura hasta el 7 de enero incluido (hora de España). En
 * enero España está en horario de invierno (CET, UTC+1), así que el 8 de
 * enero a las 00:00 CET equivale a 2027-01-07T23:00:00Z.
 */
export const RETIRO_ELIGE: RetiroConfig = {
  productId: "retiro_2027_01_elige",
  nombre: "La Mujer Que Se Elige",
  path: "/la-mujer-que-se-elige",
  fechasTexto: "29-31 de enero de 2027",
  stripeDescripcion: "Retiro virtual de 3 días, 29-31 de enero de 2027.",
  earlyBirdDeadlineUtc: "2027-01-07T23:00:00Z",
  earlyBirdCents: 4700,
  regularCents: 5700,
  brevoListEnv: "BREVO_LIST_ID_ELIGE",
  // Venta hasta el 28 de enero incluido (29 ene 00:00 CET).
  ventasCierranUtc: "2027-01-28T23:00:00Z",
};

export function ventasCerradas(retiro: RetiroConfig, now: Date = new Date()): boolean {
  return Boolean(
    retiro.ventasCierranUtc &&
      now.getTime() >= new Date(retiro.ventasCierranUtc).getTime()
  );
}

export const RETIROS: RetiroConfig[] = [RETIRO_CONSIGUE, RETIRO_ELIGE];

export function getRetiroByProductId(
  productId: string | undefined | null
): RetiroConfig | undefined {
  return RETIROS.find((r) => r.productId === productId);
}

export function getTierFor(
  retiro: Pick<RetiroConfig, "earlyBirdDeadlineUtc">,
  now: Date = new Date()
): PriceTier {
  return now.getTime() < new Date(retiro.earlyBirdDeadlineUtc).getTime()
    ? "early_bird"
    : "regular";
}

export function getPriceCentsFor(
  retiro: Pick<RetiroConfig, "earlyBirdDeadlineUtc" | "earlyBirdCents" | "regularCents">,
  now: Date = new Date()
): number {
  return getTierFor(retiro, now) === "early_bird"
    ? retiro.earlyBirdCents
    : retiro.regularCents;
}
