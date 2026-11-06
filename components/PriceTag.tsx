"use client";

import { useEffect, useState } from "react";
import { formatPriceEuros, type PriceTier } from "@/lib/pricing";
import { RETIRO_CONSIGUE, getTierFor, type RetiroConfig } from "@/lib/events";

type PriceConfig = Pick<
  RetiroConfig,
  "earlyBirdDeadlineUtc" | "earlyBirdCents" | "regularCents"
>;

// Por defecto, precios del retiro de octubre 2026 (la página principal).
export function usePriceTier(retiro: PriceConfig = RETIRO_CONSIGUE): PriceTier | null {
  const [tier, setTier] = useState<PriceTier | null>(null);
  const deadline = retiro.earlyBirdDeadlineUtc;

  useEffect(() => {
    setTier(getTierFor({ earlyBirdDeadlineUtc: deadline }));
  }, [deadline]);

  return tier;
}

export function CurrentPrice({ retiro = RETIRO_CONSIGUE }: { retiro?: PriceConfig }) {
  const tier = usePriceTier(retiro);
  if (!tier) return null;
  return (
    <>
      {formatPriceEuros(
        tier === "early_bird" ? retiro.earlyBirdCents : retiro.regularCents
      )}
    </>
  );
}

export function EarlyBirdOnly({
  children,
  retiro = RETIRO_CONSIGUE,
}: {
  children: React.ReactNode;
  retiro?: PriceConfig;
}) {
  const tier = usePriceTier(retiro);
  if (tier !== "early_bird") return null;
  return <>{children}</>;
}
