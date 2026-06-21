"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { CameraRig } from "@/components/three/CameraRig";
import { Monolith } from "@/components/three/Monolith";
import { NullFrameCore } from "@/components/three/NullFrameCore";
import { ParticleDissolve } from "@/components/three/ParticleDissolve";
import { ProductCity } from "@/components/three/ProductCity";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SceneCanvasProps = {
  progress: number;
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

export function SceneCanvas({ progress }: SceneCanvasProps) {
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
          <color args={["#050505"]} attach="background" />
          <fog args={["#050505", 7, 26]} attach="fog" />
          <ambientLight intensity={0.28} />
          <spotLight
            angle={0.42}
            color="#f59e0b"
            intensity={5.5}
            penumbra={0.75}
            position={[3, 7, 5]}
          />
          <pointLight color="#ffffff" intensity={0.9} position={[-4, 3, 4]} />
          <Monolith progress={progress} reducedMotion={reducedMotion} />
          <ParticleDissolve
            count={performance.particleCount}
            progress={progress}
            reducedMotion={reducedMotion}
          />
          <ProductCity progress={progress} />
          <NullFrameCore progress={progress} />
          <CameraRig progress={progress} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
