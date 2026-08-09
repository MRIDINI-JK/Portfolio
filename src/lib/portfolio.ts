/**
 * Single source of truth for ALL portfolio copy and data.
 * No component may hardcode content that belongs here.
 *
 * `null` means "not supplied yet" — the UI renders an explicit, clearly-marked
 * placeholder for it. Never replace a null with an invented value.
 */

export type SkillLevel = "Learning" | "Familiar" | "Working Knowledge" | "Strong" | "Advanced";

export const SKILL_LEVEL_WEIGHT: Record<SkillLevel, number> = {
  Learning: 1,
  Familiar: 2,
  "Working Knowledge": 3,
  Strong: 4,
  Advanced: 5,
};

export type Skill = {
  name: string;
  level: SkillLevel;
  note: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  skills: Skill[];
};

export type Project = {
  id: string;
  name: string;
  problem: string;
  description: string;
  stack: string[];
  features: string[];
  architecture: string[];
  challenges: string;
  results: string | null;
  github: string | null;
  demo: string | null;
  image: string | null;
  featured: boolean;
};

export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "dsa"
  | "achievements"
  | "contact";

export type Section = { id: SectionId; num: string; label: string };

export const SECTIONS: Section[] = [
  { id: "home", num: "—", label: "HOME" },
  { id: "about", num: "01", label: "ABOUT" },
  { id: "skills", num: "02", label: "SKILLS" },
  { id: "projects", num: "03", label: "PROJECTS" },
  { id: "experience", num: "04", label: "EXPERIENCE" },
  { id: "dsa", num: "05", label: "DSA" },
  { id: "achievements", num: "06", label: "ACHIEVEMENTS" },
  { id: "contact", num: "07", label: "CONTACT" },
];

export const portfolio = {
  identity: {
    /** Fill these in — everything else keys off them. */
    name: null as string | null,
    initials: null as string | null,
    location: null as string | null,
    status: "Open to Opportunities",
  },

  hero: {
    greeting: "Hi, I'm",
    headline: "Computer Science Engineer building intelligent digital systems.",
    roles: ["Software Engineer", "AI/ML Builder", "Problem Solver", "Full-Stack Developer"],
    intro:
      "I build intelligent, scalable and interactive software systems while constantly exploring new technologies.",
    scrollCue: "Scroll to explore",
  },

  about: {
    intro:
      "Third-year Computer Science & Engineering student focused on building software that solves real problems — from AI-assisted tooling to full-stack platforms.",
    education:
      "B.Tech, Computer Science & Engineering — currently in the third year, preparing for software engineering placements.",
    interests:
      "Software engineering roles where systems thinking, applied AI/ML and strong fundamentals matter. Happiest somewhere between product polish and backend architecture.",
    chips: [
      "🎓 CSE",
      "📍 India",
      "💻 Software Development",
      "🤖 AI/ML",
      "🌐 Full-Stack",
      "⚡ Competitive Programming",
    ],
    /** Confirm these years against the real timeline before shipping. */
    timeline: [
      {
        year: null as string | null,
        title: "Started deeper exploration of software development",
        body: "Moved past coursework into building and shipping real projects.",
      },
      {
        year: null as string | null,
        title: "Built AI/ML and full-stack projects",
        body: "Applied machine learning and end-to-end web engineering to practical problems.",
      },
      {
        year: null as string | null,
        title: "Advanced development, system design and placement prep",
        body: "Deepening system design, data structures and algorithmic problem solving.",
      },
    ],
  },

  skillGroups: [
    {
      id: "languages",
      label: "Languages",
      skills: [
        { name: "Python", level: "Strong", note: "Primary language for AI/ML and scripting." },
        { name: "JavaScript", level: "Strong", note: "Everyday language for web work." },
        { name: "TypeScript", level: "Working Knowledge", note: "Typed React and Node services." },
        { name: "C++", level: "Strong", note: "Language of choice for DSA and contests." },
        { name: "Java", level: "Familiar", note: "OOP fundamentals and coursework." },
        { name: "SQL", level: "Working Knowledge", note: "Schema design and analytical queries." },
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      skills: [
        { name: "React", level: "Strong", note: "Component architecture and state management." },
        { name: "Next.js", level: "Working Knowledge", note: "Routing, SSR and metadata." },
        { name: "Tailwind CSS", level: "Strong", note: "Design-system-first styling." },
        { name: "Three.js", level: "Familiar", note: "Interactive WebGL scenes." },
        { name: "Framer Motion", level: "Working Knowledge", note: "Purposeful interface motion." },
      ],
    },
    {
      id: "backend",
      label: "Backend",
      skills: [
        { name: "Node.js", level: "Working Knowledge", note: "REST services and tooling." },
        { name: "Express", level: "Working Knowledge", note: "Routing, middleware, auth flows." },
        { name: "FastAPI", level: "Working Knowledge", note: "Serving ML models over HTTP." },
        { name: "Flask", level: "Familiar", note: "Lightweight Python services." },
        { name: "REST APIs", level: "Strong", note: "Designing predictable API contracts." },
      ],
    },
    {
      id: "aiml",
      label: "AI / ML",
      skills: [
        { name: "TensorFlow", level: "Working Knowledge", note: "Model training and evaluation." },
        { name: "PyTorch", level: "Familiar", note: "Experimentation with neural networks." },
        { name: "scikit-learn", level: "Strong", note: "Classical ML pipelines end to end." },
        { name: "NLP", level: "Working Knowledge", note: "Text classification and embeddings." },
        { name: "Computer Vision", level: "Familiar", note: "Image and audio signal models." },
      ],
    },
    {
      id: "databases",
      label: "Databases",
      skills: [
        { name: "PostgreSQL", level: "Working Knowledge", note: "Relational modelling, indexing." },
        { name: "MongoDB", level: "Working Knowledge", note: "Document stores for fast iteration." },
        { name: "MySQL", level: "Familiar", note: "Coursework and small services." },
        { name: "Redis", level: "Learning", note: "Caching and rate limiting." },
      ],
    },
    {
      id: "tools",
      label: "Tools",
      skills: [
        { name: "Git & GitHub", level: "Strong", note: "Branching, reviews, collaboration." },
        { name: "Docker", level: "Familiar", note: "Containerising services for parity." },
        { name: "Linux", level: "Working Knowledge", note: "Daily driver and shell tooling." },
        { name: "Postman", level: "Strong", note: "API testing and documentation." },
        { name: "Vercel", level: "Working Knowledge", note: "Deploys and preview environments." },
      ],
    },
  ] satisfies SkillGroup[],

  projects: [
    {
      id: "truthguard",
      name: "TruthGuard AI",
      problem: "Misinformation spreads faster than anyone can fact-check it manually.",
      description:
        "An AI system that scores the credibility of claims and articles, surfacing supporting and contradicting evidence instead of a single opaque verdict.",
      stack: ["Python", "FastAPI", "scikit-learn", "NLP", "React"],
      features: [
        "Claim extraction and credibility scoring",
        "Evidence retrieval with source transparency",
        "Explanation of why a claim was flagged",
      ],
      architecture: [
        "React client submits a claim or URL",
        "FastAPI gateway normalises and extracts claims",
        "NLP model scores credibility against retrieved evidence",
        "Result plus evidence trail returned to the client",
      ],
      challenges:
        "Balancing model confidence against the risk of confidently labelling nuanced claims as false.",
      results: null,
      github: null,
      demo: null,
      image: null,
      featured: true,
    },
    {
      id: "cypherx",
      name: "CypherX",
      problem: "Secure data handling is usually bolted on rather than designed in.",
      description:
        "A cryptography toolkit and playground for encrypting, sharing and inspecting data, built to make security primitives understandable rather than magical.",
      stack: ["TypeScript", "Node.js", "React", "Web Crypto API"],
      features: [
        "Multiple cipher implementations with step-by-step visualisation",
        "Secure share links with client-side encryption",
        "Key management walkthroughs",
      ],
      architecture: [
        "Client performs encryption locally via Web Crypto",
        "Node service stores only ciphertext and metadata",
        "Ephemeral share tokens gate retrieval",
      ],
      challenges: "Keeping the UX approachable without hiding the parts that matter for security.",
      results: null,
      github: null,
      demo: null,
      image: null,
      featured: true,
    },
    {
      id: "soundguard",
      name: "SoundGuard",
      problem: "Audio deepfakes and unsafe audio events go undetected in real time.",
      description:
        "An audio intelligence pipeline that classifies incoming sound events and flags anomalies, designed for low-latency streaming input.",
      stack: ["Python", "PyTorch", "Signal Processing", "FastAPI"],
      features: [
        "Streaming audio feature extraction",
        "Event classification with confidence bands",
        "Anomaly alerts with replayable clips",
      ],
      architecture: [
        "Audio chunks streamed to the service",
        "Spectrogram features computed per window",
        "Model classifies events and scores anomaly likelihood",
        "Alerts pushed to the dashboard",
      ],
      challenges: "Keeping inference latency low enough to stay useful on a live stream.",
      results: null,
      github: null,
      demo: null,
      image: null,
      featured: true,
    },
    {
      id: "gigshield",
      name: "GigShield",
      problem: "Freelancers and gig workers have little protection against unpaid or unclear work.",
      description:
        "A platform that formalises gig agreements, tracks milestones and keeps an auditable record of what was agreed and delivered.",
      stack: ["React", "Node.js", "PostgreSQL", "Express"],
      features: [
        "Structured agreements with milestone tracking",
        "Dispute-ready activity log",
        "Role-based dashboards for both sides",
      ],
      architecture: [
        "React dashboard for clients and workers",
        "Express API enforcing agreement state machine",
        "PostgreSQL as the append-friendly source of truth",
      ],
      challenges: "Modelling disputes as first-class states rather than an error path.",
      results: null,
      github: null,
      demo: null,
      image: null,
      featured: true,
    },
    {
      id: "smart-crop",
      name: "Smart Crop Advisory",
      problem: "Small farms lack accessible, localised guidance on what to plant and when.",
      description:
        "A recommendation system combining soil, weather and crop data to suggest suitable crops and interventions.",
      stack: ["Python", "scikit-learn", "Flask", "React"],
      features: ["Crop suitability recommendations", "Weather-aware advisories"],
      architecture: [
        "Client collects location and soil inputs",
        "Flask service runs the recommendation model",
        "Advisory returned with reasoning",
      ],
      challenges: "Working with sparse, inconsistent agricultural datasets.",
      results: null,
      github: null,
      demo: null,
      image: null,
      featured: false,
    },
    {
      id: "civic-issues",
      name: "Civic Issue Reporting Platform",
      problem: "Reported civic issues disappear into inboxes with no accountability.",
      description:
        "A reporting platform where citizens log issues with location and photos, and progress stays publicly visible until resolution.",
      stack: ["React", "Node.js", "MongoDB", "Maps API"],
      features: ["Geotagged issue reports", "Public status tracking", "Authority dashboard"],
      architecture: [
        "Citizens submit geotagged reports",
        "Node API routes to the right authority queue",
        "Status transitions are public and timestamped",
      ],
      challenges: "Preventing duplicate reports for the same physical issue.",
      results: null,
      github: null,
      demo: null,
      image: null,
      featured: false,
    },
  ] satisfies Project[],

  experience: [] as Array<{
    org: string;
    role: string;
    duration: string;
    responsibilities: string[];
    tech: string[];
    achievements: string[];
  }>,

  dsa: {
    platform: "LeetCode",
    handle: null as string | null,
    rating: null as number | null,
    solved: null as number | null,
    contests: null as number | null,
    currentFocus: "Graphs and dynamic programming, with weekly contest practice.",
    topics: [
      { name: "Arrays", level: "Strong" },
      { name: "Strings", level: "Strong" },
      { name: "Binary Search", level: "Strong" },
      { name: "Trees", level: "Working Knowledge" },
      { name: "Graphs", level: "Working Knowledge" },
      { name: "Dynamic Programming", level: "Working Knowledge" },
      { name: "Greedy", level: "Working Knowledge" },
      { name: "Backtracking", level: "Familiar" },
      { name: "Heap", level: "Familiar" },
      { name: "Hashing", level: "Strong" },
    ] as Array<{ name: string; level: SkillLevel }>,
  },

  achievements: {
    categories: [
      "Hackathons",
      "Competitive Programming",
      "Certifications",
      "Academic",
      "Research",
      "Open Source",
    ],
    items: [] as Array<{
      category: string;
      title: string;
      description: string;
      date: string;
      link: string | null;
    }>,
  },

  github: {
    username: null as string | null,
  },

  resume: {
    heading: "Want the complete picture?",
    body: "Download my resume for a detailed overview of my experience, projects and technical skills.",
    url: null as string | null,
  },

  contact: {
    heading: "Let's build something meaningful.",
    body: "Open to software engineering internships and full-time placement opportunities. The form below opens your email client — no data is stored anywhere.",
    email: null as string | null,
    linkedin: null as string | null,
    github: null as string | null,
  },

  footer: {
    tagline: "Building systems. Solving problems. Exploring what's next.",
    credit: "Built with React + Three.js",
    year: 2026,
  },
} as const;

export type Portfolio = typeof portfolio;

/** Display helper: honest placeholder text for unsupplied values. */
export const placeholder = (label: string) => `[ ${label} — add in portfolio.ts ]`;

export const displayName = portfolio.identity.name ?? "Your Name";
export const displayInitials = portfolio.identity.initials ?? "··";
