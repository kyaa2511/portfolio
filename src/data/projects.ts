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
      "A multi-tenant platform for running IT operations, with a React and TypeScript front end, a NestJS API, PostgreSQL through TypeORM, and Clerk handling authentication.",
    technologies: ["React", "TypeScript", "NestJS", "PostgreSQL", "TypeORM", "Clerk"],
    caseStudy: { status: "coming-soon" },
  },
  {
    slug: "my-tech-hero",
    number: "02",
    title: "My Tech Hero",
    subtitle: "Technology Support Business Platform",
    description:
      "A business platform for a technology support company, built with React on Cloudflare, with Turnstile guarding public forms and Resend delivering email.",
    technologies: ["React", "Cloudflare", "Turnstile", "Resend"],
    caseStudy: { status: "coming-soon" },
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
