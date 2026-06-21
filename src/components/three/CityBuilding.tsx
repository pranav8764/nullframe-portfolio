"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, type RefObject } from "react";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import type {
  ProjectCityBuildingKind,
  ProjectCityPalette,
  Vec3
} from "@/data/projectCityConfig";

type CityBuildingProps = {
  buildingType: ProjectCityBuildingKind;
  htmlPortal?: RefObject<HTMLElement | null>;
  label: string;
  labelPosition: Vec3;
  labelsVisible: boolean;
  minimal?: boolean;
  onOpen?: () => void;
  palette: ProjectCityPalette;
  projectId: string;
  status: string;
  position: Vec3;
  height: number;
  width?: number;
  progress: number;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const bigint = Number.parseInt(value, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function CityBuilding({
  buildingType,
  htmlPortal,
  label,
  labelPosition,
  labelsVisible,
  minimal = false,
  onOpen,
  palette,
  projectId,
  status,
  position,
  height,
  width = 0.72,
  progress
}: CityBuildingProps) {
  const groupRef = useRef<Group>(null);
  const mainRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const hoverScaleRef = useRef(1.0);
  const reveal = clamp01((progress - 0.06) / 0.08);
  const districtWidth = width * 2.1;
  const districtDepth = width * 1.62;
  const baseY = -height * 0.5;
  const materials = {
    ...palette,
    amber: palette.accent,
    blue: palette.secondary,
    grass: palette.lawn,
    red: palette.accent
  };

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
    return () => {
      document.body.style.cursor = "default";
    };
  }, [hovered]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + reveal * height * 0.5;
      const targetScale = hovered ? 1.04 : 1.0;
      hoverScaleRef.current += (targetScale - hoverScaleRef.current) * 0.16;
      const currentScale = reveal * hoverScaleRef.current;
      groupRef.current.scale.set(currentScale, currentScale, currentScale);
    }

    if (mainRef.current) {
      const material = mainRef.current.material as MeshStandardMaterial;
      const pulse = 0.05 + Math.sin(clock.elapsedTime * 1.6 + height) * 0.018;
      material.emissiveIntensity = hovered ? pulse * 2.8 + 0.18 : pulse;
    }
  });

  const Box = ({
    args,
    pos,
    color = materials.facade,
    emissive = "#000000",
    emissiveIntensity = 0.02,
    opacity = 1,
    metalness = 0.85,
    roughness = 0.22,
    refMain = false
  }: {
    args: [number, number, number];
    pos: [number, number, number];
    color?: string;
    emissive?: string;
    emissiveIntensity?: number;
    opacity?: number;
    metalness?: number;
    roughness?: number;
    refMain?: boolean;
  }) => (
    <mesh castShadow receiveShadow position={pos} ref={refMain ? mainRef : undefined}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        metalness={metalness}
        opacity={opacity}
        roughness={roughness}
        transparent={opacity < 1}
      />
    </mesh>
  );

  const Roof = ({
    pos,
    args,
    color = materials.roof
  }: {
    pos: [number, number, number];
    args: [number, number, number];
    color?: string;
  }) => (
    <Box
      args={args}
      color={color}
      emissive={materials.amber}
      emissiveIntensity={0.02}
      metalness={0.18}
      pos={pos}
      roughness={0.36}
    />
  );

  const Road = ({
    pos,
    args,
    rotation = 0
  }: {
    pos: [number, number, number];
    args: [number, number, number];
    rotation?: number;
  }) => (
    <mesh receiveShadow position={pos} rotation={[0, rotation, 0]}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={materials.road}
        emissive={materials.amber}
        emissiveIntensity={0.01}
        roughness={0.65}
      />
    </mesh>
  );

  const Lane = ({
    pos,
    args,
    rotation = 0
  }: {
    pos: [number, number, number];
    args: [number, number, number];
    rotation?: number;
  }) => (
    <mesh position={pos} rotation={[0, rotation, 0]}>
      <boxGeometry args={args} />
      <meshBasicMaterial color={materials.roofWarm} opacity={0.76} transparent />
    </mesh>
  );

  const Tree = ({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) => (
    <group position={[x, baseY + 0.08 * scale, z]}>
      <mesh>
        <cylinderGeometry args={[0.018 * scale, 0.026 * scale, 0.16 * scale, 8]} />
        <meshStandardMaterial color="#332516" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.12 * scale, 0]}>
        <coneGeometry args={[0.09 * scale, 0.24 * scale, 9]} />
        <meshStandardMaterial
          color={materials.grass}
          emissive="#2b6a31"
          emissiveIntensity={0.035}
          roughness={0.6}
        />
      </mesh>
    </group>
  );

  const GlassBand = ({
    pos,
    args
  }: {
    pos: [number, number, number];
    args: [number, number, number];
  }) => (
    <Box
      args={args}
      color={materials.glass}
      emissive="#b7fff5"
      emissiveIntensity={0.12}
      metalness={0.94}
      opacity={0.42}
      pos={pos}
      roughness={0.05}
    />
  );

  const RoofMark = ({
    args,
    pos,
    color = materials.blue
  }: {
    args: [number, number, number];
    pos: [number, number, number];
    color?: string;
  }) => (
    <Box
      args={args}
      color={color}
      emissive={color}
      emissiveIntensity={0.16}
      metalness={0.05}
      pos={pos}
      roughness={0.4}
    />
  );

  const WindowRun = ({
    count,
    pos,
    args,
    step,
    axis = "x"
  }: {
    count: number;
    pos: [number, number, number];
    args: [number, number, number];
    step: number;
    axis?: "x" | "z";
  }) => (
    <>
      {Array.from({ length: count }, (_, index) => {
        const offset = (index - (count - 1) / 2) * step;
        return (
          <GlassBand
            args={args}
            key={`${pos.join("-")}-${index}`}
            pos={[
              pos[0] + (axis === "x" ? offset : 0),
              pos[1],
              pos[2] + (axis === "z" ? offset : 0)
            ]}
          />
        );
      })}
    </>
  );

  const RoofEquipment = ({ pos }: { pos: [number, number, number] }) => (
    <>
      <Box
        args={[width * 0.18, 0.04, width * 0.14]}
        color="#334155"
        emissive="#ffffff"
        emissiveIntensity={0.015}
        metalness={0.8}
        pos={pos}
        roughness={0.2}
      />
      <Box
        args={[width * 0.1, 0.028, width * 0.08]}
        color="#1e293b"
        metalness={0.8}
        pos={[pos[0] + width * 0.22, pos[1] + 0.002, pos[2] - width * 0.12]}
        roughness={0.2}
      />
    </>
  );

  const Sign = ({ text, pos }: { text: string; pos: Vec3 }) =>
    reveal < 0.3 || !labelsVisible ? null : (
      <Html
        center
        portal={htmlPortal as RefObject<HTMLElement> | undefined}
        position={pos}
        zIndexRange={[50, 40]}
        style={{ pointerEvents: "auto" }}
      >
        <button
          aria-label={`Open ${text} project journey`}
          className="group relative w-44 cursor-pointer rounded-lg border bg-black/92 px-3 py-2.5 text-center font-mono shadow-[0_0_24px_rgba(0,0,0,0.8)] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_0_36px_rgba(0,0,0,0.9)] focus-visible:outline focus-visible:outline-2"
          data-testid={`journey-hotspot-${projectId}`}
          style={{
            borderColor: hexToRgba(materials.accent, 0.85),
            boxShadow: `0 0 28px ${hexToRgba(materials.accent, 0.32)}, inset 0 1px 0 ${hexToRgba(materials.accent, 0.12)}`,
            outlineColor: materials.accent
          }}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpen?.();
          }}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <span
            className="block text-[0.7rem] font-bold uppercase tracking-[0.14em] leading-snug text-null-text"
          >
            {text}
          </span>
          <span
            className="mx-auto mt-1.5 block h-px w-10 transition-all duration-300 group-hover:w-16"
            style={{ backgroundColor: materials.accent }}
          />
          <span className="mt-1.5 block truncate text-[0.55rem] uppercase tracking-wider opacity-60 text-null-muted">
            {status}
          </span>
        </button>
      </Html>
    );

  const body = (() => {
    if (buildingType === "collaborationHub") {
      return (
        <>
          <Road args={[districtWidth * 1.04, 0.035, 0.18]} pos={[0, baseY + 0.035, 0.42]} />
          <Lane args={[districtWidth * 0.8, 0.01, 0.018]} pos={[0, baseY + 0.06, 0.42]} />
          <Box
            args={[width * 0.95, height * 0.34, width * 0.72]}
            color={materials.facade}
            emissive={materials.amber}
            emissiveIntensity={0.05}
            pos={[-0.36, baseY + height * 0.17, -0.08]}
            refMain
          />
          <Roof
            args={[width * 1.05, 0.07, width * 0.82]}
            pos={[-0.36, baseY + height * 0.37, -0.08]}
          />
          <GlassBand
            args={[width * 0.78, 0.055, 0.035]}
            pos={[-0.36, baseY + height * 0.23, -0.46]}
          />
          <WindowRun
            args={[width * 0.12, 0.04, 0.032]}
            count={4}
            pos={[-0.36, baseY + height * 0.16, -0.46]}
            step={width * 0.18}
          />
          <RoofEquipment pos={[-0.64, baseY + height * 0.425, 0.08]} />
          <RoofMark
            args={[width * 0.56, 0.018, 0.055]}
            color={materials.red}
            pos={[-0.36, baseY + height * 0.415, -0.08]}
          />
          <Box
            args={[width * 0.78, height * 0.28, width * 0.62]}
            color={materials.facadeDark}
            emissive={materials.amber}
            emissiveIntensity={0.035}
            pos={[0.44, baseY + height * 0.14, 0.12]}
          />
          <Roof
            args={[width * 0.88, 0.06, width * 0.72]}
            pos={[0.44, baseY + height * 0.31, 0.12]}
          />
          <GlassBand
            args={[width * 0.62, 0.045, 0.035]}
            pos={[0.44, baseY + height * 0.19, -0.22]}
          />
          <WindowRun
            args={[width * 0.1, 0.036, 0.03]}
            count={3}
            pos={[0.44, baseY + height * 0.13, -0.22]}
            step={width * 0.17}
          />
          <Box
            args={[width * 0.84, 0.08, 0.12]}
            color={materials.glass}
            emissive="#a9fff6"
            emissiveIntensity={0.08}
            opacity={0.65}
            pos={[0.04, baseY + height * 0.24, 0.04]}
          />
        </>
      );
    }

    if (buildingType === "securityBastion") {
      return (
        <>
          <Road args={[districtWidth * 0.18, 0.035, districtDepth * 1.15]} pos={[-0.62, baseY + 0.035, 0]} />
          <Box
            args={[width * 1.24, height * 0.32, width * 1.02]}
            color={materials.facadeDark}
            emissive={materials.amber}
            emissiveIntensity={0.06}
            pos={[0, baseY + height * 0.16, 0]}
            refMain
          />
          <Roof
            args={[width * 1.34, 0.075, width * 1.12]}
            color={materials.roofWarm}
            pos={[0, baseY + height * 0.36, 0]}
          />
          <GlassBand
            args={[width * 0.96, 0.045, 0.035]}
            pos={[0, baseY + height * 0.2, -0.53]}
          />
          <GlassBand
            args={[0.035, 0.045, width * 0.78]}
            pos={[0.64, baseY + height * 0.2, 0]}
          />
          <WindowRun
            args={[width * 0.12, 0.038, 0.032]}
            count={5}
            pos={[0, baseY + height * 0.14, -0.53]}
            step={width * 0.18}
          />
          <WindowRun
            args={[0.032, 0.038, width * 0.1]}
            axis="z"
            count={4}
            pos={[0.64, baseY + height * 0.14, 0]}
            step={width * 0.18}
          />
          <RoofEquipment pos={[-0.28, baseY + height * 0.41, 0.18]} />
          <mesh position={[0, baseY + height * 0.44, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[width * 0.42, 0.026, 8, 5]} />
            <meshBasicMaterial color={materials.amber} opacity={0.82} transparent />
          </mesh>
          <Box
            args={[width * 0.18, height * 0.24, width * 0.18]}
            color={materials.facade}
            emissive={materials.amber}
            emissiveIntensity={0.12}
            pos={[-0.48, baseY + height * 0.5, -0.36]}
          />
          <Box
            args={[width * 0.18, height * 0.24, width * 0.18]}
            color={materials.facade}
            emissive={materials.amber}
            emissiveIntensity={0.12}
            pos={[0.48, baseY + height * 0.5, 0.36]}
          />
        </>
      );
    }

    if (buildingType === "analysisTower") {
      return (
        <>
          <Road args={[districtWidth * 0.95, 0.035, 0.18]} pos={[0, baseY + 0.035, -0.48]} />
          <mesh castShadow receiveShadow position={[0, baseY + height * 0.2, 0]} ref={mainRef}>
            <cylinderGeometry args={[width * 0.54, width * 0.68, height * 0.4, 8]} />
            <meshStandardMaterial
              color={materials.facade}
              emissive={materials.amber}
              emissiveIntensity={0.055}
              metalness={0.26}
              roughness={0.38}
            />
          </mesh>
          <mesh position={[0, baseY + height * 0.44, 0]}>
            <cylinderGeometry args={[width * 0.72, width * 0.72, 0.07, 8]} />
            <meshStandardMaterial
              color={materials.roof}
              emissive={materials.amber}
              emissiveIntensity={0.045}
              roughness={0.34}
            />
          </mesh>
          <GlassBand
            args={[width * 0.72, 0.04, 0.035]}
            pos={[0, baseY + height * 0.28, -width * 0.62]}
          />
          <WindowRun
            args={[width * 0.1, 0.035, 0.03]}
            count={5}
            pos={[0, baseY + height * 0.18, -width * 0.62]}
            step={width * 0.15}
          />
          <RoofMark
            args={[width * 0.16, 0.02, width * 0.48]}
            color={materials.blue}
            pos={[0, baseY + height * 0.49, 0]}
          />
          <RoofMark
            args={[width * 0.48, 0.02, width * 0.16]}
            color={materials.blue}
            pos={[0, baseY + height * 0.492, 0]}
          />
          {[0, 1, 2, 3].map((index) => {
            const angle = index * Math.PI * 0.5 + 0.3;
            return (
              <mesh
                key={index}
                position={[
                  Math.cos(angle) * width * 0.92,
                  baseY + height * 0.32,
                  Math.sin(angle) * width * 0.72
                ]}
              >
                <sphereGeometry args={[width * 0.105, 14, 14]} />
                <meshBasicMaterial color={materials.amber} opacity={0.68} transparent />
              </mesh>
            );
          })}
        </>
      );
    }

    if (buildingType === "wellnessDome") {
      return (
        <>
          <Box
            args={[districtWidth * 0.92, 0.045, districtDepth * 0.9]}
            color={materials.grass}
            emissive="#2b6a31"
            emissiveIntensity={0.06}
            pos={[0, baseY + 0.025, 0]}
          />
          <mesh castShadow receiveShadow position={[0, baseY + height * 0.18, 0]} ref={mainRef}>
            <cylinderGeometry args={[width * 0.62, width * 0.72, height * 0.36, 16]} />
            <meshStandardMaterial
              color={materials.facade}
              emissive={materials.amber}
              emissiveIntensity={0.035}
              metalness={0.16}
              roughness={0.48}
            />
          </mesh>
          <mesh position={[0, baseY + height * 0.4, 0]}>
            <sphereGeometry args={[width * 0.5, 18, 10]} />
            <meshStandardMaterial
              color={materials.roof}
              emissive={materials.amber}
              emissiveIntensity={0.018}
              roughness={0.42}
            />
          </mesh>
          <GlassBand
            args={[width * 0.82, 0.04, 0.035]}
            pos={[0, baseY + height * 0.22, -width * 0.62]}
          />
          <WindowRun
            args={[width * 0.1, 0.034, 0.03]}
            count={4}
            pos={[0, baseY + height * 0.16, -width * 0.62]}
            step={width * 0.17}
          />
          {[-0.72, -0.46, 0.58, 0.82].map((x, index) => (
            <Tree key={index} scale={0.8} x={x} z={index % 2 === 0 ? -0.56 : 0.56} />
          ))}
        </>
      );
    }

    if (buildingType === "clinicalWing") {
      return (
        <>
          <Road args={[districtWidth * 0.96, 0.035, 0.18]} pos={[0, baseY + 0.035, 0.54]} />
          <Box
            args={[width * 0.54, height * 0.4, width * 1.16]}
            color={materials.facade}
            emissive={materials.amber}
            emissiveIntensity={0.035}
            pos={[0, baseY + height * 0.2, 0]}
            refMain
          />
          <Box
            args={[width * 1.12, height * 0.28, width * 0.48]}
            color={materials.facadeDark}
            emissive={materials.amber}
            emissiveIntensity={0.04}
            pos={[0, baseY + height * 0.14, 0]}
          />
          <Roof
            args={[width * 1.18, 0.065, width * 1.2]}
            pos={[0, baseY + height * 0.43, 0]}
          />
          <GlassBand
            args={[width * 0.42, 0.04, 0.035]}
            pos={[-0.24, baseY + height * 0.24, -0.6]}
          />
          <GlassBand
            args={[width * 0.42, 0.04, 0.035]}
            pos={[0.24, baseY + height * 0.24, -0.6]}
          />
          <WindowRun
            args={[width * 0.1, 0.034, 0.03]}
            count={4}
            pos={[0, baseY + height * 0.16, -0.6]}
            step={width * 0.17}
          />
          <RoofEquipment pos={[-0.34, baseY + height * 0.48, 0.24]} />
          <Box
            args={[width * 0.5, 0.035, 0.028]}
            color={materials.amber}
            emissive={materials.amber}
            emissiveIntensity={0.7}
            pos={[0, baseY + height * 0.5, -0.02]}
          />
          <Box
            args={[0.032, 0.035, width * 0.5]}
            color={materials.amber}
            emissive={materials.amber}
            emissiveIntensity={0.7}
            pos={[0, baseY + height * 0.5, -0.02]}
          />
        </>
      );
    }

    if (buildingType === "mobilityTerminal") {
      return (
        <>
          <Road args={[districtWidth * 1.16, 0.035, 0.2]} pos={[0, baseY + 0.035, -0.1]} />
          <Road
            args={[0.2, 0.035, districtDepth * 0.98]}
            pos={[0.48, baseY + 0.038, 0.03]}
          />
          <Lane args={[districtWidth * 0.8, 0.01, 0.018]} pos={[0, baseY + 0.065, -0.1]} />
          <Box
            args={[width * 0.96, height * 0.25, width * 0.66]}
            color={materials.facade}
            emissive={materials.amber}
            emissiveIntensity={0.04}
            pos={[-0.24, baseY + height * 0.125, 0.36]}
            refMain
          />
          <Roof
            args={[width * 1.05, 0.06, width * 0.74]}
            pos={[-0.24, baseY + height * 0.29, 0.36]}
          />
          <GlassBand
            args={[width * 0.78, 0.04, 0.035]}
            pos={[-0.24, baseY + height * 0.17, 0.02]}
          />
          <WindowRun
            args={[width * 0.1, 0.034, 0.03]}
            count={4}
            pos={[-0.24, baseY + height * 0.115, 0.02]}
            step={width * 0.16}
          />
          <RoofMark
            args={[width * 0.68, 0.018, 0.045]}
            color={materials.blue}
            pos={[-0.24, baseY + height * 0.33, 0.36]}
          />
          {[0, 1, 2].map((index) => (
            <Box
              args={[0.12, 0.02, 0.2]}
              color={materials.roofWarm}
              emissive={materials.amber}
              emissiveIntensity={0.08}
              key={index}
              pos={[-0.52 + index * 0.28, baseY + 0.075, -0.45]}
            />
          ))}
        </>
      );
    }

    return null;
  })();

  return (
    <group
      position={[position[0], position[1], position[2]]}
      ref={groupRef}
      onClick={(event) => {
        event.stopPropagation();
        onOpen?.();
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setHovered(false);
      }}
    >
      <Box
        args={[districtWidth, 0.045, districtDepth]}
        color={materials.ground}
        emissive={materials.accent}
        emissiveIntensity={0.05}
        metalness={0.9}
        roughness={0.15}
        pos={[0, baseY + 0.01, 0]}
      />
      {body}
      <Sign text={label} pos={labelPosition} />
    </group>
  );
}
