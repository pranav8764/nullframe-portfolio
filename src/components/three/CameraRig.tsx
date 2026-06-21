"use client";

import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import type { SceneProgress } from "@/hooks/useScrollProgress";

type CameraRigProps = {
  progress: SceneProgress;
  reducedMotion: boolean;
};

const target = new Vector3(0, 1.1, 0);
const nextPosition = new Vector3();

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeInOut(value: number) {
  return value * value * (3 - 2 * value);
}

export function CameraRig({ progress, reducedMotion }: CameraRigProps) {
  useFrame(({ camera }) => {
    if (reducedMotion) {
      camera.position.lerp(nextPosition.set(1.35, 3.2, 10.5), 0.05);
      camera.lookAt(target.set(1.35, 1.1, 0));
      return;
    }

    const hero = easeInOut(progress.heroProgress);
    const city = easeInOut(clamp01((progress.cityProgress - 0.02) / 0.16));
    const orbit = easeInOut(clamp01((progress.cityProgress - 0.1) / 0.62));
    const enter = easeInOut(clamp01((progress.cityProgress - 0.72) / 0.16));
    const core = easeInOut(clamp01(progress.coreProgress));
    const cityCenterX = 1.35;
    const angle = -0.68 + orbit * Math.PI * 2.08 + core * 0.36;
    const radius = 11.6 - city * 2.45 - enter * 4.85 + core * 1.45;
    const height = 3.65 + city * 0.85 - enter * 1.35 + core * 1.1;
    const centerShift = enter * 0.32 + core * 0.18;

    nextPosition.set(
      cityCenterX * city + Math.sin(angle) * (radius * (0.28 + city * 0.2)),
      height - (1 - city) * hero * 0.45,
      Math.cos(angle) * radius + (1 - city) * 1.6
    );

    camera.position.lerp(nextPosition, 0.048);
    camera.lookAt(target.set(cityCenterX + centerShift, 0.9 + enter * 0.76 + core * 0.78, 0));
  });

  return null;
}
