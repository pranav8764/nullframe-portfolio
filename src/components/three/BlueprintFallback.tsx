"use client";

import { projects } from "@/data/profile";
import { projectCityConfig } from "@/data/projectCityConfig";

type BlueprintFallbackProps = {
  onOpenProject?: (project: any) => void;
};

export function BlueprintFallback({ onOpenProject }: BlueprintFallbackProps) {
  const projectsById = new Map(projects.map((project) => [project.id, project]));
  const cityProjects = projectCityConfig.flatMap((config) => {
    const project = projectsById.get(config.projectId);
    return project ? [{ config, project }] : [];
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-null-black p-4 sm:p-8">
      <div className="architecture-grid relative w-full max-w-5xl aspect-video rounded-lg border border-null-border bg-black/40 p-4 shadow-2xl sm:p-8">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.4), transparent 60%)' }} />
        
        <h3 className="absolute top-4 left-4 font-mono text-xs uppercase tracking-[0.2em] text-null-amber">
          NullFrame City: 2D Blueprint Mode
        </h3>

        <div className="relative h-full w-full">
          {cityProjects.map(({ config, project }, index) => {
            // Map 3D positions to 2D percentages approx.
            // X goes from -5 to 5 roughly. Z from -5 to 5.
            const xPercent = ((config.position[0] + 5) / 10) * 100;
            const yPercent = ((config.position[2] + 5) / 10) * 100;

            return (
              <button
                key={project.id}
                className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-null-amber"
                style={{
                  left: `${Math.max(10, Math.min(90, xPercent))}%`,
                  top: `${Math.max(20, Math.min(80, yPercent))}%`,
                }}
                onClick={() => onOpenProject?.(project)}
                type="button"
                aria-label={`Open ${project.name} details`}
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-8 w-8 animate-ping rounded-full border border-null-amber opacity-20" />
                  <div className="h-4 w-4 rounded-full border border-null-amber bg-black shadow-[0_0_12px_rgba(245,158,11,0.5)] group-hover:bg-null-amber/20 transition-colors" />
                </div>
                
                <div className="mt-2 w-32 rounded border border-null-border bg-black/80 px-2 py-1.5 text-center backdrop-blur-md transition-transform group-hover:-translate-y-1 group-hover:border-null-amber/50">
                  <p className="font-mono text-[0.6rem] uppercase tracking-wider text-null-amber">
                    {project.buildingName}
                  </p>
                  <p className="mt-0.5 truncate text-[0.7rem] font-bold text-null-text">
                    {project.name}
                  </p>
                  <p className="mt-0.5 text-[0.55rem] uppercase text-null-muted opacity-80">
                    {config.status}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
