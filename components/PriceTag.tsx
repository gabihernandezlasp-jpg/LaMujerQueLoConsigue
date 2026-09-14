"use client";

import { useEffect, useState } from "react";
import {
  EARLY_BIRD_PRICE_CENTS,
  REGULAR_PRICE_CENTS,
  formatPriceEuros,
  getPriceTier,
  type PriceTier,
} from "@/lib/pricing";

export function usePriceTier(): PriceTier | null {
  const [tier, setTier] = useState<PriceTier | null>(null);

  useEffect(() => {
    setTier(getPriceTier());
  }, []);

  return tier;
}

export function CurrentPrice() {
  const tier = usePriceTier();
  if (!tier) return null;
  return (
    <>
      {formatPriceEuros(
        tier === "early_bird" ? EARLY_BIRD_PRICE_CENTS : REGULAR_PRICE_CENTS
      )}
    </>
  );
}

export function EarlyBirdOnly({ children }: { children: React.ReactNode }) {
  const tier = usePriceTier();
  if (tier !== "early_bird") return null;
  return <>{children}</>;
}
