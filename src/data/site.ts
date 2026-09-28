import type { ContentItem, NavItem, SocialLink } from "@/types/content";

export const siteConfig = {
  name: "Katana Yaa",
  role: "Full-Stack Software Developer",
  title: "Katana Yaa | Full-Stack Software Developer",
  description:
    "Full-stack software developer building, debugging, and improving modern web applications with React, TypeScript, Node.js, APIs, and databases.",
} as const;

/**
 * Sprint 1 placeholder for destinations that are not built yet
 * (About page, contact flow). Replace with real routes in later sprints.
 */
export const PENDING_HREF = "#";

export const navItems: readonly NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const navCta: NavItem = { label: "Let's Work Together", href: "#contact" };

/** `href: null` renders as a "soon" placeholder. Do not invent URLs. */
export const socialLinks: readonly SocialLink[] = [
  { label: "GitHub", href: null },
  { label: "LinkedIn", href: null },
  { label: "Email", href: null },
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

export const services: readonly ContentItem[] = [
  {
    title: "Full-Stack Application Development",
    description: "End-to-end builds, from database schema to finished interface.",
  },
  {
    title: "React / Next.js Development",
    description: "Fast, accessible front ends with a clean component architecture.",
  },
  {
    title: "Backend APIs",
    description: "Reliable Node.js services with clear contracts and predictable behavior.",
  },
  {
    title: "Application Debugging",
    description: "Finding production issues and fixing them at the root, not the symptom.",
  },
  {
    title: "Database Development",
    description: "Schema design, queries, and migrations for relational databases.",
  },
  {
    title: "Authentication & Authorization",
    description: "Secure sign-in, roles, and permissions that fit how your product works.",
  },
  {
    title: "Application Modernization",
    description: "Upgrading older code and stacks without starting from scratch.",
  },
];

export const aboutFocusAreas: readonly string[] = [
  "Frontend development",
  "Backend services",
  "APIs",
  "Databases",
  "Authentication",
  "Testing",
  "Production support",
];
