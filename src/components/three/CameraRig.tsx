"use client";

import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import type { SceneProgress } from "@/hooks/useScrollProgress";
import { projectCityConfig } from "@/data/projectCityConfig";

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
    const city = easeInOut(clamp01((progress.cityProgress - 0.02) / 0.12));
    // We stretch the orbit phase from 0.14 to 0.76 to give more room for the 6 stops
    const rawOrbit = clamp01((progress.cityProgress - 0.14) / 0.62);
    const enter = easeInOut(clamp01((progress.cityProgress - 0.76) / 0.16));
    const core = easeInOut(clamp01(progress.coreProgress));

    // Calculate tour parameters
    const stopsCount = projectCityConfig.length;
    // Map rawOrbit (0 to 1) into an index and fractional part
    const stopFloat = rawOrbit * (stopsCount - 1);
    
    // Create a "pause and go" easing so the camera rests on each building
    // Using a sine wave to flatten the curve near integers
    const easedStopFloat = stopFloat - Math.sin(stopFloat * Math.PI * 2) * 0.12;
    const startIndex = Math.floor(easedStopFloat);
    const endIndex = Math.min(startIndex + 1, stopsCount - 1);
    const segmentFraction = easeInOut(easedStopFloat - startIndex);

    // Wide view (before the tour)
    const wideTarget = new Vector3(1.35, 1.1, 0);
    const wideCamera = new Vector3(1.35, 4.5, 11.6);

    // Get current building views
    const getBuildingView = (index: number) => {
      const config = projectCityConfig[index];
      const worldX = config.position[0] * 1.66 + 1.66;
      const worldY = config.height * 1.66 * 0.5;
      const worldZ = config.position[2] * 1.66;
      
      return {
        target: new Vector3(worldX, worldY, worldZ),
        // Position camera to the bottom-left/front to see the building and its label
        camera: new Vector3(worldX - 3.2, 3.0, worldZ + 4.8)
      };
    };

    const startView = getBuildingView(startIndex);
    const endView = getBuildingView(endIndex);

    // Interpolate between the current two stops
    const tourTarget = startView.target.clone().lerp(endView.target, segmentFraction);
    const tourCamera = startView.camera.clone().lerp(endView.camera, segmentFraction);

    // Interpolate from wide city view to the tour
    // When rawOrbit is 0, we are at wide view. When rawOrbit > 0.05, we quickly transition to the tour
    const tourBlend = easeInOut(clamp01(rawOrbit / 0.05));
    
    const currentTarget = wideTarget.clone().lerp(tourTarget, tourBlend);
    const currentCamera = wideCamera.clone().lerp(tourCamera, tourBlend);

    // Apply enter/core phases (pushing into the core at the end)
    const coreTarget = new Vector3(1.35 + 0.32 + 0.18, 0.9 + 0.76 + 0.78, 0);
    const coreCamera = new Vector3(1.35, 3.65 - 1.35 + 1.1, (1 - city) * 1.6 - 4.85 + 1.45);

    const finalTarget = currentTarget.lerp(coreTarget, enter);
    const finalCamera = currentCamera.lerp(coreCamera, enter);

    // Mix in hero phase at the very beginning
    nextPosition.set(
      finalCamera.x,
      finalCamera.y - (1 - city) * hero * 0.45,
      finalCamera.z
    );

    camera.position.lerp(nextPosition, 0.048);
    camera.lookAt(target.lerp(finalTarget, 0.048));
  });

  return null;
}
