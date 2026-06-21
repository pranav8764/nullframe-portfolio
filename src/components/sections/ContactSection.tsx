import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { LinkButton } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { TerminalText } from "@/components/ui/TerminalText";

export function ContactSection() {
  return (
    <SectionFrame
      className="pb-32"
      description="Building backend-heavy products, AI workflows, and systems that survive production."
      eyebrow="connect.terminal"
      id="contact"
      title="connect --with pranav"
    >
      <GlassCard className="p-6" data-animate>
        <TerminalText
          lines={[
            "status: available_for_backend_internships",
            "mode: building_systems",
            "noise: filtered",
            "If the architecture held your attention, the engineer is available."
          ]}
          caret
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href={`mailto:${profile.email}`} variant="primary">
            Email <Mail size={15} />
          </LinkButton>
          <LinkButton href={`tel:${profile.phone.replaceAll(" ", "")}`}>
            Phone <Phone size={15} />
          </LinkButton>
          <LinkButton href={profile.github} rel="noreferrer" target="_blank">
            GitHub <Github size={15} />
          </LinkButton>
          {profile.linkedin ? (
            <LinkButton href={profile.linkedin} rel="noreferrer" target="_blank">
              LinkedIn <Linkedin size={15} />
            </LinkButton>
          ) : null}
          {profile.leetcode ? (
            <LinkButton href={profile.leetcode} rel="noreferrer" target="_blank">
              LeetCode
            </LinkButton>
          ) : null}
        </div>
      </GlassCard>
      
      <div className="mt-16 text-center">
        <p className="text-xs text-null-muted/60">
          Built with accessibility in mind. Respects reduced motion, high contrast needs, and screen reader navigation.{" "}
          <button className="underline hover:text-null-amber" type="button" onClick={() => alert("Accessibility Statement: NullFrame Systems is committed to inclusive design, providing a 2D fallback for WebGL content, maintaining AA contrast ratios, supporting reduced motion preferences, and adhering to ARIA semantics.")}>
            View Accessibility Statement
          </button>
        </p>
      </div>
    </SectionFrame>
  );
}
