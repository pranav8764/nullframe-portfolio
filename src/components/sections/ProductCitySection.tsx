"use client";

import { projects, type Project } from "@/data/profile";
import { projectCityConfig } from "@/data/projectCityConfig";
import { Badge } from "@/components/ui/Badge";
import { StatusPill } from "@/components/ui/StatusPill";

type ProductCitySectionProps = {
  onOpenProject: (project: Project) => void;
};

const projectsById = new Map(projects.map((project) => [project.id, project]));
const cityProjects = projectCityConfig.flatMap((config) => {
  const project = projectsById.get(config.projectId);
  return project ? [project] : [];
});

export function ProductCitySection({ onOpenProject }: ProductCitySectionProps) {
  return (
    <section className="relative md:min-h-[560vh]" id="city">
      <div className="relative flex min-h-screen overflow-visible px-4 py-20 sm:px-6 md:sticky md:top-0 md:overflow-hidden lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_66%_52%,transparent_0%,transparent_58%,rgba(5,5,5,0.42)_86%,#050505_100%)]" />

        <div className="sr-only">
          <p>NullFrame product campus. Project names are attached to their buildings. Select a building to open its project journey.</p>
          <ul>
            {cityProjects.map((project) => (
              <li key={`sr-${project.id}`}>
                {project.buildingName}: {project.name}. Status: {project.status}. {project.compactDescription}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 grid w-full gap-3 self-start md:hidden">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-null-amber">
            cinematic.city
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-null-text">
            NullFrame product campus.
          </h2>
          <p className="text-base leading-7 text-null-muted">
            Mobile uses simplified project journey cards while the 3D city stays lightweight.
          </p>
          <StatusPill status="mobile.scene: simplified" />
          {cityProjects.map((project) => (
            <button
              className="glass-noise rounded-lg border border-null-border bg-null-card/72 p-4 text-left backdrop-blur-xl transition hover:border-null-amber/70"
              data-testid={`mobile-journey-${project.id}`}
              key={project.id}
              type="button"
              onClick={() => onOpenProject(project)}
            >
              <span className="relative z-10 block">
                <span className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-null-amber">
                  {project.buildingName}
                </span>
                <span className="mt-2 block text-base font-semibold text-null-text">
                  {project.name}
                </span>
                <span className="mt-3 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((stack) => (
                    <Badge key={stack}>{stack}</Badge>
                  ))}
                </span>
              </span>
            </button>
          ))}
          <p className="rounded-md border border-null-border bg-black/45 px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.16em] text-null-muted">
            Scroll for full engineering cards
          </p>
        </div>
      </div>
    </section>
  );
}
