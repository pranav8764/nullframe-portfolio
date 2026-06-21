"use client";

import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/profile";
import { projects } from "@/data/profile";
import { Badge } from "@/components/ui/Badge";
import { Button, LinkButton } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { StatusPill } from "@/components/ui/StatusPill";

type ProjectsSectionProps = {
  onOpenProject: (project: Project) => void;
};

export function ProjectsSection({ onOpenProject }: ProjectsSectionProps) {
  return (
    <SectionFrame
      description="Compact previews stay readable during scroll. The deeper engineering dashboard opens only when requested."
      eyebrow="projects.indexed"
      id="projects"
      title="Product buildings with architecture inside."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <GlassCard
            className="flex min-h-[440px] flex-col p-5"
            data-animate
            data-testid={`project-card-${project.id}`}
            interactive
            key={project.id}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-null-amber">
                  {project.buildingName}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{project.name}</h3>
              </div>
              <StatusPill status={project.status} tone="muted" />
            </div>
            <p className="mt-4 text-sm leading-6 text-null-muted">
              {project.compactDescription}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.slice(0, 6).map((stack) => (
                <Badge key={stack}>{stack}</Badge>
              ))}
            </div>
            <div className="mt-5 space-y-2">
              {project.highlights.map((highlight) => (
                <p
                  className="rounded-md border border-null-border bg-black/30 px-3 py-2 font-mono text-xs text-null-muted"
                  key={highlight}
                >
                  {highlight}
                </p>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              <Button
                data-testid={`open-project-${project.id}`}
                onClick={() => onOpenProject(project)}
                variant="primary"
              >
                Open Engineering Breakdown
              </Button>
              <LinkButton
                disabled={!project.githubUrl}
                href={project.githubUrl}
                rel="noreferrer"
                target="_blank"
              >
                GitHub <ExternalLink size={14} />
              </LinkButton>
              {project.liveUrl ? (
                <LinkButton href={project.liveUrl} rel="noreferrer" target="_blank">
                  Live <ExternalLink size={14} />
                </LinkButton>
              ) : null}
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionFrame>
  );
}
