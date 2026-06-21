"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points, PointsMaterial } from "three";

type ParticleDissolveProps = {
  count: number;
  progress: number;
  reducedMotion: boolean;
};

export function ParticleDissolve({
  count,
  progress,
  reducedMotion
}: ParticleDissolveProps) {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<PointsMaterial>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const side = Math.random() > 0.5 ? 1 : -1;
      array[index * 3] = (Math.random() - 0.5) * 1.8 * side;
      array[index * 3 + 1] = (Math.random() - 0.5) * 4.8 + 1.4;
      array[index * 3 + 2] = (Math.random() - 0.5) * 1.2;
    }
    return array;
  }, [count]);

  useFrame(({ clock }) => {
    const dissolve = Math.min(1, Math.max(0, (progress - 0.06) / 0.22));
    const points = pointsRef.current;
    const material = materialRef.current;
    if (!points || !material) return;

    points.visible = dissolve > 0.02 && dissolve < 0.96;
    points.rotation.y = reducedMotion ? 0 : clock.elapsedTime * 0.08;
    points.scale.setScalar(1 + dissolve * 4.8);
    material.opacity = Math.sin(dissolve * Math.PI) * 0.74;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        color="#f59e0b"
        ref={materialRef}
        size={0.026}
        sizeAttenuation
        transparent
      />
    </points>
  );
}
