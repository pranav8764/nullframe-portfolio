"use client";

import { ArrowDown, Github, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Button, LinkButton } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";

type HeroSectionProps = {
  onInspect: () => void;
};

export function HeroSection({ onInspect }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden" id="monolith">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent,rgba(0,0,0,0.68)_62%,#050505_100%)]" />
      <div className="relative z-10 flex min-h-screen items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl" data-animate>
            <StatusPill status="NullFrame Systems booted" />
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-null-text sm:text-7xl lg:text-8xl">
              {profile.name}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-null-text sm:text-2xl">
              {profile.heroLine}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-null-muted sm:text-lg">
              {profile.identity}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={onInspect} variant="primary">
                Inspect Systems <ArrowDown size={15} />
              </Button>
              <LinkButton href={profile.resumePath} variant="secondary">
                Download Resume
              </LinkButton>
              <LinkButton href={`mailto:${profile.email}`} variant="ghost">
                Connect <Mail size={15} />
              </LinkButton>
              <LinkButton
                aria-label="Open GitHub profile"
                href={profile.github}
                rel="noreferrer"
                target="_blank"
                variant="ghost"
              >
                GitHub <Github size={15} />
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
