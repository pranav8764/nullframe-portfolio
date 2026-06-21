"use client";

import { useEffect, useState } from "react";

export type SceneProgress = {
  pageProgress: number;
  heroProgress: number;
  cityProgress: number;
  coreProgress: number;
};

const initialProgress: SceneProgress = {
  pageProgress: 0,
  heroProgress: 0,
  cityProgress: 0,
  coreProgress: 0
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function getPageProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max <= 0 ? 0 : clamp01(window.scrollY / max);
}

function getElementProgress(id: string, mode: "hero" | "pinned" | "viewport") {
  const element = document.getElementById(id);
  if (!element) return 0;

  const viewport = window.innerHeight;
  const start = (() => {
    if (mode === "hero") return element.offsetTop;
    if (mode === "pinned") return element.offsetTop;
    return element.offsetTop - viewport * 0.62;
  })();
  const duration = (() => {
    if (mode === "hero") return Math.max(element.offsetHeight, viewport);
    if (mode === "pinned") return Math.max(element.offsetHeight - viewport, viewport);
    return Math.max(element.offsetHeight + viewport * 0.42, viewport);
  })();

  return clamp01((window.scrollY - start) / duration);
}

export function useSceneProgress(): SceneProgress {
  const [progress, setProgress] = useState<SceneProgress>(initialProgress);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setProgress({
          pageProgress: getPageProgress(),
          heroProgress: getElementProgress("monolith", "hero"),
          cityProgress: getElementProgress("city", "pinned"),
          coreProgress: getElementProgress("core", "viewport")
        });
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

export function useScrollProgress() {
  return useSceneProgress().pageProgress;
}
