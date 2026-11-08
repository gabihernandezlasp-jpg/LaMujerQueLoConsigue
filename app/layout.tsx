import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fuentes servidas desde el propio proyecto (@fontsource): next/font/google
// de Next 14 falla en el build de Vercel con las URLs actuales de Google Fonts.

const playfair = localFont({
  src: [
    { path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-600-italic.woff2", weight: "600", style: "italic" },
    { path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-700-italic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const inter = localFont({
  src: [
    { path: "../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "La Mujer Que Lo Consigue — Retiro Virtual | 2-4 Octubre 2026",
  description:
    "Retiro virtual de 3 días para mujeres que desean una relación de amor sana o más abundancia en su negocio. Viernes 2 a domingo 4 de octubre de 2026, 100% en vivo.",
  openGraph: {
    title: "La Mujer Que Lo Consigue — Retiro Virtual",
    description:
      "3 días en vivo para nombrar tu deseo, soltar lo que te frena y convertirte en la mujer que lo consigue.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
