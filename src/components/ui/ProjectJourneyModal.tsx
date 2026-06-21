"use client";

import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/profile";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Modal } from "@/components/ui/Modal";
import { StatusPill } from "@/components/ui/StatusPill";
import { TerminalText } from "@/components/ui/TerminalText";

type ProjectJourneyModalProps = {
  project: Project | null;
  onClose: () => void;
};

const defaultChapters = [
  {
    label: "origin",
    title: "Why this project started",
    body: "Journey draft coming soon."
  },
  {
    label: "build",
    title: "The architecture turn",
    body: "Journey draft coming soon."
  },
  {
    label: "failure",
    title: "The hardest failure mode",
    body: "Journey draft coming soon."
  },
  {
    label: "next",
    title: "Where the project goes next",
    body: "Journey draft coming soon."
  }
];

export function ProjectJourneyModal({ project, onClose }: ProjectJourneyModalProps) {
  const chapters = project?.journey?.chapters ?? defaultChapters;

  return (
    <Modal
      className="max-w-5xl"
      closeLabel="Close project journey"
      closeTestId="journey-modal-close"
      eyebrow="project.journey"
      open={Boolean(project)}
      title={project?.buildingName ?? ""}
      onClose={onClose}
    >
      {project ? (
        <div className="space-y-5" data-testid={`journey-modal-${project.id}`}>
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={project.journey?.status ?? "journey.copy: pending"} />
            <Badge variant="amber">{project.name}</Badge>
            {project.duration ? <Badge>{project.duration}</Badge> : null}
          </div>

          <GlassCard className="p-5">
            <p className="text-base leading-7 text-null-muted">
              {project.journey?.intro ??
                "Journey draft coming soon. Detailed product narrative and technical design breakdown are currently being finalized."}
            </p>
          </GlassCard>

          <div className="grid gap-4 md:grid-cols-2">
            {chapters.map((chapter, index) => (
              <GlassCard className="p-5" interactive key={`${chapter.label}-${index}`}>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-null-amber">
                  {String(index + 1).padStart(2, "0")}.{chapter.label}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-null-text">
                  {chapter.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-null-muted">{chapter.body}</p>
              </GlassCard>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
            <GlassCard className="p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-null-amber">
                verified.signals
              </p>
              <div className="mt-4 grid gap-2">
                {project.highlights.map((highlight) => (
                  <p
                    className="rounded-md border border-null-border bg-black/35 px-3 py-2 font-mono text-xs text-null-muted"
                    key={highlight}
                  >
                    {highlight}
                  </p>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-null-amber">
                open.source
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
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
                <p className="mt-4 font-mono text-xs leading-5 text-null-muted">
                  source.note: {project.sourceNote}
                </p>
              ) : null}
            </GlassCard>
          </div>

          <TerminalText
            lines={[
              `tower.selected: ${project.buildingName}`,
              "journey.editor: awaiting_pranav_copy",
              "popup.status: functional"
            ]}
            caret
          />
        </div>
      ) : null}
    </Modal>
  );
}
