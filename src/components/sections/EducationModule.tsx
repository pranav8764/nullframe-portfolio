import { education } from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { StatusPill } from "@/components/ui/StatusPill";

export function EducationModule() {
  return (
    <SectionFrame
      description="Kept separate from achievements: school and institute credentials are credibility signals, not noise."
      eyebrow="module.education"
      id="education"
      title="System credibility module."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((item) => (
          <GlassCard className="p-6" data-animate key={item.institution}>
            <StatusPill status={`status: ${item.status}`} tone="muted" />
            <h3 className="mt-5 text-2xl font-semibold">{item.institution}</h3>
            <p className="mt-3 text-null-muted">{item.program}</p>
            <p className="mt-4 font-mono text-sm text-null-amber">{item.score}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-null-muted">
              timeline: {item.timeline}
            </p>
            {item.signal ? (
              <p className="mt-5 rounded-md border border-null-border bg-black/35 px-3 py-2 font-mono text-xs text-null-muted">
                signal: {item.signal}
              </p>
            ) : null}
          </GlassCard>
        ))}
      </div>
    </SectionFrame>
  );
}
