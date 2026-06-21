import { cn } from "@/lib/cn";

type TerminalTextProps = {
  lines: string[];
  className?: string;
  caret?: boolean;
};

export function TerminalText({
  lines,
  className,
  caret = false
}: TerminalTextProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-null-border bg-black/55 p-4 font-mono text-xs leading-6 text-null-muted",
        className
      )}
    >
      {lines.map((line, index) => (
        <p
          className={index === lines.length - 1 && caret ? "terminal-caret" : ""}
          key={`${line}-${index}`}
        >
          <span className="text-null-amber">[{String(index + 1).padStart(2, "0")}]</span>{" "}
          {line}
        </p>
      ))}
    </div>
  );
}
