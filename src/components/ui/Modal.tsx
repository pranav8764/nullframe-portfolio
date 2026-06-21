"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeLabel?: string;
  eyebrow?: string;
  closeTestId?: string;
};

export function Modal({
  open,
  title,
  onClose,
  children,
  className,
  closeLabel = "Close modal",
  eyebrow = "system.panel",
  closeTestId = "modal-close"
}: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/78 p-3 backdrop-blur-md md:items-center md:p-8"
      role="dialog"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          "max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-t-lg border border-null-border bg-null-surface/96 p-4 shadow-2xl shadow-black md:rounded-lg md:p-6",
          className
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-null-amber">
              {eyebrow}
            </p>
            <h2 id="modal-title" className="mt-2 text-2xl font-semibold">
              {title}
            </h2>
          </div>
          <button
            ref={closeRef}
            aria-label={closeLabel}
            className="rounded-md border border-null-border bg-white/[0.04] p-2 text-null-muted transition hover:border-null-amber hover:text-null-text"
            data-testid={closeTestId}
            type="button"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
