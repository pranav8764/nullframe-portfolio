"use client";

import { useState } from "react";
import { skillModules, technicalSkills, type SkillModule } from "@/data/profile";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { StatusPill } from "@/components/ui/StatusPill";

export function SkillsDashboard() {
  const [active, setActive] = useState<SkillModule>(skillModules[0]);

  return (
    <SectionFrame
      description="Skills are treated as powered modules with evidence attached, not a loose keyword wall."
      eyebrow="core.modules"
      id="core"
      title="NullFrame Core system dashboard."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-2" data-animate>
          {skillModules.map((module, index) => (
            <button
              className="text-left"
              key={module.id}
              type="button"
              onClick={() => setActive(module)}
            >
              <GlassCard
                className={
                  active.id === module.id
                    ? "border-null-amber/70 shadow-amber"
                    : "border-null-border"
                }
                interactive
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-null-amber">
                    module.{String(index + 1).padStart(2, "0")}
                  </p>
                  <StatusPill status={module.status} tone="muted" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{module.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {module.tools.slice(0, 4).map((tool) => (
                    <Badge key={tool}>{tool}</Badge>
                  ))}
                </div>
              </GlassCard>
            </button>
          ))}
        </div>

        <GlassCard className="sticky top-6 h-fit p-6" data-animate>
          <StatusPill status={`${active.name}: ${active.status}`} />
          <h3 className="mt-5 text-3xl font-semibold">{active.name}</h3>
          <div className="mt-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-null-amber">
              evidence
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {active.evidence.map((item) => (
                <Badge key={item} variant="amber">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-2">
            {active.proof.map((item) => (
              <p
                className="rounded-md border border-null-border bg-black/35 px-3 py-2 font-mono text-xs text-null-muted"
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-5 p-5" data-animate>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-null-amber">
          resume.skills.cache
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-5">
          {Object.entries(technicalSkills).map(([label, values]) => (
            <div key={label}>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-null-muted">
                {label}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {values.map((value) => (
                  <Badge key={value}>{value}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </SectionFrame>
  );
}
