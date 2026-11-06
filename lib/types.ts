export const DESEO_OPCIONES = [
  "Autoestima y confianza de hierro",
  "Relación de amor sana",
  "Más abundancia económica",
  "Más ventas o clientes en mi negocio",
  "Más visibilidad en redes",
  "Otro",
] as const;

export type RegistrationPayload = {
  nombre: string;
  email: string;
  whatsapp: string;
  deseo: string;
  expectativa: string;
  marketingConsent: boolean;
  /** productId del retiro (ver lib/events.ts). Si falta, se usa el de octubre 2026. */
  retiro?: string;
};

export const DESEO_OPCIONES_ELIGE = [
  "Una relación de pareja sana",
  "Sanar el vínculo con mi familia",
  "Amistades que me nutran",
  "Quererme y elegirme a mí misma",
  "Otro",
] as const;
