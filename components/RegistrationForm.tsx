"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { DESEO_OPCIONES, type RegistrationPayload } from "@/lib/types";

type FormState = {
  nombre: string;
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
  email: "",
  countryCode: "",
  whatsapp: "",
  deseoOpcion: "",
  deseoOtro: "",
  expectativa: "",
  marketingConsent: false,
};

const COUNTRY_CODES = [
  { code: "+34", country: "España" },
  { code: "+52", country: "México" },
  { code: "+54", country: "Argentina" },
  { code: "+57", country: "Colombia" },
  { code: "+56", country: "Chile" },
  { code: "+51", country: "Perú" },
  { code: "+58", country: "Venezuela" },
  { code: "+593", country: "Ecuador" },
  { code: "+502", country: "Guatemala" },
  { code: "+53", country: "Cuba" },
  { code: "+591", country: "Bolivia" },
  { code: "+1", country: "Estados Unidos" },
  { code: "+1", country: "Puerto Rico" },
  { code: "+1", country: "República Dominicana" },
  { code: "+504", country: "Honduras" },
  { code: "+595", country: "Paraguay" },
  { code: "+503", country: "El Salvador" },
  { code: "+505", country: "Nicaragua" },
  { code: "+506", country: "Costa Rica" },
  { code: "+507", country: "Panamá" },
  { code: "+598", country: "Uruguay" },
  { code: "+44", country: "Reino Unido" },
  { code: "+49", country: "Alemania" },
  { code: "+33", country: "Francia" },
  { code: "+39", country: "Italia" },
  { code: "+351", country: "Portugal" },
  { code: "+31", country: "Países Bajos" },
  { code: "+32", country: "Bélgica" },
  { code: "+43", country: "Austria" },
  { code: "+30", country: "Grecia" },
  { code: "+353", country: "Irlanda" },
  { code: "+45", country: "Dinamarca" },
  { code: "+46", country: "Suecia" },
  { code: "+358", country: "Finlandia" },
  { code: "+48", country: "Polonia" },
  { code: "+420", country: "República Checa" },
  { code: "+421", country: "Eslovaquia" },
  { code: "+36", country: "Hungría" },
  { code: "+40", country: "Rumanía" },
  { code: "+359", country: "Bulgaria" },
  { code: "+385", country: "Croacia" },
  { code: "+386", country: "Eslovenia" },
  { code: "+372", country: "Estonia" },
  { code: "+371", country: "Letonia" },
  { code: "+370", country: "Lituania" },
  { code: "+352", country: "Luxemburgo" },
  { code: "+356", country: "Malta" },
  { code: "+357", country: "Chipre" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s()-]{6,15}$/;

// Distingue los errores conocidos del backend (mensaje seguro para
// mostrar tal cual) de fallos de red inesperados.
class CheckoutError extends Error {}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.nombre.trim()) errors.nombre = "Escribe tu nombre y apellido.";

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

export default function RegistrationForm() {
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
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
      nombre: values.nombre,
      email: values.email,
      whatsapp: `${values.countryCode}${values.whatsapp.replace(/[^\d]/g, "")}`,
      deseo,
      expectativa: values.expectativa,
      marketingConsent: values.marketingConsent,
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
      <div>
        <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-espresso">
          Nombre y apellido *
        </label>
        <input
          id="nombre"
          type="text"
          required
          className="input-field"
          value={values.nombre}
          onChange={(e) => handleChange("nombre", e.target.value)}
        />
        {errors.nombre && <p className="mt-1 text-xs text-terracotta-700">{errors.nombre}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-espresso">
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          className="input-field"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <p className="mt-1 text-xs text-terracotta-700">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="whatsapp" className="mb-1 block text-sm font-medium text-espresso">
          WhatsApp *
        </label>
        <div className="flex gap-2">
          <select
            id="countryCode"
            aria-label="País *"
            required
            className="input-field w-[40%] shrink-0"
            value={values.countryCode}
            onChange={(e) => handleChange("countryCode", e.target.value)}
          >
            <option value="" disabled>
              Selecciona tu país
            </option>
            {COUNTRY_CODES.map(({ code, country }) => (
              <option key={country} value={code}>
                {country} ({code})
              </option>
            ))}
          </select>
          <input
            id="whatsapp"
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
        <label htmlFor="deseoOpcion" className="mb-1 block text-sm font-medium text-espresso">
          ¿Qué deseo sientes que no estás logrando conseguir? *
        </label>
        <select
          id="deseoOpcion"
          required
          className="input-field"
          value={values.deseoOpcion}
          onChange={(e) => handleChange("deseoOpcion", e.target.value)}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          {DESEO_OPCIONES.map((opcion) => (
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
              id="deseoOtro"
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
        <label htmlFor="expectativa" className="mb-1 block text-sm font-medium text-espresso">
          ¿Qué te gustaría recibir de este retiro? *
        </label>
        <textarea
          id="expectativa"
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
        Al reservar tu plaza, tus datos se tratarán conforme a nuestra{" "}
        <Link href="/privacidad" className="underline hover:text-terracotta-600">
          Política de privacidad
        </Link>{" "}
        con la única finalidad de gestionar tu inscripción en el retiro.
      </p>

      <div className="flex items-start gap-2">
        <input
          id="marketingConsent"
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-espresso/30 text-terracotta focus:ring-terracotta/40"
          checked={values.marketingConsent}
          onChange={(e) => handleChange("marketingConsent", e.target.checked)}
        />
        <label htmlFor="marketingConsent" className="text-xs text-espresso/70">
          Quiero recibir emails sobre futuros contenidos, ofertas y
          programas.
        </label>
      </div>

      {submitError && <p className="text-sm text-terracotta-700">{submitError}</p>}

      <button type="submit" disabled={submitting} className="btn-primary mt-2 disabled:opacity-60">
        {submitting ? "Procesando..." : "Reservar mi plaza y pagar"}
      </button>

      <p className="text-center text-xs text-espresso/50">
        Al enviar serás redirigida a un pago seguro con Stripe. Una vez te
        unas al retiro, recibirás las comunicaciones y contenidos por email
        y WhatsApp.
      </p>
    </form>
  );
}
