import { FileDown } from "lucide-react";
import { profile } from "@/data/profile";
import { LinkButton } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { TerminalText } from "@/components/ui/TerminalText";

export function ResumeCard() {
  return (
    <SectionFrame
      description="The attached resume is available as a real public file path in this app."
      eyebrow="resume.file"
      id="resume"
      title="System file card."
    >
      <GlassCard className="grid gap-6 p-6 md:grid-cols-[1fr_auto]" data-animate>
        <TerminalText
          lines={[
            "file.detected: pranav_resume.pdf",
            "type: engineer_profile",
            "status: verified",
            "risk: recruiter_may_read"
          ]}
        />
        <div className="flex items-center md:justify-end">
          <LinkButton href={profile.resumePath} variant="primary">
            Download Resume <FileDown size={15} />
          </LinkButton>
        </div>
      </GlassCard>
    </SectionFrame>
  );
}
