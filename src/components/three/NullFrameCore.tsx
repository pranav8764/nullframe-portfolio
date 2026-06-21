"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, MeshStandardMaterial } from "three";

type NullFrameCoreProps = {
  progress: number;
};

export function NullFrameCore({ progress }: NullFrameCoreProps) {
  const coreRef = useRef<Mesh>(null);
  const reactorRef = useRef<Mesh>(null);
  const reveal = Math.min(1, Math.max(0, (progress - 0.2) / 0.2));

  useFrame(({ clock }) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = clock.elapsedTime * 0.08;
      const material = coreRef.current.material as MeshStandardMaterial;
      material.opacity = 0.18 + reveal * 0.5;
    }
    if (reactorRef.current) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 2.2) * 0.08;
      reactorRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[0, 0, 0]} visible={reveal > 0.02}>
      <mesh castShadow position={[0, 1.55 * reveal, 0]} ref={coreRef}>
        <cylinderGeometry args={[0.52, 0.8, 3.1, 6]} />
        <meshStandardMaterial
          color="#0b0b0b"
          emissive="#f59e0b"
          emissiveIntensity={0.1}
          metalness={0.74}
          opacity={0.5}
          roughness={0.2}
          transparent
        />
      </mesh>
      <mesh position={[0, 1.52, 0]} ref={reactorRef}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.85 * reveal} />
      </mesh>
      {reveal > 0.88 ? (
        <Html center distanceFactor={8} position={[0, 3.42, 0]} transform>
          <div className="w-52 rounded-md border border-null-amber/50 bg-black/75 px-4 py-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.13em] text-null-muted backdrop-blur">
            <span className="block text-null-text">NullFrame Core</span>
            <span className="mt-1 block text-null-amber">architecture: holding</span>
          </div>
        </Html>
      ) : null}
    </group>
  );
}
