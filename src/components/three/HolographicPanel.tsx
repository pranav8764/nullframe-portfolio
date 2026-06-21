"use client";

import { Html } from "@react-three/drei";

type HolographicPanelProps = {
  label: string;
  position: [number, number, number];
  visible: boolean;
};

export function HolographicPanel({ label, position, visible }: HolographicPanelProps) {
  if (!visible) return null;

  return (
    <Html center distanceFactor={9} position={position} transform>
      <div className="w-32 rounded-md border border-null-amber/45 bg-black/70 px-3 py-2 text-center font-mono text-[0.55rem] uppercase tracking-[0.12em] text-null-amber shadow-[0_0_18px_rgba(245,158,11,0.24)] backdrop-blur">
        {label}
      </div>
    </Html>
  );
}
