"use client";

import type { RefObject } from "react";
import { projects, type Project } from "@/data/profile";
import { projectCityConfig } from "@/data/projectCityConfig";
import { CityBuilding } from "@/components/three/CityBuilding";

type ProductCityProps = {
  htmlPortal?: RefObject<HTMLElement | null>;
  minimal?: boolean;
  progress: number;
  onOpenProject?: (project: Project) => void;
};

const projectsById = new Map(projects.map((project) => [project.id, project]));
const cityProjectEntries = projectCityConfig.flatMap((config) => {
  const project = projectsById.get(config.projectId);
  return project ? [{ config, project }] : [];
});

const trees = [
  [-3.85, -1.58, 0.8],
  [-3.55, 0.12, 0.7],
  [-2.7, -1.62, 0.62],
  [-2.42, 1.7, 0.72],
  [-1.2, -0.55, 0.7],
  [-0.8, 1.78, 0.62],
  [0.62, -1.86, 0.74],
  [1.82, 1.78, 0.72],
  [2.22, 0.1, 0.62],
  [3.02, -1.82, 0.68],
  [4.12, 1.4, 0.76]
] as const;

const vehicles = [
  { color: "#e34b3f", position: [-3.18, 0.1, -0.02] as [number, number, number], rotation: 0 },
  { color: "#45b8d8", position: [-0.76, 0.1, 0.16] as [number, number, number], rotation: 0 },
  { color: "#f5c86a", position: [2.86, 0.1, -1.34] as [number, number, number], rotation: 0.36 },
  { color: "#f5ead2", position: [0.36, 0.1, 1.24] as [number, number, number], rotation: Math.PI / 2 }
] as const;

const lamps = [
  [-3.64, 0.46],
  [-2.12, -0.42],
  [-0.62, 0.52],
  [0.92, -0.48],
  [2.2, 0.42],
  [3.42, -0.28]
] as const;

const lawns = [
  { position: [-2.8, 0.064, -1.55] as [number, number, number], scale: [1.35, 1, 0.58] as [number, number, number] },
  { position: [-1.42, 0.063, 1.68] as [number, number, number], scale: [1.18, 1, 0.52] as [number, number, number] },
  { position: [1.25, 0.063, 1.56] as [number, number, number], scale: [1.5, 1, 0.66] as [number, number, number] },
  { position: [2.72, 0.063, -1.74] as [number, number, number], scale: [1.2, 1, 0.5] as [number, number, number] }
] as const;

const skylineBlocks = [
  { color: "#101827", position: [-4.5, 0.42, 2.55] as [number, number, number], scale: [0.46, 0.84, 0.38] as [number, number, number] },
  { color: "#0c1220", position: [-3.35, 0.58, 2.86] as [number, number, number], scale: [0.38, 1.16, 0.34] as [number, number, number] },
  { color: "#142033", position: [-2.02, 0.48, 2.72] as [number, number, number], scale: [0.54, 0.96, 0.38] as [number, number, number] },
  { color: "#101827", position: [0.05, 0.68, 3.0] as [number, number, number], scale: [0.44, 1.36, 0.36] as [number, number, number] },
  { color: "#111a28", position: [1.42, 0.52, 2.72] as [number, number, number], scale: [0.58, 1.04, 0.4] as [number, number, number] },
  { color: "#0d1723", position: [2.88, 0.62, 2.9] as [number, number, number], scale: [0.44, 1.24, 0.34] as [number, number, number] },
  { color: "#142033", position: [4.2, 0.46, 2.58] as [number, number, number], scale: [0.52, 0.92, 0.38] as [number, number, number] }
] as const;

function Road({
  position,
  scale,
  rotation = 0,
  reveal
}: {
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: number;
  reveal: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <mesh receiveShadow>
        <boxGeometry args={[1, 0.035, 1]} />
        <meshStandardMaterial
          color="#0c1018"
          emissive="#38bdf8"
          emissiveIntensity={0.01 * reveal}
          roughness={0.74}
        />
      </mesh>
      <mesh position={[0, 0.026, 0]}>
        <boxGeometry args={[0.86, 0.008, 0.035]} />
        <meshBasicMaterial color="#dbeafe" opacity={0.7 * reveal} transparent />
      </mesh>
      <mesh position={[0, 0.028, 0.43]}>
        <boxGeometry args={[0.92, 0.008, 0.025]} />
        <meshBasicMaterial color="#64748b" opacity={0.48 * reveal} transparent />
      </mesh>
      <mesh position={[0, 0.028, -0.43]}>
        <boxGeometry args={[0.92, 0.008, 0.025]} />
        <meshBasicMaterial color="#64748b" opacity={0.48 * reveal} transparent />
      </mesh>
    </group>
  );
}

function Lawn({
  position,
  scale,
  reveal
}: {
  position: [number, number, number];
  scale: [number, number, number];
  reveal: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh receiveShadow>
        <boxGeometry args={[1, 0.035, 1]} />
        <meshStandardMaterial
          color="#1f5f46"
          emissive="#34d399"
          emissiveIntensity={0.05 * reveal}
          roughness={0.68}
        />
      </mesh>
    </group>
  );
}

function Crosswalk({
  position,
  rotation = 0,
  reveal
}: {
  position: [number, number, number];
  rotation?: number;
  reveal: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {[-0.18, -0.09, 0, 0.09, 0.18].map((offset) => (
        <mesh key={offset} position={[offset, 0.075, 0]}>
          <boxGeometry args={[0.035, 0.008, 0.44]} />
          <meshBasicMaterial color="#e2e8f0" opacity={0.66 * reveal} transparent />
        </mesh>
      ))}
    </group>
  );
}

function ParkingLot({
  position,
  reveal
}: {
  position: [number, number, number];
  reveal: number;
}) {
  return (
    <group position={position}>
      <mesh receiveShadow>
        <boxGeometry args={[1.18, 0.026, 0.62]} />
        <meshStandardMaterial color="#10131a" roughness={0.78} />
      </mesh>
      {[-0.36, -0.18, 0, 0.18, 0.36].map((offset) => (
        <mesh key={offset} position={[offset, 0.025, 0]}>
          <boxGeometry args={[0.022, 0.008, 0.46]} />
          <meshBasicMaterial color="#dbeafe" opacity={0.58 * reveal} transparent />
        </mesh>
      ))}
    </group>
  );
}

function Vehicle({
  color,
  position,
  reveal,
  rotation
}: {
  color: string;
  position: [number, number, number];
  reveal: number;
  rotation: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={[reveal, reveal, reveal]}>
      <mesh castShadow>
        <boxGeometry args={[0.24, 0.07, 0.13]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.05}
          roughness={0.42}
        />
      </mesh>
      <mesh position={[0.02, 0.055, 0]}>
        <boxGeometry args={[0.1, 0.045, 0.105]} />
        <meshStandardMaterial
          color="#dceff2"
          emissive="#b7fff5"
          emissiveIntensity={0.05}
          opacity={0.85}
          roughness={0.22}
          transparent
        />
      </mesh>
    </group>
  );
}

function StreetLamp({
  position,
  reveal
}: {
  position: [number, number, number];
  reveal: number;
}) {
  return (
    <group position={position} scale={[reveal, reveal, reveal]}>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.012, 0.016, 0.26, 8]} />
        <meshStandardMaterial color="#475569" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial color="#67e8f9" opacity={0.82} transparent />
      </mesh>
    </group>
  );
}

function CampusTree({
  position,
  reveal,
  scale = 1
}: {
  position: [number, number, number];
  reveal: number;
  scale?: number;
}) {
  return (
    <group position={position} scale={[scale * reveal, scale * reveal, scale * reveal]}>
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 0.2, 8]} />
        <meshStandardMaterial color="#1f2937" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <coneGeometry args={[0.13, 0.35, 9]} />
        <meshStandardMaterial
          color="#1f513d"
          emissive="#34d399"
          emissiveIntensity={0.04}
          roughness={0.56}
        />
      </mesh>
    </group>
  );
}

function SkylineBlock({
  color,
  position,
  scale,
  reveal
}: {
  color: string;
  position: [number, number, number];
  scale: [number, number, number];
  reveal: number;
}) {
  return (
    <group position={position} scale={[scale[0] * reveal, scale[1] * reveal, scale[2] * reveal]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive="#0ea5e9"
          emissiveIntensity={0.018 * reveal}
          metalness={0.12}
          roughness={0.7}
        />
      </mesh>
      <mesh position={[0, 0.18, -0.51]}>
        <boxGeometry args={[0.72, 0.018, 0.018]} />
        <meshBasicMaterial color="#38bdf8" opacity={0.22 * reveal} transparent />
      </mesh>
    </group>
  );
}

export function ProductCity({
  htmlPortal,
  minimal = false,
  progress,
  onOpenProject
}: ProductCityProps) {
  const reveal = Math.min(1, Math.max(0, (progress - 0.02) / 0.12));
  const labelsVisible = progress > 0.10 && progress < 0.98;

  return (
    <group position={[1.66, 0, 0]} visible={reveal > 0.02} scale={[1.66, 1.66, 1.66]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} scale={[9.8, 6.8, 1]}>
        <planeGeometry args={[1, 1, 28, 28]} />
        <meshStandardMaterial
          color="#121722"
          emissive="#0ea5e9"
          emissiveIntensity={0.035 * reveal}
          metalness={0.12}
          roughness={0.7}
        />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.75, 96]} />
        <meshBasicMaterial color="#1e293b" opacity={0.48 * reveal} transparent />
      </mesh>
      <mesh position={[0, 0.017, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.08, 3.18, 96]} />
        <meshBasicMaterial color="#38bdf8" opacity={0.13 * reveal} transparent />
      </mesh>

      <Road position={[0, 0.04, 0]} reveal={reveal} scale={[8.8, 1, 0.28]} />
      <Road position={[0.22, 0.045, 0]} reveal={reveal} rotation={Math.PI / 2} scale={[5.6, 1, 0.28]} />
      <Road position={[-2.28, 0.05, 1.55]} reveal={reveal} rotation={-0.42} scale={[2.5, 1, 0.24]} />
      <Road position={[2.45, 0.05, -1.38]} reveal={reveal} rotation={0.36} scale={[2.65, 1, 0.24]} />
      <Crosswalk position={[-1.04, 0, 0]} reveal={reveal} rotation={Math.PI / 2} />
      <Crosswalk position={[1.28, 0, 0]} reveal={reveal} rotation={Math.PI / 2} />
      <Crosswalk position={[0.22, 0, -0.92]} reveal={reveal} />
      <ParkingLot position={[-3.54, 0.074, 0.72]} reveal={reveal} />
      <ParkingLot position={[3.65, 0.074, -0.62]} reveal={reveal} />
      {skylineBlocks.map((block) => (
        <SkylineBlock
          color={block.color}
          key={`${block.position[0]}-${block.position[2]}`}
          position={block.position}
          reveal={reveal}
          scale={block.scale}
        />
      ))}
      {vehicles.map((vehicle) => (
        <Vehicle
          color={vehicle.color}
          key={`${vehicle.position[0]}-${vehicle.position[2]}`}
          position={vehicle.position}
          reveal={reveal}
          rotation={vehicle.rotation}
        />
      ))}
      {lawns.map((lawn) => (
        <Lawn
          key={`${lawn.position[0]}-${lawn.position[2]}`}
          position={lawn.position}
          reveal={reveal}
          scale={lawn.scale}
        />
      ))}
      <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.22, 72]} />
        <meshBasicMaterial color="#67e8f9" opacity={0.42 * reveal} transparent />
      </mesh>

      {trees.map(([x, z, scale]) => (
        <CampusTree key={`${x}-${z}`} position={[x, 0, z]} reveal={reveal} scale={scale} />
      ))}
      {lamps.map(([x, z]) => (
        <StreetLamp
          key={`${x}-${z}`}
          position={[x, 0.075, z]}
          reveal={reveal}
        />
      ))}

      {cityProjectEntries.map(({ config, project }) => (
        <CityBuilding
          buildingType={config.buildingType}
          height={config.height}
          htmlPortal={htmlPortal}
          key={project.id}
          label={config.label}
          labelPosition={config.labelPosition}
          labelsVisible={labelsVisible}
          minimal={minimal}
          palette={config.palette}
          position={config.position}
          progress={progress}
          projectId={project.id}
          status={config.status}
          width={config.width}
          onOpen={() => onOpenProject?.(project)}
        />
      ))}
    </group>
  );
}
