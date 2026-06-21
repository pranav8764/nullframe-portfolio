export type Project = {
  id: string;
  name: string;
  buildingName: string;
  duration?: string;
  status: string;
  description: string;
  compactDescription: string;
  techStack: string[];
  highlights: string[];
  metrics: string[];
  problem: string;
  constraints: string[];
  architecture: string;
  systemDesign: string[];
  dataModel?: string[];
  coreAlgorithms?: string[];
  concurrencyModel?: string[];
  persistenceStrategy?: string[];
  scalingApproach?: string[];
  failureHandling: string[];
  tradeoffs: string[];
  measuredImpact: string[];
  improvements: string[];
  logs: string[];
  githubUrl?: string;
  liveUrl?: string;
  sourceNote?: string;
  journey?: ProjectJourney;
};

export type ProjectJourney = {
  status: string;
  intro: string;
  chapters: Array<{
    label: string;
    title: string;
    body: string;
  }>;
};

export type SkillModule = {
  id: string;
  name: string;
  status: string;
  tools: string[];
  evidence: string[];
  proof: string[];
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  duration: string;
  status: string;
  mode: string;
  pipeline: string[];
  proofMetrics: string[];
  logs: string[];
  details: string[];
};

export type Education = {
  institution: string;
  program: string;
  score: string;
  timeline: string;
  status: string;
  signal?: string;
};

export type Leadership = {
  module: string;
  role: string;
  institution: string;
  timeline: string;
  summary: string;
  metrics: string[];
};

export type GitHubRepo = {
  name: string;
  repo: string;
  url?: string;
  signal: string;
};

export const profile = {
  name: "Pranav Singh Rajoria",
  worldName: "NullFrame Systems",
  tagline: "Products built from architecture, not optimism.",
  heroLine: "I replace chaos with architecture. Occasionally, it even scales.",
  mission:
    "I prefer systems over noise, architecture over chaos, and logs over opinions.",
  identity:
    "Backend-focused engineer building scalable systems, realtime infrastructure, AI workflows, and security platforms.",
  focus: "Backend. AI. Realtime. Security.",
  email: "pranavrajoria1@gmail.com",
  phone: "+91 8764078632",
  github: "https://github.com/pranav8764",
  resumePath: "/resume.pdf",
  linkedin: "https://www.linkedin.com/in/pranav-singh-rajoria-05a407314/",
  leetcode: "https://leetcode.com/u/pranav8764/"
};

export const projects: Project[] = [
  {
    id: "visync",
    name: "Visync",
    buildingName: "Visync Tower",
    duration: "April 2026 - May 2026",
    status: "realtime.sync: active",
    description:
      "Realtime collaborative whiteboard for teams, interviews, teaching, and visual collaboration.",
    compactDescription:
      "Realtime collaborative whiteboard with compact event persistence and fast board loads.",
    techStack: [
      "Spring Boot",
      "SockJS",
      "Next.js",
      "Konva.js",
      "PostgreSQL",
      "Redis"
    ],
    highlights: [
      "90% network payload reduction",
      "95% stored-row reduction",
      "<150ms board load time"
    ],
    metrics: [
      "payload.reduction: 90%",
      "stored.rows: -95%",
      "load.time: <150ms"
    ],
    problem:
      "Realtime collaborative whiteboards are hard because many users draw at once, clients have different screen sizes, and every stroke must sync without breaking board consistency.",
    constraints: [
      "Many users can draw in one room at the same time.",
      "Canvas coordinates must remain stable across screen sizes.",
      "Persistence cannot turn every stroke into unbounded database pressure."
    ],
    architecture:
      "A Next.js and Konva.js canvas emits drawing events through SockJS/WebSocket into a Spring Boot backend. Room events are dispatched with ConcurrentHashMap routing, while bounded ThreadPoolExecutor backpressure protects database writes. PostgreSQL stores compacted JSONB snapshots and drawing events.",
    systemDesign: [
      "Server-authoritative board state",
      "Room-based WebSocket routing",
      "Event stream for drawing activity",
      "Snapshot compaction for board loading",
      "Infinite virtual coordinate system using absolute world pixels",
      "Viewport inverse projection for resolution independence"
    ],
    coreAlgorithms: [
      "Client-side Ramer-Douglas-Peucker path simplification",
      "Scheduled 10-second flushes into JSONB BoardSnapshot",
      "Synchronized undo and redo across room state"
    ],
    concurrencyModel: [
      "ConcurrentHashMap room dispatch",
      "Bounded ThreadPoolExecutor write pressure",
      "Atomic WebSocket session cleanup"
    ],
    persistenceStrategy: [
      "Event stream for recent activity",
      "Compacted JSONB snapshot for fast load",
      "Scheduled merge path for DrawingEvent rows"
    ],
    scalingApproach: [
      "Reduce payload before it reaches the server",
      "Batch persistence work",
      "Keep load path snapshot-first"
    ],
    failureHandling: [
      "Backpressure protects database stability",
      "Session cleanup avoids stale connections",
      "Exponential backoff reconnection protects interrupted clients"
    ],
    tradeoffs: [
      "Snapshot compaction reduces load time but requires careful consistency handling.",
      "Event batching improves persistence efficiency but makes undo and redo more complex.",
      "WebSocket and SockJS improve reachability, while fallback transports can increase server load."
    ],
    measuredImpact: [
      "Reduced network payload by 90%",
      "Reduced stored drawing rows by approximately 95%",
      "Loaded boards in under 150ms"
    ],
    improvements: [
      "Add collaborative cursor presence",
      "Add CRDT-based merge strategy for complex offline edits",
      "Add observability dashboard for room traffic and snapshot timing"
    ],
    logs: [
      "room.dispatch: stable",
      "snapshot.flush: 10s cadence",
      "payload.noise: stripped",
      "undo.redo: synchronized"
    ],
    githubUrl: "https://github.com/pranav8764/Visync"
  },
  {
    id: "sentinelapi",
    name: "SentinelAPI",
    buildingName: "SentinelAPI Firewall District",
    duration: "January 2026 - February 2026",
    status: "threat.scan: online",
    description:
      "API vulnerability scanner and realtime security monitoring dashboard.",
    compactDescription:
      "Security scanner with middleware hardening, threat patterns, and live monitoring.",
    techStack: ["Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    highlights: [
      "Covered 12 attack categories",
      "40+ regex threat patterns",
      "1,000+ concurrent realtime connections"
    ],
    metrics: [
      "attack.categories: 12",
      "threat.patterns: 40+",
      "connections: 1,000+"
    ],
    problem:
      "APIs need automated vulnerability scanning and realtime visibility into risky requests, auth issues, injection attempts, and security headers.",
    constraints: [
      "Security checks must remain fast enough for request-time visibility.",
      "Realtime monitoring needs rate limiting to avoid becoming the bottleneck.",
      "Headers and scanner modules must remain configurable per deployment."
    ],
    architecture:
      "A Node.js and Express backend runs scanning middleware, stores MongoDB configuration, streams events through Socket.io, authenticates with JWT, and produces live dashboard updates.",
    systemDesign: [
      "Vulnerability scan engine",
      "Security middleware chain",
      "Threat pattern matching",
      "Realtime event stream",
      "Risk scoring report generator",
      "Multi-tier rate limiter"
    ],
    coreAlgorithms: [
      "Regex-based payload classification",
      "Weighted risk scoring",
      "Recursive NoSQL operator sanitization"
    ],
    persistenceStrategy: [
      "MongoDB configuration storage",
      "Hot-reloadable scanner settings",
      "Report records with OWASP and CWE mappings"
    ],
    scalingApproach: [
      "Sub-50ms realtime monitoring path",
      "1,000+ concurrent Socket.io connection support",
      "Tiered request budgets for auth and API routes"
    ],
    failureHandling: [
      "Hot-reloadable MongoDB configuration",
      "Severity classification",
      "Rate limiting",
      "Fallback handling for scanner modules"
    ],
    tradeoffs: [
      "Regex-based threat patterns are fast but cannot replace deep semantic analysis.",
      "Realtime streaming improves visibility but requires careful rate limiting.",
      "Security headers help harden APIs but must remain configurable per deployment."
    ],
    measuredImpact: [
      "Supported 1,000+ concurrent Socket.io connections",
      "Sub-50ms latency for realtime monitoring",
      "Multi-tier rate limiting: 5 requests per 15 minutes for auth and 100 requests per minute for API"
    ],
    improvements: [
      "Add passive scanner mode",
      "Add attack replay sandbox",
      "Add CI/CD integration for API security checks"
    ],
    logs: [
      "risk.engine: armed",
      "nosql.sanitizer: recursive",
      "headers.hardened: csp hsts frame-options",
      "rate.limit: active"
    ],
    githubUrl: "https://github.com/pranav8764/SentinelAPI"
  },
  {
    id: "job-match-analyzer",
    name: "Job Match Analyzer",
    buildingName: "Job Match Analyzer AI Lab",
    duration: "March 2026",
    status: "llm.suggestions: ready",
    description: "AI-powered job matching and resume analysis platform.",
    compactDescription:
      "Resume-to-job matching platform with explainable scoring and LLM suggestions.",
    techStack: [
      "React.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Groq Llama 3.3 70B",
      "Puppeteer"
    ],
    highlights: [
      "Weighted scoring engine",
      "500+ synonym dictionary",
      "Platform-specific job scrapers"
    ],
    metrics: [
      "skills.weight: 40%",
      "experience.weight: 30%",
      "synonyms: 500+"
    ],
    problem:
      "Candidates struggle to understand how well their resume matches a job description and what should be improved for ATS compatibility.",
    constraints: [
      "Scoring must be explainable.",
      "Job pages can be JavaScript-rendered and platform-specific.",
      "LLM output needs guardrails and structured prompts."
    ],
    architecture:
      "React frontend, Node.js/Express backend, MongoDB persistence, Puppeteer scraping, and Groq Llama 3.3 70B for targeted resume suggestions.",
    systemDesign: [
      "Resume parser",
      "Job scraper",
      "Weighted matcher",
      "LLM suggestion engine",
      "Analysis history storage",
      "Platform-specific career page parsers"
    ],
    coreAlgorithms: [
      "Weighted score: skills 40%, experience 30%, education 15%, responsibilities 15%",
      "Fuzzy matching",
      "500+ synonym dictionary",
      "Property-based tests using fast-check"
    ],
    persistenceStrategy: [
      "MongoDB analysis history",
      "Independent backend services for scraper, matcher, LLM, and PDF parser"
    ],
    scalingApproach: [
      "Service isolation for failure containment",
      "Platform-specific parser fallbacks",
      "Separated scraper, matcher, LLM, and PDF parsing modules"
    ],
    failureHandling: [
      "Platform-specific fallback parsers",
      "Service isolation",
      "Stored analysis history"
    ],
    tradeoffs: [
      "Weighted scoring is explainable but may miss nuanced job fit.",
      "LLM suggestions add value but require guardrails and structured prompts.",
      "Scraping JavaScript-rendered pages improves coverage but adds reliability complexity."
    ],
    measuredImpact: [
      "Weighted matching across skills, experience, education, and responsibilities",
      "500+ synonym dictionary",
      "Puppeteer parsers for Greenhouse, Lever, and Ashby"
    ],
    improvements: [
      "Add authenticated user profiles",
      "Add versioned resume comparison",
      "Add recruiter-style recommendation explanations"
    ],
    logs: [
      "resume.parsed: true",
      "score.generated: true",
      "llm.guardrails: structured",
      "scraper.fallbacks: platform-aware"
    ],
    githubUrl: "https://github.com/pranav8764/HireFT-Assignment"
  },
  {
    id: "mindbloom",
    name: "MindBloom",
    buildingName: "MindBloom Wellness Hub",
    status: "rooms: realtime",
    description: "Mental wellness and gamified journaling platform.",
    compactDescription:
      "Gamified mental health tracker with journaling, challenges, progress dashboards, and realtime rooms.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Clerk",
      "Zustand",
      "Chart.js",
      "Socket.io",
      "Node.js",
      "Express",
      "MongoDB"
    ],
    highlights: [
      "Journaling and mood tracking",
      "Challenges and achievements",
      "Realtime challenge rooms"
    ],
    metrics: [
      "journals: tracked",
      "challenge.rooms: realtime",
      "xp.system: active"
    ],
    problem:
      "Users need a wellness platform that makes journaling, challenges, progress tracking, and community interaction more engaging.",
    constraints: [
      "Wellness gamification should support engagement without trivializing mental health.",
      "Realtime community rooms need auth, validation, and moderation-minded boundaries.",
      "Progress dashboards must remain clear and private."
    ],
    architecture:
      "A React/Vite frontend connects to Node.js and Express APIs, MongoDB/Mongoose persistence, JWT authentication, and Socket.io realtime challenge rooms.",
    systemDesign: [
      "User module",
      "Journal module",
      "Mood analytics",
      "Challenge module",
      "Achievement module",
      "XP and progress system",
      "Realtime room interactions"
    ],
    persistenceStrategy: [
      "MongoDB schemas for users, journals, achievements, and challenges",
      "API service layer for frontend data access"
    ],
    scalingApproach: [
      "Separate frontend and server packages",
      "Socket.io rooms for challenge interactions",
      "Optimistic UI updates for user actions"
    ],
    failureHandling: [
      "Authentication and input validation",
      "Server error handling",
      "Client loading and error states"
    ],
    tradeoffs: [
      "Gamification improves engagement but must not make wellness feel artificial.",
      "Realtime rooms improve community but need moderation and security controls."
    ],
    measuredImpact: [
      "Daily logs and habit tracking",
      "JWT authentication",
      "Visual progress dashboard"
    ],
    improvements: [
      "Add better analytics",
      "Add privacy-first local encryption options",
      "Add better achievement balancing"
    ],
    logs: [
      "journal.module: active",
      "mood.trends: indexed",
      "challenge.rooms: online",
      "xp.loop: calibrated"
    ],
    githubUrl: "https://github.com/pranav8764/MIndBloom1",
    sourceNote: "GitHub repository is named pranav8764/MIndBloom1."
  },
  {
    id: "dentalassistant",
    name: "DentalAssistant",
    buildingName: "DentalAssistant Clinical AI Wing",
    status: "verification: pending",
    description:
      "Domain-specific dental assistant exploration for clinical workflows and data-driven answers.",
    compactDescription:
      "Dental clinic assistant concept for workflow, reports, appointments, and database-backed assistance.",
    techStack: ["Stack verification pending"],
    highlights: [
      "Dental domain AI exploration",
      "Assistant-style workflow",
      "Useful candidate for future productization"
    ],
    metrics: [
      "stack: needs confirmation",
      "features: needs confirmation",
      "demo: needs confirmation"
    ],
    problem:
      "Dental clinics need assistance flows that can connect operational data, patient-facing work, and answers without inventing medical context.",
    constraints: [
      "Stack details are waiting for repository confirmation.",
      "Core feature list is waiting for a verified project note.",
      "Live/demo status is waiting for confirmation."
    ],
    architecture:
      "Positioned as an AI product exploration for dental clinic workflows, invoices, appointments, reports, and database-backed assistance. Implementation details are intentionally withheld until the repository content confirms them.",
    systemDesign: [
      "Data source map pending verification.",
      "Assistant workflow pending verification.",
      "Persistence model pending verification."
    ],
    failureHandling: ["Failure handling notes pending verification."],
    tradeoffs: [
      "The product direction is promising, but unverified implementation claims would be misleading."
    ],
    measuredImpact: ["Measured impact pending verification."],
    improvements: [
      "Confirm stack from repository or project notes",
      "Add verified architecture details",
      "Add verified demo status"
    ],
    logs: [
      "repo.detected: true",
      "dental.details: unconfirmed",
      "hallucination.filter: active"
    ],
    sourceNote:
      "GitHub repository exists, but accessible README content did not confirm the dental-assistant implementation details.",
    githubUrl: undefined
  },
  {
    id: "parkintel",
    name: "ParkIntel",
    buildingName: "ParkIntel Urban Grid",
    status: "urban.grid: inferred",
    description: "Urban intelligence and illegal parking hotspot prediction system.",
    compactDescription:
      "Illegal parking hotspot predictor with a Next.js command center, Go REST API, ONNX inference, and PostgreSQL.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Go",
      "Gin",
      "GORM",
      "PostgreSQL",
      "ONNX Runtime",
      "LightGBM",
      "XGBoost",
      "RandomForest",
      "Leaflet",
      "SWR",
      "Docker Compose"
    ],
    highlights: [
      "Live-inferred ML predictions",
      "Go REST API backend",
      "Next.js command center"
    ],
    metrics: [
      "frontend: Next.js",
      "backend: Go REST API",
      "models: ONNX"
    ],
    problem:
      "Urban teams need a system that can identify illegal parking hotspots and support enforcement dispatch decisions.",
    constraints: [
      "Predictions must be served through a backend API.",
      "The system must coordinate frontend, backend, database, and model files.",
      "Large model binaries require careful repository and deployment handling."
    ],
    architecture:
      "A Next.js command center frontend connects to a Go REST API. The backend serves live-inferred predictions through ONNX Runtime models and uses PostgreSQL for storage. Docker Compose coordinates frontend, backend, and database services.",
    systemDesign: [
      "Next.js command center frontend",
      "Go REST API backend",
      "ONNX Runtime model serving",
      "LightGBM, XGBoost, and RandomForest models",
      "PostgreSQL database",
      "Docker Compose orchestration"
    ],
    persistenceStrategy: [
      "PostgreSQL database",
      "Schema-managed backend storage",
      "CSV ingestion referenced by repository README"
    ],
    scalingApproach: [
      "Containerized service boundaries",
      "Model files mounted into runtime containers",
      "Go backend serving prediction requests"
    ],
    failureHandling: [
      "Docker Compose health checks for database service",
      "Backend health endpoint referenced in README",
      "Environment-based ONNX runtime configuration"
    ],
    tradeoffs: [
      "ONNX model serving keeps inference near the API but increases runtime configuration complexity.",
      "Docker Compose improves reproducibility but requires container/runtime configuration.",
      "Large model binaries can complicate Git pushes and deployment flow."
    ],
    measuredImpact: [
      "End-to-end illegal parking hotspot prediction system",
      "Live-inferred model predictions",
      "Containerized frontend, backend, and database"
    ],
    improvements: [
      "Add public case-study screenshots once available",
      "Document model inputs and outputs in portfolio-safe language",
      "Add verified production/demo URL if deployed"
    ],
    logs: [
      "onnx.session: mounted",
      "go.api: serving",
      "postgres: healthy",
      "urban.signal: detected"
    ],
    githubUrl: "https://github.com/pranav8764/ParkIntel",
    liveUrl: "https://park-intel-one.vercel.app",
    sourceNote: "Verified from repository README."
  }
];

export const experience: Experience = {
  company: "HireFT",
  role: "Software Engineering Intern",
  location: "Remote",
  duration: "March 2026 - May 2026",
  status: "shipped",
  mode: "backend + AI workflows + cloud pipelines",
  pipeline: [
    "Workday Scraper",
    "Worker Pool",
    "PostgreSQL Deduplication",
    "AWS SQS Queue",
    "AWS S3 Storage",
    "Groq Resume / ATS Enrichment"
  ],
  proofMetrics: [
    "500K+ records processed",
    "Worker-pool scraping pipeline",
    "Caffeine caching",
    "REST APIs",
    "PDFBox hyperlink extraction",
    "S3 presigned uploads",
    "PostgreSQL deduplication",
    "SQS-driven enrichment queues"
  ],
  logs: [
    "worker.pool: active",
    "sqs.queue: processing",
    "deduplication: stable",
    "resume.pipeline: shipped",
    "redundant.lookups: eliminated",
    "architecture: holding"
  ],
  details: [
    "Built a concurrent job-scraping pipeline in Go that processed thousands of Workday ATS postings using worker pools, PostgreSQL deduplication, S3 storage, and SQS-driven enrichment queues.",
    "Designed and shipped a Groq-powered resume-generation pipeline with a two-call flow: extracting job requirements first, then scoring and tailoring resumes for ATS compatibility.",
    "Improved job-to-role matching accuracy across 500K+ records by adding staged role resolution with Caffeine caching and eliminating redundant database lookups.",
    "Built REST APIs for profile management, presigned S3 uploads, and auto-apply preferences.",
    "Added PDF hyperlink extraction using PDFBox with annotation and coordinate-based parsing."
  ]
};

export const skillModules: SkillModule[] = [
  {
    id: "backend",
    name: "Backend Core",
    status: "online",
    tools: ["Java", "Spring Boot", "Go", "Node.js", "Express.js"],
    evidence: ["Visync", "HireFT", "SentinelAPI", "Job Match Analyzer"],
    proof: [
      "REST APIs",
      "WebSocket routing",
      "worker-pool pipelines",
      "database-backed systems",
      "queue-based workflows",
      "auth/profile APIs",
      "caching and role resolution"
    ]
  },
  {
    id: "realtime",
    name: "Realtime Layer",
    status: "stable",
    tools: ["WebSockets", "SockJS", "Socket.io", "ConcurrentHashMap dispatch"],
    evidence: ["Visync", "SentinelAPI", "MindBloom"],
    proof: [
      "realtime drawing sync",
      "realtime traffic monitoring",
      "realtime rooms",
      "reconnection handling",
      "session cleanup"
    ]
  },
  {
    id: "ai",
    name: "AI Pipeline",
    status: "processing",
    tools: ["Groq", "LLM workflows", "resume scoring", "job analysis"],
    evidence: ["Job Match Analyzer", "HireFT", "DentalAssistant"],
    proof: [
      "resume generation pipeline",
      "LLM-based suggestions",
      "job requirement extraction",
      "ATS compatibility scoring",
      "domain assistant exploration"
    ]
  },
  {
    id: "security",
    name: "Security Layer",
    status: "armed",
    tools: ["JWT", "API security testing", "threat patterns", "rate limiting"],
    evidence: ["SentinelAPI"],
    proof: [
      "vulnerability scanner",
      "12 attack categories",
      "NoSQL sanitization",
      "security headers",
      "OWASP/CWE reports",
      "realtime monitoring"
    ]
  },
  {
    id: "data",
    name: "Data Layer",
    status: "indexed",
    tools: ["PostgreSQL", "MongoDB", "Redis", "JSONB snapshots", "Caffeine caching"],
    evidence: ["Visync", "HireFT", "SentinelAPI", "Job Match Analyzer"],
    proof: [
      "deduplication",
      "snapshot compaction",
      "MongoDB config",
      "analysis history",
      "role resolution cache"
    ]
  },
  {
    id: "cloud",
    name: "Cloud Layer",
    status: "connected",
    tools: ["AWS S3", "AWS SQS"],
    evidence: ["HireFT"],
    proof: ["S3 storage", "presigned uploads", "SQS-driven enrichment queues"]
  },
  {
    id: "product",
    name: "Product Layer",
    status: "shipping",
    tools: ["Next.js", "React.js", "Konva.js", "product dashboards"],
    evidence: ["Visync", "Job Match Analyzer", "MindBloom", "ParkIntel"],
    proof: [
      "product-focused UIs",
      "dashboards",
      "realtime collaboration",
      "gamified workflows",
      "AI analysis workflows"
    ]
  }
];

export const education: Education[] = [
  {
    institution: "ABV-IIITM Gwalior",
    program: "B.Tech Electrical and Electronics Engineering",
    score: "CGPA: 8.36",
    timeline: "Aug 2024 - Aug 2028",
    status: "in_progress",
    signal: "technical foundation detected"
  },
  {
    institution: "Vadanta International School, Jaipur",
    program: "Class XII, CBSE",
    score: "Percentage: 95.8%",
    timeline: "Apr 2023 - Apr 2024",
    status: "verified"
  }
];

export const leadership: Leadership[] = [
  {
    module: "module.leadership: detected",
    role: "Secretary, SAC Technical",
    institution: "ABV-IIITM Gwalior",
    timeline: "May 2026 - Present",
    summary:
      "Directing institute-level technical events and managing a cross-functional team.",
    metrics: ["team_size: 20+"]
  },
  {
    module: "module.operations: archived",
    role: "Operations Lead, IEEE",
    institution: "ABV-IIITM Gwalior",
    timeline: "Jan 2025 - Oct 2025",
    summary:
      "Spearheaded end-to-end operations for a national hackathon.",
    metrics: ["event_scale: 2000+ registrations", "finalists: 500+"]
  }
];

export const githubRepos: GitHubRepo[] = [
  {
    name: "Visync",
    repo: "pranav8764/Visync",
    url: "https://github.com/pranav8764/Visync",
    signal: "realtime systems detected"
  },
  {
    name: "SentinelAPI",
    repo: "pranav8764/SentinelAPI",
    url: "https://github.com/pranav8764/SentinelAPI",
    signal: "security layer detected"
  },
  {
    name: "MindBloom",
    repo: "pranav8764/MIndBloom1",
    url: "https://github.com/pranav8764/MIndBloom1",
    signal: "wellness product detected"
  },
  {
    name: "DentalAssistant",
    repo: "pranav8764/DentalAssistant",
    signal: "private or unconfirmed details"
  },
  {
    name: "ParkIntel",
    repo: "pranav8764/ParkIntel",
    url: "https://github.com/pranav8764/ParkIntel",
    signal: "urban systems detected"
  },
  {
    name: "ColourBlindnessDetection",
    repo: "pranav8764/ColourBlindnessDetection",
    url: "https://github.com/pranav8764/ColourBlindnessDetection",
    signal: "computer vision repository detected"
  },
  {
    name: "AlchemistAI-Assignment",
    repo: "pranav8764/AlchemistAI-Assignment",
    url: "https://github.com/pranav8764/AlchemistAI-Assignment",
    signal: "AI assignment repository detected"
  }
];

export const technicalSkills = {
  languages: ["Go", "Java", "Python", "JavaScript", "TypeScript", "C", "C++", "Kotlin", "SQL"],
  frameworks: [
    "Spring Boot",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "Socket.io",
    "Konva.js",
    "Puppeteer",
    "PDFBox"
  ],
  cloudAndData: ["PostgreSQL", "MongoDB", "Redis", "AWS S3", "AWS SQS"],
  tools: ["Git", "GitHub", "Linux", "Postman"],
  concepts: [
    "REST API Design",
    "Authentication (JWT)",
    "Database Modeling",
    "WebSockets",
    "Concurrent Processing",
    "LLM/AI Integration",
    "Security Testing",
    "OOP & DSA"
  ]
};

export const systemMessages = [
  "optimism.detected",
  "removing...",
  "architecture.recovered",
  "NullFrame Systems booting",
  "monolith.rendered"
];
