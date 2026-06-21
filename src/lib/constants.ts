export const STATUS_MESSAGES = [
  "optimism: rejected",
  "architecture: holding",
  "chaos: contained",
  "logs: more reliable than opinions",
  "fragile.software: quarantined"
] as const;

export const SCROLL_STATES = [
  { max: 0.08, text: "boot: loading | signal: corrupted" },
  { max: 0.1, text: "boot: complete | section: monolith" },
  { max: 0.56, text: "city: online | projects: indexed" },
  { max: 0.72, text: "core: stable | modules: active" },
  { max: 0.92, text: "github: synced | resume: verified" },
  { max: 1, text: "contact: available | session: complete" }
] as const;
