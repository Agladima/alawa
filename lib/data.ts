export const STATS = [
  { num: "7+",  label: "Years Experience" },
  { num: "40+", label: "Projects Shipped" },
  { num: "18",  label: "Happy Clients" },
  { num: "99%", label: "Client Satisfaction" },
];

export const ABOUT_DETAILS = [
  { label: "Location",   value: "San Francisco, CA" },
  { label: "Availability", value: "Open to roles" },
  { label: "Focus",      value: "Full-Stack, React, Node" },
  { label: "Education",  value: "B.S. Computer Science" },
];

export const SKILLS = [
  {
    icon: "⚛",
    title: "Frontend",
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Zustand"],
  },
  {
    icon: "⚙",
    title: "Backend",
    tags: ["Node.js", "Express", "Python", "FastAPI", "GraphQL", "REST"],
  },
  {
    icon: "🗄",
    title: "Data & Storage",
    tags: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase", "S3"],
  },
  {
    icon: "☁",
    title: "Cloud & DevOps",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Vercel"],
  },
];

export const EXPERIENCE = [
  {
    period: "2022 — Present",
    company: "Luminary Labs",
    badge: "Full-time",
    role: "Senior Full-Stack Engineer",
    desc: "Lead engineer on a 6-person product team building a B2B SaaS analytics platform. Architected the front-end component library used across 4 product lines and redesigned the data ingestion pipeline, reducing p95 latency by 60%.",
    techs: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
  },
  {
    period: "2020 — 2022",
    company: "Nexlayer Inc.",
    badge: "Full-time",
    role: "Full-Stack Developer",
    desc: "Built and maintained consumer-facing features for a fintech platform serving 200k+ users. Shipped a real-time notification system and an OAuth2 authentication flow. Mentored two junior developers.",
    techs: ["Next.js", "TypeScript", "GraphQL", "MongoDB", "Redis"],
  },
  {
    period: "2018 — 2020",
    company: "Studio Cipher",
    badge: "Agency",
    role: "Frontend Developer",
    desc: "Delivered pixel-perfect, performant marketing sites and web apps for clients across healthcare, e-commerce, and media. Worked directly with designers and stakeholders in a fast-paced agency environment.",
    techs: ["React", "JavaScript", "GSAP", "Webflow", "PHP"],
  },
];

export const PROJECTS = [
  {
    featured: true,
    num: "01 / Featured",
    icon: "◈",
    title: "FlowBoard — Real-time Kanban Platform",
    desc: "A collaborative project management tool with real-time sync, drag-and-drop boards, and team analytics. Built for speed — under 100ms latency on all interactions.",
    stack: ["Next.js", "Socket.io", "PostgreSQL", "Prisma", "Vercel"],
    href: "#",
  },
  {
    featured: false,
    num: "02",
    icon: "⬡",
    title: "Vaultify — Expense Tracker",
    desc: "Personal finance app with AI-categorized transactions, visual spending breakdowns, and monthly reports.",
    stack: ["React", "FastAPI", "OpenAI", "Supabase"],
    href: "#",
  },
  {
    featured: false,
    num: "03",
    icon: "△",
    title: "Pulse API — Monitoring SaaS",
    desc: "Uptime & performance monitoring service with alerting, status pages, and a public API. Monitors 500+ endpoints daily.",
    stack: ["Node.js", "Redis", "AWS Lambda", "Terraform"],
    href: "#",
  },
  {
    featured: false,
    num: "04",
    icon: "◻",
    title: "Scribe — Markdown Blog Engine",
    desc: "Lightweight, headless CMS and blog engine with custom markdown extensions, SEO tooling, and an editorial workflow.",
    stack: ["Next.js", "MDX", "TypeScript", "MongoDB"],
    href: "#",
  },
];

export const CONTACT_CHANNELS = [
  { label: "Email",    value: "alex@alexmercer.dev", href: "mailto:alex@alexmercer.dev" },
  { label: "GitHub",   value: "github.com/alexmercer", href: "#" },
  { label: "LinkedIn", value: "linkedin.com/in/alexmercer", href: "#" },
];
