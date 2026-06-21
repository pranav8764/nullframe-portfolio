import type { Project } from "@/data/profile";

export type Vec3 = [number, number, number];

export type ProjectCityBuildingKind =
  | "collaborationHub"
  | "securityBastion"
  | "analysisTower"
  | "wellnessDome"
  | "clinicalWing"
  | "mobilityTerminal";

export type ProjectCityPalette = {
  accent: string;
  secondary: string;
  facade: string;
  facadeDark: string;
  glass: string;
  ground: string;
  lawn: string;
  road: string;
  roof: string;
  roofWarm: string;
};

export type ProjectCityConfig = {
  projectId: Project["id"];
  journeyId: Project["id"];
  buildingType: ProjectCityBuildingKind;
  position: Vec3;
  height: number;
  width: number;
  labelPosition: Vec3;
  palette: ProjectCityPalette;
  label: string;
  status: string;
};

export const projectCityConfig = [
  {
    projectId: "visync",
    journeyId: "visync",
    buildingType: "collaborationHub",
    position: [-3.15, 0, -0.75],
    height: 1.52,
    width: 0.74,
    labelPosition: [0, 0.98, -0.68],
    label: "Visync",
    status: "payload.reduction: 90%",
    palette: {
      accent: "#22d3ee",
      secondary: "#0891b2",
      facade: "#0a0f1d",
      facadeDark: "#020408",
      glass: "#67e8f9",
      ground: "#080d1a",
      lawn: "#062f22",
      road: "#020408",
      roof: "#1e293b",
      roofWarm: "#06b6d4"
    }
  },
  {
    projectId: "sentinelapi",
    journeyId: "sentinelapi",
    buildingType: "securityBastion",
    position: [-1.82, 0, 1.0],
    height: 1.74,
    width: 0.78,
    labelPosition: [0.12, 1.2, -0.68],
    label: "SentinelAPI",
    status: "attack.categories: 12",
    palette: {
      accent: "#facc15",
      secondary: "#f97316",
      facade: "#111827",
      facadeDark: "#030712",
      glass: "#374151",
      ground: "#0b0f19",
      lawn: "#0a2612",
      road: "#030408",
      roof: "#1f2937",
      roofWarm: "#fbbf24"
    }
  },
  {
    projectId: "job-match-analyzer",
    journeyId: "job-match-analyzer",
    buildingType: "analysisTower",
    position: [-0.28, 0, -1.28],
    height: 1.62,
    width: 0.72,
    labelPosition: [0, 1.08, -0.72],
    label: "Job Match Analyzer",
    status: "skills.weight: 40%",
    palette: {
      accent: "#a855f7",
      secondary: "#c084fc",
      facade: "#0f091c",
      facadeDark: "#05020a",
      glass: "#d8b4fe",
      ground: "#0a0614",
      lawn: "#1e1b4b",
      road: "#04020a",
      roof: "#1e1b4b",
      roofWarm: "#a855f7"
    }
  },
  {
    projectId: "mindbloom",
    journeyId: "mindbloom",
    buildingType: "wellnessDome",
    position: [1.15, 0, 1.02],
    height: 1.56,
    width: 0.76,
    labelPosition: [0.12, 1.08, -0.68],
    label: "MindBloom",
    status: "journals: tracked",
    palette: {
      accent: "#10b981",
      secondary: "#34d399",
      facade: "#04140f",
      facadeDark: "#010504",
      glass: "#6ee7b7",
      ground: "#020d09",
      lawn: "#064e3b",
      road: "#010403",
      roof: "#064e3b",
      roofWarm: "#10b981"
    }
  },
  {
    projectId: "dentalassistant",
    journeyId: "dentalassistant",
    buildingType: "clinicalWing",
    position: [2.45, 0, -1.02],
    height: 1.46,
    width: 0.73,
    labelPosition: [0, 1.02, -0.72],
    label: "DentalAssistant",
    status: "stack: needs confirmation",
    palette: {
      accent: "#e2e8f0",
      secondary: "#cbd5e1",
      facade: "#0f172a",
      facadeDark: "#020617",
      glass: "#94a3b8",
      ground: "#090d16",
      lawn: "#1e293b",
      road: "#02040a",
      roof: "#334155",
      roofWarm: "#cbd5e1"
    }
  },
  {
    projectId: "parkintel",
    journeyId: "parkintel",
    buildingType: "mobilityTerminal",
    position: [3.35, 0, 0.78],
    height: 1.54,
    width: 0.78,
    labelPosition: [0.1, 0.88, -0.72],
    label: "ParkIntel",
    status: "frontend: Next.js",
    palette: {
      accent: "#ff7b00",
      secondary: "#ff9500",
      facade: "#160f09",
      facadeDark: "#070402",
      glass: "#fecdd3",
      ground: "#120c07",
      lawn: "#291a0c",
      road: "#050302",
      roof: "#291a0c",
      roofWarm: "#ff7b00"
    }
  }
] as const satisfies readonly ProjectCityConfig[];
