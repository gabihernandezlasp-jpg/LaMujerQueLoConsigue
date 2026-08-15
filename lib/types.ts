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
};
