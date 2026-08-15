"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { DESEO_OPCIONES, type RegistrationPayload } from "@/lib/types";

type FormState = {
  nombre: string;
  email: string;
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
  whatsapp: "",
  deseoOpcion: "",
  deseoOtro: "",
  expectativa: "",
  marketingConsent: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.nombre.trim()) errors.nombre = "Escribe tu nombre y apellido.";

  if (!values.email.trim()) {
    errors.email = "Escribe tu email.";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Ese email no parece válido.";
  }

  if (!values.whatsapp.trim()) {
    errors.whatsapp = "Escribe tu número de WhatsApp.";
  } else if (!PHONE_REGEX.test(values.whatsapp.trim())) {
    errors.whatsapp = "Usa un formato de teléfono válido, ej. +34 600 000 000.";
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
      whatsapp: values.whatsapp,
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
        throw new Error("No se pudo crear la sesión de pago.");
      }

      const data = (await checkoutRes.json()) as { url?: string };
      if (!data.url) {
        throw new Error("Respuesta de pago inválida.");
      }

      window.location.href = data.url;
    } catch (err) {
      setSubmitError(
        "Algo ha fallado al procesar tu inscripción. Inténtalo de nuevo en unos segundos."
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
        <input
          id="whatsapp"
          type="tel"
          placeholder="+34 600 000 000"
          className="input-field"
          value={values.whatsapp}
          onChange={(e) => handleChange("whatsapp", e.target.value)}
        />
        {errors.whatsapp && <p className="mt-1 text-xs text-terracotta-700">{errors.whatsapp}</p>}
      </div>

      <div>
        <label htmlFor="deseoOpcion" className="mb-1 block text-sm font-medium text-espresso">
          ¿Qué deseo sientes que no estás logrando conseguir? *
        </label>
        <select
          id="deseoOpcion"
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
