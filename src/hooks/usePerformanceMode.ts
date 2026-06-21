"use client";

import { useEffect, useState } from "react";

export type PerformanceMode = {
  dpr: [number, number];
  particleCount: number;
  shadows: boolean;
};

export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>({
    dpr: [1, 1.8],
    particleCount: 2800,
    shadows: true
  });

  useEffect(() => {
    const memory = "deviceMemory" in navigator ? Number(navigator.deviceMemory) : 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const low = mobile || memory <= 4 || cores <= 4;

    setMode({
      dpr: low ? [1, 1.35] : [1, 2],
      particleCount: low ? 800 : 3600,
      shadows: !low
    });
  }, []);

  return mode;
}
