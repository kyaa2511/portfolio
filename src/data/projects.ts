import type { Project } from "@/types/content";

/**
 * Descriptions are placeholder copy derived from each project's stack.
 * Replace with real case-study summaries before launch.
 */
export const projects: readonly Project[] = [
  {
    slug: "techops-hub",
    number: "01",
    title: "TechOps Hub",
    subtitle: "Multi-Tenant IT Operations Platform",
    description:
      "An in-progress full-stack operations platform designed around organizations, users, memberships, role-aware access, backend APIs, and relational data modeling.",
    technologies: ["React", "TypeScript", "NestJS", "PostgreSQL", "TypeORM", "Clerk"],
    proofPoints: [
      {
        label: "Architecture",
        detail: "Multi-tenant domain model with organizations, memberships, and authorization boundaries.",
      },
      {
        label: "Backend",
        detail: "NestJS API layer backed by PostgreSQL and TypeORM for production-style data workflows.",
      },
      {
        label: "Delivery",
        detail: "Built to demonstrate auth, testing, CI, and deployment concerns as the app matures.",
      },
    ],
    visualLabels: ["Organizations", "Users", "Roles", "API", "PostgreSQL", "CI"],
    repositoryUrl: "https://github.com/kyaa2511/techops-hub",
    statusLabel: "In development",
    caseStudy: { status: "coming-soon" },
  },
  {
    slug: "my-tech-hero",
    number: "02",
    title: "My Tech Hero",
    subtitle: "Technology Support Business Website",
    description:
      "A website for my technology support business, helping people understand the services available and take the next step toward getting help. The focus is clear service information, approachable language, and a straightforward support-request process.",
    technologies: ["React", "Cloudflare", "Turnstile", "Resend"],
    websiteUrl: "https://mytechhero.net",
    visual: {
      src: "/projects/my-tech-hero-logo.png",
      alt: "My Tech Hero logo",
      width: 1024,
      height: 768,
    },
    caseStudy: { status: "published", href: "/projects/my-tech-hero" },
  },
  {
    slug: "enterprise-clinical-platform",
    number: "03",
    title: "Enterprise Clinical Platform",
    subtitle: "Enterprise Configuration & Workflow Platform",
    description:
      "An enterprise configuration and workflow application, with a React and Redux-Saga front end and Node.js services backed by Oracle.",
    technologies: ["React", "Redux-Saga", "Node.js", "Oracle"],
    caseStudy: { status: "coming-soon" },
  },
];
