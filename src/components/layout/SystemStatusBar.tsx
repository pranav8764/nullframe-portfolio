"use client";

import { useEffect, useMemo, useState } from "react";
import { SCROLL_STATES, STATUS_MESSAGES } from "@/lib/constants";
import { cn } from "@/lib/cn";

type SystemStatusBarProps = {
  progress: number;
  visible: boolean;
};

export function SystemStatusBar({ progress, visible }: SystemStatusBarProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const percent = Math.round(progress * 100);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMessageIndex((index) => (index + 1) % STATUS_MESSAGES.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const state = useMemo(
    () => SCROLL_STATES.find((item) => progress <= item.max) ?? SCROLL_STATES[0],
    [progress]
  );

  return (
    <div
      className={cn(
        "fixed inset-x-2 bottom-2 z-40 transition duration-500 sm:inset-x-4",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-lg border border-null-border bg-black/78 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-null-muted shadow-2xl shadow-black backdrop-blur-xl sm:text-xs">
        <span className="truncate">
          {state.text} | scroll: {percent}%
        </span>
        <span className="hidden text-null-amber sm:inline">
          {STATUS_MESSAGES[messageIndex]}
        </span>
      </div>
    </div>
  );
}
