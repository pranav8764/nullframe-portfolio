import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionFrameProps = HTMLAttributes<HTMLElement> & {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SectionFrame({
  id,
  eyebrow,
  title,
  description,
  className,
  children,
  ...props
}: SectionFrameProps) {
  return (
    <section
      aria-label={props["aria-label"] || eyebrow}
      className={cn("relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8", className)}
      id={id}
      {...props}
    >
      <div className="mb-10 max-w-3xl" data-animate>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-null-amber">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-null-text sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-7 text-null-muted sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
