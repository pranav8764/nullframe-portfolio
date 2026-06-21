import { projects } from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { StatusPill } from "@/components/ui/StatusPill";

export function ProductCitySection() {
  return (
    <SectionFrame
      description="Dark glass towers, amber warning lines, and product modules powered by one core architecture."
      eyebrow="city.online"
      id="city"
      title="NullFrame Core powers the product city."
    >
      <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <GlassCard className="p-6" data-animate>
          <StatusPill status="core.reactor: stable" />
          <h3 className="mt-5 text-3xl font-semibold">NullFrame Systems</h3>
          <p className="mt-4 text-sm leading-7 text-null-muted">
            Products built from architecture, not optimism. The 3D scene turns the
            monolith into a city because the work is not a pile of cards. It is a
            connected system: realtime, data, AI, security, and product layers sharing
            the same warning-lit grid.
          </p>
        </GlassCard>
        <div
          className="relative min-h-[460px] overflow-hidden rounded-lg border border-null-amber/25 bg-transparent sm:min-h-[560px]"
          data-animate
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_0%,transparent_38%,rgba(5,5,5,0.42)_82%)]" />
          <div className="absolute left-4 top-4 rounded-md border border-null-border bg-black/55 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-null-amber backdrop-blur">
            camera: aerial.flyover
          </div>
          <div className="absolute bottom-4 right-4 rounded-md border border-null-border bg-black/55 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-null-muted backdrop-blur">
            buildings: powered.together
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-animate>
        {projects.map((project) => (
          <GlassCard className="p-4" interactive key={project.id}>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-null-amber">
              {project.buildingName}
            </p>
            <p className="mt-2 text-sm font-semibold text-null-text">{project.name}</p>
            <p className="mt-2 text-xs leading-5 text-null-muted">{project.status}</p>
          </GlassCard>
        ))}
      </div>
    </SectionFrame>
  );
}
