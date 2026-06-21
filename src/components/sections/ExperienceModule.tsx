import { experience } from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { StatusPill } from "@/components/ui/StatusPill";
import { TerminalText } from "@/components/ui/TerminalText";

export function ExperienceModule() {
  return (
    <SectionFrame
      description="Internship work presented as production pipeline evidence: scraping, queues, storage, enrichment, APIs, and caching."
      eyebrow="module.experience"
      id="experience"
      title="HireFT pipeline dashboard."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <GlassCard className="p-6" data-animate>
          <StatusPill status={`status: ${experience.status}`} />
          <h3 className="mt-5 text-3xl font-semibold">{experience.company}</h3>
          <p className="mt-2 text-null-muted">
            {experience.role} | {experience.location} | {experience.duration}
          </p>
          <p className="mt-5 font-mono text-sm text-null-amber">
            mode: {experience.mode}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {experience.pipeline.map((step, index) => (
              <span
                className="rounded-md border border-null-border bg-black/35 px-3 py-2 font-mono text-xs text-null-muted"
                key={step}
              >
                {index > 0 ? "-> " : ""}
                {step}
              </span>
            ))}
          </div>
          <div className="mt-6 space-y-3 text-sm leading-6 text-null-muted">
            {experience.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
        </GlassCard>
        <div className="space-y-5" data-animate>
          <div className="grid gap-3 sm:grid-cols-2">
            {experience.proofMetrics.slice(0, 4).map((metric) => {
              const [label, ...rest] = metric.split(" ");
              return (
                <MetricCard
                  key={metric}
                  label={label.toLowerCase()}
                  value={rest.join(" ") || metric}
                />
              );
            })}
          </div>
          <TerminalText lines={experience.logs} caret />
        </div>
      </div>
    </SectionFrame>
  );
}
