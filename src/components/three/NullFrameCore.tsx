"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, MeshStandardMaterial } from "three";

type NullFrameCoreProps = {
  progress: number;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeOut(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function NullFrameCore({ progress }: NullFrameCoreProps) {
  const coreRef = useRef<Mesh>(null);
  const reactorRef = useRef<Mesh>(null);
  const chamberReveal = easeOut(clamp01((progress - 0.28) / 0.07));
  const reveal = easeOut(clamp01((progress - 0.33) / 0.08));
  const unfold = easeOut(clamp01((progress - 0.37) / 0.11));

  useFrame(({ clock }) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = clock.elapsedTime * 0.08;
      const material = coreRef.current.material as MeshStandardMaterial;
      material.opacity = 0.12 + reveal * 0.58;
    }
    if (reactorRef.current) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 2.2) * 0.08;
      reactorRef.current.scale.setScalar(pulse * (0.2 + reveal * 0.8));
    }
  });

  return (
    <group position={[1.35, 0, 0]} visible={chamberReveal > 0.02}>
      <mesh receiveShadow position={[0, 0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.46, 0.76, 6]} />
        <meshBasicMaterial color="#f59e0b" opacity={0.18 + chamberReveal * 0.32} transparent />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.86, 0.96, 0.22, 6]} />
        <meshStandardMaterial
          color="#17120c"
          emissive="#f59e0b"
          emissiveIntensity={0.06 * chamberReveal}
          metalness={0.45}
          opacity={0.32 + chamberReveal * 0.38}
          roughness={0.34}
          transparent
        />
      </mesh>
      {[0, 1, 2, 3].map((index) => {
        const angle = index * Math.PI * 0.5 + Math.PI * 0.25;
        const distance = 0.52 + unfold * 0.34;
        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * distance,
              0.58 + unfold * 0.24,
              Math.sin(angle) * distance
            ]}
            rotation={[0, -angle, 0]}
            scale={[0.2 + unfold * 0.8, 1, 1]}
          >
            <boxGeometry args={[0.52, 0.045, 0.28]} />
            <meshStandardMaterial
              color="#f6ead0"
              emissive="#f59e0b"
              emissiveIntensity={0.06 * unfold}
              opacity={0.18 + unfold * 0.72}
              roughness={0.32}
              transparent
            />
          </mesh>
        );
      })}
      <mesh castShadow position={[0, 0.18 + 1.48 * reveal, 0]} ref={coreRef} scale={[0.34 + reveal * 0.66, 0.34 + reveal * 0.66, 0.34 + reveal * 0.66]}>
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
      <mesh position={[0, 0.42 + 1.48 * reveal, 0]} ref={reactorRef}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.85 * reveal} />
      </mesh>
    </group>
  );
}
