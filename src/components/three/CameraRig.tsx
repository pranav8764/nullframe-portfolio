"use client";

import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

type CameraRigProps = {
  progress: number;
  reducedMotion: boolean;
};

const target = new Vector3(0, 1.1, 0);
const nextPosition = new Vector3();

export function CameraRig({ progress, reducedMotion }: CameraRigProps) {
  useFrame(({ camera }) => {
    if (reducedMotion) {
      camera.position.lerp(nextPosition.set(0, 3.2, 12), 0.05);
      camera.lookAt(target);
      return;
    }

    const reveal = Math.min(1, Math.max(0, (progress - 0.08) / 0.28));
    const orbit = Math.min(1, Math.max(0, (progress - 0.26) / 0.28));
    const push = Math.min(1, Math.max(0, (progress - 0.54) / 0.24));
    const angle = orbit * Math.PI * 1.35;
    const radius = 12 - reveal * 3 - push * 4.2;

    nextPosition.set(
      Math.sin(angle) * (radius * 0.38),
      3.4 + reveal * 2.1 - push * 1.2,
      Math.cos(angle) * radius
    );

    camera.position.lerp(nextPosition, 0.045);
    camera.lookAt(target.set(0, 1.1 + push * 0.7, 0));
  });

  return null;
}
