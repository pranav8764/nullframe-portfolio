import { leadership } from "@/data/profile";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionFrame } from "@/components/layout/SectionFrame";

export function LeadershipModule() {
  return (
    <SectionFrame
      description="Operational signal, deliberately low volume."
      eyebrow="leadership.signal"
      id="leadership"
      title="Leadership modules detected."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {leadership.map((item) => (
          <GlassCard className="p-5" data-animate key={item.role}>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-null-amber">
              {item.module}
            </p>
            <h3 className="mt-4 text-xl font-semibold">{item.role}</h3>
            <p className="mt-2 text-sm text-null-muted">
              {item.institution} | {item.timeline}
            </p>
            <p className="mt-4 text-sm leading-6 text-null-muted">{item.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.metrics.map((metric) => (
                <Badge key={metric} variant="amber">
                  {metric}
                </Badge>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionFrame>
  );
}
