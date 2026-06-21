import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const buttonStyles: Record<Variant, string> = {
  primary:
    "border-null-amber/70 bg-null-amber/12 text-null-text shadow-[0_0_24px_rgba(245,158,11,0.14)] hover:bg-null-amber/18",
  secondary:
    "border-null-border bg-white/[0.035] text-null-text hover:border-null-amber/60 hover:bg-white/[0.055]",
  ghost: "border-transparent text-null-muted hover:text-null-text hover:bg-white/[0.04]"
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  className,
  variant = "secondary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] transition",
        buttonStyles[variant],
        className
      )}
      type={type}
      {...props}
    />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  disabled?: boolean;
};

export function LinkButton({
  className,
  variant = "secondary",
  disabled = false,
  ...props
}: LinkButtonProps) {
  if (disabled) {
    return (
      <span
        className={cn(
          "inline-flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-md border border-null-border/70 bg-white/[0.02] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-null-muted/70",
          className
        )}
      >
        {props.children}
      </span>
    );
  }

  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] transition",
        buttonStyles[variant],
        className
      )}
      {...props}
    />
  );
}
