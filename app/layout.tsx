import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
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
