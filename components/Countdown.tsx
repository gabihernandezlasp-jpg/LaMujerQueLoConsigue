"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(deadline: string): TimeLeft | null {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const DEFAULT_BOX = "bg-espresso text-cream";

function Unit({ value, label, box = DEFAULT_BOX }: { value: number; label: string; box?: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-base font-bold sm:h-14 sm:w-14 sm:text-xl ${box}`}>
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1 text-[9px] uppercase tracking-wide text-espresso/70 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({
  deadline,
  expiredMessage = "El precio early bird ha finalizado.",
  boxClassName,
}: {
  deadline: string;
  expiredMessage?: string;
  /** Clases de color de cada casilla (por defecto, fondo espresso). */
  boxClassName?: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(deadline));
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(deadline));
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (!mounted) {
    return <div className="h-11 sm:h-14" aria-hidden />;
  }

  if (!timeLeft) {
    return (
      <p className="text-sm font-medium text-espresso/70">{expiredMessage}</p>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2" role="timer">
      <Unit value={timeLeft.days} label="días" box={boxClassName} />
      <span className="pb-4 text-base font-bold text-espresso/40">:</span>
      <Unit value={timeLeft.hours} label="horas" box={boxClassName} />
      <span className="pb-4 text-base font-bold text-espresso/40">:</span>
      <Unit value={timeLeft.minutes} label="min" box={boxClassName} />
      <span className="pb-4 text-base font-bold text-espresso/40">:</span>
      <Unit value={timeLeft.seconds} label="seg" box={boxClassName} />
    </div>
  );
}
