import { GlassCard } from "@/components/ui/GlassCard";

type MetricCardProps = {
  label: string;
  value: string;
  footnote?: string;
};

export function MetricCard({ label, value, footnote }: MetricCardProps) {
  return (
    <GlassCard className="p-4">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-null-muted">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-null-text">{value}</p>
      {footnote ? (
        <p className="mt-2 text-xs leading-5 text-null-muted">{footnote}</p>
      ) : null}
    </GlassCard>
  );
}
