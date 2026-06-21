"use client";

import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/profile";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Modal } from "@/components/ui/Modal";
import { StatusPill } from "@/components/ui/StatusPill";
import { TerminalText } from "@/components/ui/TerminalText";

type ProjectEngineeringModalProps = {
  project: Project | null;
  onClose: () => void;
};

function DataList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-null-amber">
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-null-muted">
        {items.map((item) => (
          <li className="border-l border-null-border pl-3" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HolographicArchitecture({ project }: { project: Project }) {
  const nodes = ["Client", "Gateway", "Realtime / Queue", "Worker", "DB / Cache"];

  return (
    <div className="architecture-grid relative min-h-[300px] overflow-hidden rounded-lg border border-null-border bg-black/45 p-4">
      <div className="absolute inset-x-0 top-1/2 h-px bg-null-amber/35" />
      <div className="relative grid h-full min-h-[260px] grid-cols-1 items-center gap-3 sm:grid-cols-5">
        {nodes.map((node, index) => (
          <div
            className="relative rounded-lg border border-null-amber/40 bg-null-card/80 p-4 text-center shadow-[0_0_28px_rgba(245,158,11,0.12)]"
            key={node}
            style={{
              transform: `translateY(${index % 2 === 0 ? "-12px" : "14px"}) rotateX(8deg)`
            }}
          >
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-null-amber">
              service.{index + 1}
            </p>
            <p className="mt-2 text-sm font-semibold text-null-text">{node}</p>
            {index < nodes.length - 1 ? (
              <span className="absolute -right-4 top-1/2 hidden h-1 w-8 rounded-full bg-null-amber/60 shadow-[0_0_16px_rgba(245,158,11,0.5)] sm:block" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 left-3 right-3 rounded-md border border-null-border bg-black/70 p-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-null-muted">
        diagram.pattern: {project.name.toLowerCase().replaceAll(" ", ".")} |
        packets: animated | fault.boundary: visible
      </div>
    </div>
  );
}

export function ProjectEngineeringModal({
  project,
  onClose
}: ProjectEngineeringModalProps) {
  return (
    <Modal open={Boolean(project)} title={project?.name ?? ""} onClose={onClose}>
      {project ? (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={project.status} />
            {project.duration ? <Badge>{project.duration}</Badge> : null}
            {project.techStack.map((stack) => (
              <Badge key={stack}>{stack}</Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <LinkButton
              disabled={!project.githubUrl}
              href={project.githubUrl}
              rel="noreferrer"
              target="_blank"
              variant="primary"
            >
              GitHub <ExternalLink size={14} />
            </LinkButton>
            <LinkButton
              disabled={!project.liveUrl}
              href={project.liveUrl}
              rel="noreferrer"
              target="_blank"
            >
              Live Demo <ExternalLink size={14} />
            </LinkButton>
          </div>

          {project.sourceNote ? (
            <GlassCard className="border-null-amber/35 p-4">
              <p className="font-mono text-xs text-null-amber">
                source.note: {project.sourceNote}
              </p>
            </GlassCard>
          ) : null}

          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.4fr_0.9fr]">
            <div className="space-y-5">
              <GlassCard>
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-null-amber">
                  Metrics
                </h3>
                <div className="mt-4 space-y-2">
                  {project.metrics.map((metric) => (
                    <p
                      className="rounded-md border border-null-border bg-black/35 px-3 py-2 font-mono text-xs text-null-muted"
                      key={metric}
                    >
                      {metric}
                    </p>
                  ))}
                </div>
              </GlassCard>
              <GlassCard>
                <p className="text-sm leading-6 text-null-muted">{project.problem}</p>
              </GlassCard>
            </div>

            <HolographicArchitecture project={project} />

            <GlassCard>
              <DataList title="Constraints" items={project.constraints} />
            </GlassCard>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <GlassCard>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-null-amber">
                Architecture
              </h3>
              <p className="mt-3 text-sm leading-6 text-null-muted">
                {project.architecture}
              </p>
            </GlassCard>
            <GlassCard>
              <DataList title="System Design" items={project.systemDesign} />
            </GlassCard>
            {project.coreAlgorithms ? (
              <GlassCard>
                <DataList title="Core Algorithms" items={project.coreAlgorithms} />
              </GlassCard>
            ) : null}
            {project.persistenceStrategy ? (
              <GlassCard>
                <DataList title="Persistence" items={project.persistenceStrategy} />
              </GlassCard>
            ) : null}
            {project.scalingApproach ? (
              <GlassCard>
                <DataList title="Scaling" items={project.scalingApproach} />
              </GlassCard>
            ) : null}
            <GlassCard>
              <DataList title="Failure Handling" items={project.failureHandling} />
            </GlassCard>
            <GlassCard>
              <DataList title="Tradeoffs" items={project.tradeoffs} />
            </GlassCard>
            <GlassCard>
              <DataList title="Measured Impact" items={project.measuredImpact} />
            </GlassCard>
            <GlassCard>
              <DataList title="Improve Next" items={project.improvements} />
            </GlassCard>
          </div>

          <TerminalText lines={project.logs} caret />
        </div>
      ) : null}
    </Modal>
  );
}
