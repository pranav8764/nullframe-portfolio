"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, type RefObject } from "react";
import type { Project } from "@/data/profile";
import { CameraRig } from "@/components/three/CameraRig";
import { Monolith } from "@/components/three/Monolith";
import { NullFrameCore } from "@/components/three/NullFrameCore";
import { ParticleDissolve } from "@/components/three/ParticleDissolve";
import { ProductCity } from "@/components/three/ProductCity";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { SceneProgress } from "@/hooks/useScrollProgress";
import { projectCityConfig } from "@/data/projectCityConfig";

type SceneCanvasProps = {
  htmlPortal?: RefObject<HTMLElement | null>;
  progress: SceneProgress;
  onOpenProject?: (project: Project) => void;
};

function hasWebGL() {
  if (typeof window === "undefined") return true;
  const canvas = document.createElement("canvas");
  return Boolean(
    canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
  );
}

export function SceneCanvas({ htmlPortal, progress, onOpenProject }: SceneCanvasProps) {
  const reducedMotion = useReducedMotion();
  const performance = usePerformanceMode();
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    setAvailable(hasWebGL());
  }, []);

  if (!available) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-null-black">
        <p className="rounded-lg border border-null-border bg-black/70 px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-null-muted">
          3D system unavailable. Static architecture mode loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ fov: 44, position: [0, 3.2, 12] }}
        dpr={performance.dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows={performance.shadows}
      >
        <Suspense fallback={null}>
          <color args={["#030405"]} attach="background" />
          <fog args={["#030405", 5, 20]} attach="fog" />
          <ambientLight intensity={0.34} />
          <hemisphereLight args={["#eaf6ff", "#050505", 0.42]} />
          <directionalLight
            castShadow={performance.shadows}
            color="#dbeafe"
            intensity={2.6}
            position={[-6, 10, 5]}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={35}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-bias={-0.0005}
          />
          <spotLight
            angle={0.38}
            color="#38bdf8"
            intensity={6.5}
            penumbra={0.75}
            position={[3.6, 7, 5.2]}
          />
          <pointLight color="#ffffff" intensity={1.1} position={[-4, 3, 4]} />
          
          {/* Dynamic project-specific light accents */}
          {projectCityConfig.map((config) => {
            const worldX = config.position[0] * 1.66 + 1.66;
            const worldY = config.height * 1.66; // position at top of tower
            const worldZ = config.position[2] * 1.66;
            return (
              <pointLight
                key={config.projectId}
                color={config.palette.accent}
                intensity={1.8}
                distance={4.2}
                decay={2}
                position={[worldX, worldY + 0.3, worldZ]}
              />
            );
          })}

          <Monolith progress={progress.heroProgress} reducedMotion={reducedMotion} />
          <ParticleDissolve
            count={performance.particleCount}
            progress={progress.cityProgress}
            reducedMotion={reducedMotion}
          />
          <ProductCity
            htmlPortal={htmlPortal}
            minimal={performance.minimalScene}
            progress={progress.cityProgress}
            onOpenProject={onOpenProject}
          />
          <NullFrameCore progress={progress.coreProgress} />
          <CameraRig progress={progress} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
