import type { Config } from "tailwindcss";

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
          DEFAULT: "#FAF3EA",
          50: "#FFFDFB",
          100: "#FAF3EA",
          200: "#F3E7D6",
        },
        sand: {
          DEFAULT: "#E8D9C5",
          100: "#F1E6D8",
          300: "#E8D9C5",
          500: "#CBB699",
        },
        espresso: {
          DEFAULT: "#3A2E27",
          400: "#5C493C",
          600: "#3A2E27",
          800: "#251C17",
        },
        terracotta: {
          DEFAULT: "#BB5F3D",
          50: "#FBEEE8",
          100: "#F4D8CB",
          400: "#C97652",
          500: "#BB5F3D",
          600: "#9E4C2F",
          700: "#7E3C25",
        },
        gold: {
          DEFAULT: "#D9A566",
          300: "#E7C592",
          500: "#D9A566",
          700: "#B8834A",
        },
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(58, 46, 39, 0.25)",
      },
      backgroundImage: {
        "warm-gradient":
          "linear-gradient(135deg, #FAF3EA 0%, #F1E6D8 45%, #E8D9C5 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
