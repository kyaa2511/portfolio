import type { ContentItem, HelpPath, NavItem, SocialLink } from "@/types/content";

export const siteConfig = {
  name: "Katana Yaa",
  role: "Full-Stack Software Developer",
  title: "Katana Yaa | Full-Stack Software Developer",
  description:
    "Full-stack software developer building, debugging, and improving modern web applications with React, TypeScript, Node.js, APIs, and databases.",
} as const;

export const contactEmail = "kyaa2511@gmail.com";

export function mailtoWithSubject(subject: string) {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;
}

export const contactMailto = mailtoWithSubject("Project Inquiry");

/** Root-relative so the links also work from pages other than the homepage. */
export const navItems: readonly NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const navCta: NavItem = { label: "Let's Work Together", href: "/#contact" };

/** `href: null` renders as a "soon" placeholder. Do not invent URLs. */
export const socialLinks: readonly SocialLink[] = [
  { label: "GitHub", href: null },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/katanayaa/" },
  { label: "Email", href: `mailto:${contactEmail}` },
];

export const capabilities: readonly ContentItem[] = [
  {
    title: "Full-Stack Development",
    description: "Interface, services, and data, built as one system.",
  },
  {
    title: "React & Next.js",
    description: "Fast, accessible front ends with clean structure.",
  },
  {
    title: "Node.js APIs",
    description: "Backend services with clear, predictable contracts.",
  },
  {
    title: "Application Debugging",
    description: "Tracing problems to the root cause, then fixing them.",
  },
  {
    title: "Database Development",
    description: "Schemas, queries, and migrations that hold up.",
  },
];

export const helpPaths: readonly HelpPath[] = [
  {
    id: "build",
    label: "Build",
    need: "I need an application or website built.",
    intent: "Build something new",
    subject: "Project Inquiry — New Build",
    work: [
      "Full-stack applications",
      "React and Next.js interfaces",
      "Node.js APIs",
      "Database-backed systems",
      "Business websites",
    ],
  },
  {
    id: "fix",
    label: "Fix",
    need: "I already have software, but something isn't working.",
    intent: "Fix something broken",
    subject: "Project Inquiry — Fix",
    work: [
      "Debugging and bug fixing",
      "Frontend issues",
      "API issues",
      "Database issues",
      "Troubleshooting existing applications",
    ],
  },
  {
    id: "improve",
    label: "Improve",
    need: "My application works, but it needs to be better.",
    intent: "Improve what already exists",
    subject: "Project Inquiry — Improvement",
    work: [
      "Modernizing older code and stacks",
      "Performance and UX improvements",
      "Architecture cleanup",
      "New feature development",
      "Authentication and authorization",
      "Production readiness",
    ],
  },
];

export const aboutApproach: readonly ContentItem[] = [
  {
    title: "Understand the problem",
    description: "Clarify your goals, users, and what needs to improve.",
  },
  {
    title: "Build with purpose",
    description: "Connect the interface, services, and data around those needs.",
  },
  {
    title: "Support what comes next",
    description: "Troubleshoot issues and make future changes easier.",
  },
];
