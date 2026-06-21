"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import { HolographicPanel } from "@/components/three/HolographicPanel";

type CityBuildingProps = {
  label: string;
  status: string;
  position: [number, number, number];
  height: number;
  width?: number;
  progress: number;
};

export function CityBuilding({
  label,
  status,
  position,
  height,
  width = 0.72,
  progress
}: CityBuildingProps) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const reveal = Math.min(1, Math.max(0, (progress - 0.11) / 0.13));
  const close = progress > 0.24;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + reveal * height * 0.5;
    }
    if (meshRef.current) {
      const material = meshRef.current.material as MeshStandardMaterial;
      material.opacity = 0.18 + reveal * 0.7;
      material.emissiveIntensity = 0.13 + Math.sin(clock.elapsedTime * 2 + height) * 0.04;
    }
  });

  return (
    <group position={[position[0], position[1], position[2]]} ref={groupRef} scale={[1, reveal, 1]}>
      <mesh castShadow receiveShadow ref={meshRef}>
        <boxGeometry args={[width, height, width]} />
        <meshStandardMaterial
          color="#101010"
          emissive="#f59e0b"
          emissiveIntensity={0.13}
          metalness={0.6}
          opacity={0.5}
          roughness={0.2}
          transparent
        />
      </mesh>
      <mesh position={[0, height * 0.51, 0]}>
        <boxGeometry args={[width * 1.18, 0.04, width * 1.18]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.7} />
      </mesh>
      {reveal > 0.82 ? (
        <Html center distanceFactor={8} position={[0, height + 0.28, 0]} transform>
          <div className="w-36 rounded-md border border-null-border bg-black/72 px-3 py-2 text-center font-mono text-[0.56rem] uppercase tracking-[0.12em] text-null-muted backdrop-blur">
            <span className="block text-null-text">{label}</span>
            {close ? <span className="mt-1 block text-null-amber">{status}</span> : null}
          </div>
        </Html>
      ) : null}
      <HolographicPanel label={status} position={[0, height * 0.65, width * 0.72]} visible={close} />
    </group>
  );
}
