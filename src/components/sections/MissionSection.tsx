import { profile } from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { Badge } from "@/components/ui/Badge";

export function MissionSection() {
  return (
    <SectionFrame
      description="The portfolio is modeled as a product lab: each project is a system module, each metric is a signal, and every unknown stays clearly marked."
      eyebrow="mission.control"
      id="systems"
      title={profile.tagline}
    >
      <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-6" data-animate>
          <p className="text-2xl leading-10 text-null-text sm:text-3xl">
            {profile.mission}
          </p>
          <p className="mt-6 font-mono text-sm text-null-amber">
            Most software fails quietly. Mine logs the failure, isolates it, and keeps moving.
          </p>
        </GlassCard>
        <GlassCard className="p-6" data-animate>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-null-amber">
            identity.stack
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.focus.split(". ").map((item) => (
              <Badge key={item} variant="amber">
                {item.replace(".", "")}
              </Badge>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-null-muted">
            Currently building systems that prefer logs over opinions.
          </p>
        </GlassCard>
      </div>
    </SectionFrame>
  );
}
