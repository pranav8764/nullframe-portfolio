"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, MeshStandardMaterial } from "three";

type MonolithProps = {
  progress: number;
  reducedMotion: boolean;
};

export function Monolith({ progress, reducedMotion }: MonolithProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const dissolve = Math.min(1, Math.max(0, (progress - 0.05) / 0.18));
    const material = mesh.material as MeshStandardMaterial;
    material.opacity = Math.max(0, 1 - dissolve * 1.2);
    mesh.visible = material.opacity > 0.04;
    mesh.rotation.y = reducedMotion ? -0.28 : -0.28 + Math.sin(clock.elapsedTime * 0.22) * 0.08;
    mesh.position.y = 1.35 + (reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.55) * 0.08);
  });

  return (
    <mesh castShadow position={[0, 1.35, 0]} ref={meshRef} rotation={[0.08, -0.28, 0]}>
      <boxGeometry args={[1.62, 4.8, 1.02]} />
      <meshStandardMaterial
        color="#020202"
        metalness={0.86}
        roughness={0.28}
        transparent
      />
    </mesh>
  );
}
