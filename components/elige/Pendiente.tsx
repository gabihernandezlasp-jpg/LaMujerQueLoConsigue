/**
 * Marca un dato que Paty tiene que confirmar antes de publicar ([corchetes]
 * en el documento de la landing). Solo se ve en desarrollo: en producción
 * no se renderiza nada, para no publicar nada inventado ni a medias.
 */
export default function Pendiente({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="rounded-2xl border-2 border-dashed border-terracotta/60 bg-terracotta-50 p-4 text-sm text-terracotta-700">
      <span className="mr-2 rounded bg-terracotta px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
        Pendiente
      </span>
      {children}
    </div>
  );
}
