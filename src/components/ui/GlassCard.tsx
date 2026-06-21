import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function GlassCard({
  className,
  interactive = false,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-noise rounded-lg border border-null-border/90 bg-null-card/72 p-5 backdrop-blur-xl",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        interactive &&
          "transition duration-300 hover:border-null-amber/70 hover:shadow-amber",
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
