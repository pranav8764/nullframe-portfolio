"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Project } from "@/data/profile";
import { ProjectEngineeringModal } from "@/components/ui/ProjectEngineeringModal";
import { ProjectJourneyModal } from "@/components/ui/ProjectJourneyModal";
import { SystemStatusBar } from "@/components/layout/SystemStatusBar";
import { BootScreen } from "@/components/sections/BootScreen";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationModule } from "@/components/sections/EducationModule";
import { ExperienceModule } from "@/components/sections/ExperienceModule";
import { GitHubConsole } from "@/components/sections/GitHubConsole";
import { HeroSection } from "@/components/sections/HeroSection";
import { LeadershipModule } from "@/components/sections/LeadershipModule";
import { MissionSection } from "@/components/sections/MissionSection";
import { ProductCitySection } from "@/components/sections/ProductCitySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ResumeCard } from "@/components/sections/ResumeCard";
import { SkillsDashboard } from "@/components/sections/SkillsDashboard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSceneProgress } from "@/hooks/useScrollProgress";

const SceneCanvas = dynamic(
  () => import("@/components/three/SceneCanvas").then((module) => module.SceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-null-black">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-null-muted">
          3D system initializing
        </p>
      </div>
    )
  }
);

export function PortfolioExperience() {
  const progress = useSceneProgress();
  const reducedMotion = useReducedMotion();
  const [bootVisible, setBootVisible] = useState(true);
  const [staticMode, setStaticMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedJourneyProject, setSelectedJourneyProject] = useState<Project | null>(
    null
  );
  const [cityLabelPortal, setCityLabelPortal] = useState<HTMLDivElement | null>(null);
  const cityLabelPortalRef = useMemo(
    () => ({ current: cityLabelPortal }),
    [cityLabelPortal]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setBootVisible(false), 3400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      document.querySelectorAll<HTMLElement>("[data-animate]").forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((element) => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true
          }
        });
      });
    });

    return () => context.revert();
  }, [reducedMotion]);

  const inspectSystems = useCallback(() => {
    document.getElementById("systems")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <BootScreen visible={bootVisible} onSkip={() => setBootVisible(false)} />
      <div
        aria-hidden="true"
        className="fixed inset-0 overflow-hidden"
        style={{
          zIndex: progress.cityProgress > 0.05 && progress.cityProgress < 0.95 ? 20 : 0,
          pointerEvents: progress.cityProgress > 0.05 && progress.cityProgress < 0.95 ? 'auto' : 'none'
        }}
      >
        <SceneCanvas
          htmlPortal={cityLabelPortalRef}
          progress={progress}
          staticMode={staticMode}
          onOpenProject={setSelectedJourneyProject}
        />
      </div>
      <div className="fixed right-4 top-4 z-50">
        <button
          className="rounded-full border border-null-border bg-black/60 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-null-muted backdrop-blur-md transition hover:border-null-amber hover:text-null-amber"
          type="button"
          onClick={() => setStaticMode((prev) => !prev)}
        >
          {staticMode ? "Enable 3D" : "Static Mode"}
        </button>
      </div>
      <main className="relative z-10">
        <HeroSection onInspect={inspectSystems} />
        <MissionSection />
        <ProductCitySection onOpenProject={setSelectedJourneyProject} />
        <SkillsDashboard />
        <ExperienceModule />
        <ProjectsSection onOpenProject={setSelectedProject} />
        <EducationModule />
        <LeadershipModule />
        <GitHubConsole />
        <ResumeCard />
        <ContactSection />
      </main>
      <div
        aria-label="Project journey tower labels"
        className="fixed inset-0 z-30"
        style={{ pointerEvents: 'none' }}
        ref={setCityLabelPortal}
      />
      <ProjectEngineeringModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <ProjectJourneyModal
        project={selectedJourneyProject}
        onClose={() => setSelectedJourneyProject(null)}
      />
      <SystemStatusBar progress={progress.pageProgress} visible={!bootVisible} />
    </>
  );
}
