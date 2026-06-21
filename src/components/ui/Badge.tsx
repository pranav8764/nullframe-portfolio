import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "muted" | "amber" | "danger" | "outline";
};

const variants = {
  muted: "border-null-border bg-white/[0.025] text-null-muted",
  amber: "border-null-amber/60 bg-null-amber/10 text-null-amber",
  danger: "border-red-500/40 bg-red-500/10 text-red-200",
  outline: "border-null-border text-null-text"
};

export function Badge({
  className,
  variant = "muted",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em]",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
