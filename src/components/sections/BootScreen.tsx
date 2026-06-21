"use client";

import { useEffect, useState } from "react";
import { systemMessages } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type BootScreenProps = {
  visible: boolean;
  onSkip: () => void;
};

export function BootScreen({ visible, onSkip }: BootScreenProps) {
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    if (!visible) return;
    setLineCount(1);
    const timers = systemMessages.map((_, index) =>
      window.setTimeout(() => setLineCount(index + 1), 420 + index * 430)
    );
    return () => timers.forEach(window.clearTimeout);
  }, [visible]);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-0 z-[60] flex items-center justify-center bg-null-black transition duration-700",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div className="absolute inset-0 bg-scanline bg-[length:100%_5px] opacity-20" />
      <div className="relative w-[min(92vw,680px)] rounded-lg border border-null-border bg-black/84 p-5 shadow-2xl shadow-black sm:p-8">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-null-amber">
          corrupted.terminal
        </p>
        <div className="space-y-2 font-mono text-sm leading-7 text-null-muted sm:text-base">
          {systemMessages.slice(0, lineCount).map((line, index) => (
            <p
              className={index === lineCount - 1 ? "terminal-caret glitch-text" : ""}
              key={line}
            >
              <span className="text-null-amber">&gt;</span> {line}
            </p>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-null-muted">
            logs: more reliable than opinions
          </p>
          <Button onClick={onSkip} variant="ghost">
            Skip Intro
          </Button>
        </div>
      </div>
    </div>
  );
}
