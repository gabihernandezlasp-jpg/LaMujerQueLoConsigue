/**
 * Precio del retiro "La Mujer Que Lo Consigue".
 *
 * El corte de early bird es el 16 de septiembre de 2026 a las 00:00 CET
 * (equivalente a 15 de septiembre 23:59:59 CET). España está en horario
 * de verano (CEST, UTC+2) durante septiembre, por lo que el instante
 * exacto en UTC es 2026-09-15T22:00:00Z. Se fija como timestamp UTC para
 * que el cálculo del precio en el servidor no dependa de la zona horaria
 * del proceso que ejecuta el código.
 */
export const EARLY_BIRD_DEADLINE_UTC = "2026-09-15T22:00:00Z";

export const EARLY_BIRD_PRICE_CENTS = 4700;
export const REGULAR_PRICE_CENTS = 5700;

export type PriceTier = "early_bird" | "regular";

export function getPriceTier(now: Date = new Date()): PriceTier {
  const deadline = new Date(EARLY_BIRD_DEADLINE_UTC);
  return now.getTime() < deadline.getTime() ? "early_bird" : "regular";
}

export function getPriceCents(now: Date = new Date()): number {
  return getPriceTier(now) === "early_bird"
    ? EARLY_BIRD_PRICE_CENTS
    : REGULAR_PRICE_CENTS;
}

export function getPriceLabel(tier: PriceTier): string {
  return tier === "early_bird" ? "Early Bird" : "Regular";
}
