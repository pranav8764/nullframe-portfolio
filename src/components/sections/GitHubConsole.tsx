import { githubRepos } from "@/data/profile";
import { LinkButton } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { TerminalText } from "@/components/ui/TerminalText";

export function GitHubConsole() {
  const lines = [
    "github.sync: active",
    ...githubRepos.map((repo) => `[repo.scan] ${repo.repo} indexed`),
    "[signal] realtime systems detected",
    "[signal] security layer detected",
    "[signal] AI workflow detected",
    "[system.note] code exists. rare."
  ];

  return (
    <SectionFrame
      description="Static repo feed built from verified repository names. No stars, commits, dates, or invented activity."
      eyebrow="github.console"
      id="github"
      title="Repository activity console."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr]">
        <TerminalText className="min-h-[420px]" lines={lines} caret />
        <GlassCard className="p-5" data-animate>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-null-amber">
            repo.links
          </p>
          <div className="mt-5 space-y-3">
            {githubRepos.map((repo) => (
              <div
                className="flex items-center justify-between gap-3 rounded-md border border-null-border bg-black/30 p-3"
                key={repo.repo}
              >
                <div>
                  <p className="text-sm font-semibold">{repo.name}</p>
                  <p className="mt-1 font-mono text-[0.68rem] text-null-muted">
                    {repo.signal}
                  </p>
                </div>
                <LinkButton
                  disabled={!repo.url}
                  href={repo.url}
                  rel="noreferrer"
                  target="_blank"
                  variant="ghost"
                >
                  Open
                </LinkButton>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionFrame>
  );
}
