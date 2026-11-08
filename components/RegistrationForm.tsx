"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { DESEO_OPCIONES, type RegistrationPayload } from "@/lib/types";

type FormState = {
  nombre: string;
  apellido: string;
  email: string;
  countryCode: string;
  whatsapp: string;
  deseoOpcion: string;
  deseoOtro: string;
  expectativa: string;
  marketingConsent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_STATE: FormState = {
  nombre: "",
  apellido: "",
  email: "",
  countryCode: "",
  whatsapp: "",
  deseoOpcion: "",
  deseoOtro: "",
  expectativa: "",
  marketingConsent: false,
};

const COUNTRY_CODES = [
  { code: "+34", country: "España", iso: "ES" },
  { code: "+52", country: "México", iso: "MX" },
  { code: "+54", country: "Argentina", iso: "AR" },
  { code: "+57", country: "Colombia", iso: "CO" },
  { code: "+56", country: "Chile", iso: "CL" },
  { code: "+51", country: "Perú", iso: "PE" },
  { code: "+58", country: "Venezuela", iso: "VE" },
  { code: "+593", country: "Ecuador", iso: "EC" },
  { code: "+502", country: "Guatemala", iso: "GT" },
  { code: "+53", country: "Cuba", iso: "CU" },
  { code: "+591", country: "Bolivia", iso: "BO" },
  { code: "+1", country: "Estados Unidos", iso: "US" },
  { code: "+1", country: "Puerto Rico", iso: "PR" },
  { code: "+1", country: "República Dominicana", iso: "DO" },
  { code: "+504", country: "Honduras", iso: "HN" },
  { code: "+595", country: "Paraguay", iso: "PY" },
  { code: "+503", country: "El Salvador", iso: "SV" },
  { code: "+505", country: "Nicaragua", iso: "NI" },
  { code: "+506", country: "Costa Rica", iso: "CR" },
  { code: "+507", country: "Panamá", iso: "PA" },
  { code: "+598", country: "Uruguay", iso: "UY" },
  { code: "+44", country: "Reino Unido", iso: "GB" },
  { code: "+49", country: "Alemania", iso: "DE" },
  { code: "+33", country: "Francia", iso: "FR" },
  { code: "+39", country: "Italia", iso: "IT" },
  { code: "+351", country: "Portugal", iso: "PT" },
  { code: "+31", country: "Países Bajos", iso: "NL" },
  { code: "+32", country: "Bélgica", iso: "BE" },
  { code: "+43", country: "Austria", iso: "AT" },
  { code: "+30", country: "Grecia", iso: "GR" },
  { code: "+353", country: "Irlanda", iso: "IE" },
  { code: "+45", country: "Dinamarca", iso: "DK" },
  { code: "+46", country: "Suecia", iso: "SE" },
  { code: "+358", country: "Finlandia", iso: "FI" },
  { code: "+48", country: "Polonia", iso: "PL" },
  { code: "+420", country: "República Checa", iso: "CZ" },
  { code: "+421", country: "Eslovaquia", iso: "SK" },
  { code: "+36", country: "Hungría", iso: "HU" },
  { code: "+40", country: "Rumanía", iso: "RO" },
  { code: "+359", country: "Bulgaria", iso: "BG" },
  { code: "+385", country: "Croacia", iso: "HR" },
  { code: "+386", country: "Eslovenia", iso: "SI" },
  { code: "+372", country: "Estonia", iso: "EE" },
  { code: "+371", country: "Letonia", iso: "LV" },
  { code: "+370", country: "Lituania", iso: "LT" },
  { code: "+352", country: "Luxemburgo", iso: "LU" },
  { code: "+356", country: "Malta", iso: "MT" },
  { code: "+357", country: "Chipre", iso: "CY" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s()-]{6,15}$/;

// Distingue los errores conocidos del backend (mensaje seguro para
// mostrar tal cual) de fallos de red inesperados.
class CheckoutError extends Error {}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.nombre.trim()) errors.nombre = "Escribe tu nombre.";
  if (!values.apellido.trim()) errors.apellido = "Escribe tu apellido.";

  if (!values.email.trim()) {
    errors.email = "Escribe tu email.";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Ese email no parece válido.";
  }

  if (!values.countryCode) {
    errors.countryCode = "Selecciona tu país.";
  }

  if (!values.whatsapp.trim()) {
    errors.whatsapp = "Escribe tu número de WhatsApp.";
  } else if (!PHONE_REGEX.test(values.whatsapp.trim())) {
    errors.whatsapp = "Usa un formato de teléfono válido, ej. 600 000 000.";
  }

  if (!values.deseoOpcion) {
    errors.deseoOpcion = "Selecciona una opción.";
  } else if (values.deseoOpcion === "Otro" && !values.deseoOtro.trim()) {
    errors.deseoOtro = "Cuéntanos cuál es tu deseo.";
  }

  if (!values.expectativa.trim())
    errors.expectativa = "Cuéntanos qué te gustaría recibir en el retiro.";

  return errors;
}

type RegistrationFormProps = {
  /** productId del retiro (lib/events.ts). Sin él, se usa el de octubre 2026. */
  retiro?: string;
  deseoLabel?: string;
  deseoOpciones?: readonly string[];
  expectativaLabel?: string;
  /** Prefijo para los id de los campos, necesario si hay dos formularios en la página. */
  idPrefix?: string;
  submitLabel?: string;
  /** Muestra los textos legales en versión corta. */
  compact?: boolean;
  /** País preseleccionado para WhatsApp, en código ISO (p. ej. "ES"). Vacío = obliga a elegir país. */
  defaultCountry?: string;
};

export default function RegistrationForm({
  retiro,
  deseoLabel = "¿Qué deseo sientes que no estás logrando conseguir?",
  deseoOpciones = DESEO_OPCIONES,
  expectativaLabel = "¿Qué te gustaría recibir de este retiro?",
  idPrefix = "",
  submitLabel = "Reservar mi plaza y pagar",
  compact = false,
  defaultCountry = "",
}: RegistrationFormProps = {}) {
  const [values, setValues] = useState<FormState>({
    ...INITIAL_STATE,
    countryCode: defaultCountry,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange(
    field: keyof FormState,
    value: string | boolean
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const deseo =
      values.deseoOpcion === "Otro" ? values.deseoOtro.trim() : values.deseoOpcion;

    const payload: RegistrationPayload = {
      // El backend (Stripe, Brevo NOMBRE) sigue recibiendo el nombre completo en un solo campo.
      nombre: `${values.nombre.trim()} ${values.apellido.trim()}`,
      email: values.email,
      whatsapp: `${COUNTRY_CODES.find((c) => c.iso === values.countryCode)?.code ?? ""}${values.whatsapp.replace(/[^\d]/g, "")}`,
      deseo,
      expectativa: values.expectativa,
      marketingConsent: values.marketingConsent,
      ...(retiro ? { retiro } : {}),
    };

    setSubmitting(true);
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!checkoutRes.ok) {
        const data = (await checkoutRes.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new CheckoutError(data?.error ?? "No se pudo crear la sesión de pago.");
      }

      const data = (await checkoutRes.json()) as { url?: string };
      if (!data.url) {
        throw new Error("Respuesta de pago inválida.");
      }

      window.location.href = data.url;
    } catch (err) {
      setSubmitError(
        err instanceof CheckoutError
          ? err.message
          : "Algo ha fallado al procesar tu inscripción. Inténtalo de nuevo en unos segundos."
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-2 gap-3">
        <div className="min-w-0">
          <label htmlFor={`${idPrefix}nombre`} className="mb-1 block text-sm font-medium text-espresso">
            Nombre *
          </label>
          <input
            id={`${idPrefix}nombre`}
            type="text"
            required
            autoComplete="given-name"
            className="input-field"
            value={values.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />
          {errors.nombre && <p className="mt-1 text-xs text-terracotta-700">{errors.nombre}</p>}
        </div>
        <div className="min-w-0">
          <label htmlFor={`${idPrefix}apellido`} className="mb-1 block text-sm font-medium text-espresso">
            Apellido *
          </label>
          <input
            id={`${idPrefix}apellido`}
            type="text"
            required
            autoComplete="family-name"
            className="input-field"
            value={values.apellido}
            onChange={(e) => handleChange("apellido", e.target.value)}
          />
          {errors.apellido && <p className="mt-1 text-xs text-terracotta-700">{errors.apellido}</p>}
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}email`} className="mb-1 block text-sm font-medium text-espresso">
          Email *
        </label>
        <input
          id={`${idPrefix}email`}
          type="email"
          required
          className="input-field"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <p className="mt-1 text-xs text-terracotta-700">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor={`${idPrefix}whatsapp`} className="mb-1 block text-sm font-medium text-espresso">
          WhatsApp *
        </label>
        <div className="flex gap-2">
          <select
            id={`${idPrefix}countryCode`}
            aria-label="País *"
            required
            className={`input-field shrink-0 ${compact ? "w-[7.5rem]" : "w-[40%]"}`}
            value={values.countryCode}
            onChange={(e) => handleChange("countryCode", e.target.value)}
          >
            <option value="" disabled>
              {compact ? "País" : "Selecciona tu país"}
            </option>
            {COUNTRY_CODES.map(({ code, country, iso }) => (
              <option key={iso} value={iso} title={country}>
                {compact ? `${iso} ${code}` : `${country} (${code})`}
              </option>
            ))}
          </select>
          <input
            id={`${idPrefix}whatsapp`}
            type="tel"
            placeholder="600 000 000"
            required
            className="input-field"
            value={values.whatsapp}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
          />
        </div>
        {errors.countryCode && (
          <p className="mt-1 text-xs text-terracotta-700">{errors.countryCode}</p>
        )}
        {errors.whatsapp && <p className="mt-1 text-xs text-terracotta-700">{errors.whatsapp}</p>}
      </div>

      <div>
        <label htmlFor={`${idPrefix}deseoOpcion`} className="mb-1 block text-sm font-medium text-espresso">
          {deseoLabel} *
        </label>
        <select
          id={`${idPrefix}deseoOpcion`}
          required
          className="input-field"
          value={values.deseoOpcion}
          onChange={(e) => handleChange("deseoOpcion", e.target.value)}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          {deseoOpciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
        {errors.deseoOpcion && (
          <p className="mt-1 text-xs text-terracotta-700">{errors.deseoOpcion}</p>
        )}

        {values.deseoOpcion === "Otro" && (
          <div className="mt-2">
            <input
              id={`${idPrefix}deseoOtro`}
              type="text"
              placeholder="Cuéntanos cuál es tu deseo"
              className="input-field"
              value={values.deseoOtro}
              onChange={(e) => handleChange("deseoOtro", e.target.value)}
            />
            {errors.deseoOtro && (
              <p className="mt-1 text-xs text-terracotta-700">{errors.deseoOtro}</p>
            )}
          </div>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}expectativa`} className="mb-1 block text-sm font-medium text-espresso">
          {expectativaLabel} *
        </label>
        <textarea
          id={`${idPrefix}expectativa`}
          rows={4}
          required
          className="input-field"
          value={values.expectativa}
          onChange={(e) => handleChange("expectativa", e.target.value)}
        />
        {errors.expectativa && (
          <p className="mt-1 text-xs text-terracotta-700">{errors.expectativa}</p>
        )}
      </div>

      <p className="text-xs text-espresso/60">
        {compact ? "Tus datos se tratan según nuestra " : "Al reservar tu plaza, tus datos se tratarán conforme a nuestra "}
        <Link href="/privacidad" className="underline hover:text-terracotta-600">
          Política de privacidad
        </Link>
        {compact ? "." : " con la única finalidad de gestionar tu inscripción en el retiro."}
      </p>

      <div className="flex items-start gap-2">
        <input
          id={`${idPrefix}marketingConsent`}
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-espresso/30 text-terracotta focus:ring-terracotta/40"
          checked={values.marketingConsent}
          onChange={(e) => handleChange("marketingConsent", e.target.checked)}
        />
        <label htmlFor={`${idPrefix}marketingConsent`} className="text-xs text-espresso/70">
          Quiero recibir emails sobre futuros contenidos, ofertas y
          programas.
        </label>
      </div>

      {submitError && <p className="text-sm text-terracotta-700">{submitError}</p>}

      <button type="submit" disabled={submitting} className="btn-primary mt-2 disabled:opacity-60">
        {submitting ? "Procesando..." : submitLabel}
      </button>

      <p className="text-center text-xs text-espresso/50">
        {compact
          ? "🔒 Pago seguro con Stripe."
          : "Al enviar serás redirigida a un pago seguro con Stripe. Una vez te unas al retiro, recibirás las comunicaciones y contenidos por email y WhatsApp."}
      </p>
    </form>
  );
}
