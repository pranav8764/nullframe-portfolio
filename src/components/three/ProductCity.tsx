"use client";

import { projects } from "@/data/profile";
import { CityBuilding } from "@/components/three/CityBuilding";

type ProductCityProps = {
  progress: number;
};

const buildingLayout = [
  { position: [-3.1, 0, -0.8] as [number, number, number], height: 1.7 },
  { position: [-1.8, 0, 1.2] as [number, number, number], height: 2.15 },
  { position: [-0.5, 0, -1.35] as [number, number, number], height: 1.55 },
  { position: [1.05, 0, 1.25] as [number, number, number], height: 1.95 },
  { position: [2.15, 0, -0.9] as [number, number, number], height: 1.45 },
  { position: [3.35, 0, 0.86] as [number, number, number], height: 1.85 }
];

export function ProductCity({ progress }: ProductCityProps) {
  const reveal = Math.min(1, Math.max(0, (progress - 0.1) / 0.16));

  return (
    <group visible={reveal > 0.02}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} scale={[9, 9, 1]}>
        <planeGeometry args={[1, 1, 28, 28]} />
        <meshStandardMaterial
          color="#080808"
          emissive="#f59e0b"
          emissiveIntensity={0.05 * reveal}
          metalness={0.4}
          roughness={0.48}
        />
      </mesh>
      {projects.slice(0, 6).map((project, index) => (
        <CityBuilding
          height={buildingLayout[index].height}
          key={project.id}
          label={project.buildingName}
          position={buildingLayout[index].position}
          progress={progress}
          status={project.metrics[0] ?? project.status}
        />
      ))}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 4.2, 72]} />
        <meshBasicMaterial color="#f59e0b" opacity={0.14 * reveal} transparent />
      </mesh>
    </group>
  );
}
