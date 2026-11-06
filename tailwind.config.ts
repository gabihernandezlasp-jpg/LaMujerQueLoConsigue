import type { Config } from "tailwindcss";

// Los colores de marca se leen de variables CSS (canales RGB) definidas en
// app/globals.css. Así cada landing puede tener su propia paleta (por
// ejemplo `.theme-invierno`) reutilizando las mismas clases y componentes.
const c = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        cream: {
          DEFAULT: c("cream-100"),
          50: c("cream-50"),
          100: c("cream-100"),
          200: c("cream-200"),
        },
        sand: {
          DEFAULT: c("sand-300"),
          100: c("sand-100"),
          300: c("sand-300"),
          500: c("sand-500"),
        },
        espresso: {
          DEFAULT: c("espresso-600"),
          400: c("espresso-400"),
          600: c("espresso-600"),
          800: c("espresso-800"),
        },
        terracotta: {
          DEFAULT: c("terracotta-500"),
          50: c("terracotta-50"),
          100: c("terracotta-100"),
          400: c("terracotta-400"),
          500: c("terracotta-500"),
          600: c("terracotta-600"),
          700: c("terracotta-700"),
        },
        gold: {
          DEFAULT: c("gold-500"),
          300: c("gold-300"),
          500: c("gold-500"),
          700: c("gold-700"),
        },
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgb(var(--c-espresso-600) / 0.25)",
      },
      backgroundImage: {
        "warm-gradient":
          "linear-gradient(135deg, rgb(var(--c-cream-100)) 0%, rgb(var(--c-sand-100)) 45%, rgb(var(--c-sand-300)) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
