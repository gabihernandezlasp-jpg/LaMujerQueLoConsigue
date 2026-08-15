import fs from "node:fs";
import path from "node:path";

/**
 * Comprueba si una imagen ya existe en /public antes de renderizarla, para
 * que la landing no muestre un icono roto mientras las fotos definitivas
 * (hero-coach.jpg, cta-coach.jpg, etc.) todavía no se han colocado en
 * /public/images.
 */
export function publicImageExists(relativePath: string): boolean {
  const fullPath = path.join(process.cwd(), "public", relativePath);
  try {
    return fs.existsSync(fullPath);
  } catch {
    return false;
  }
}
