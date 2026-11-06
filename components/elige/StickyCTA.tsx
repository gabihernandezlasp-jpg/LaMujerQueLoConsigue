"use client";

import { useEffect, useState } from "react";
import { CurrentPrice } from "../PriceTag";
import { RETIRO_ELIGE } from "@/lib/events";

/**
 * Botón "Quiero elegirme" fijo durante toda la navegación. Se oculta
 * mientras uno de los formularios está en pantalla y, al pulsarlo, lleva
 * al formulario más cercano (arriba o abajo).
 */
export default function StickyCTA() {
  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    // También se oculta mientras se ve otro botón de compra (p. ej. el de la cabecera en móvil).
    const forms = Array.from(document.querySelectorAll("[data-reserva], [data-oculta-sticky]"));
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setFormVisible(visible.size > 0);
      },
      { threshold: 0.15 }
    );
    forms.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, []);

  function goToNearestForm() {
    // Los formularios ocultos (p. ej. el de la cabecera en móvil) no cuentan.
    const forms = Array.from(document.querySelectorAll<HTMLElement>("[data-reserva]")).filter(
      (f) => f.offsetParent !== null
    );
    const mid = window.innerHeight / 2;
    const nearest = forms.reduce<HTMLElement | null>((best, f) => {
      const d = Math.abs(f.getBoundingClientRect().top - mid);
      return !best || d < Math.abs(best.getBoundingClientRect().top - mid) ? f : best;
    }, null);
    nearest?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-all duration-300 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:px-0 sm:pb-0 ${
        formVisible ? "pointer-events-none translate-y-6 opacity-0" : "opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={goToNearestForm}
        className="btn-primary w-full shadow-[0_12px_30px_-8px_rgb(var(--c-terracotta-700)/0.6)] sm:w-auto"
      >
        Quiero elegirme&nbsp;·&nbsp;<CurrentPrice retiro={RETIRO_ELIGE} />
      </button>
    </div>
  );
}
