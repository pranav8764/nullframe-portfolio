import { cn } from "@/lib/cn";

type StatusPillProps = {
  status: string;
  tone?: "amber" | "green" | "muted";
  className?: string;
};

const tones = {
  amber: "border-null-amber/60 bg-null-amber/10 text-null-amber",
  green: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  muted: "border-null-border bg-white/[0.025] text-null-muted"
};

export function StatusPill({
  status,
  tone = "amber",
  className
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em]",
        tones[tone],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
