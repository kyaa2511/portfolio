export type CaseStudy =
  | { status: "coming-soon" }
  | { status: "published"; href: string };

export interface Project {
  slug: string;
  /** Zero-padded display number, e.g. "01". */
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: readonly string[];
  /** Concrete proof points shown on stronger in-progress or architecture-heavy work. */
  proofPoints?: readonly { label: string; detail: string }[];
  /** Short labels used to make the placeholder visual more specific to the project. */
  visualLabels?: readonly string[];
  /** Live site. Shown as an external action, secondary to the case study when one is published. */
  websiteUrl?: string;
  /** Public source repository. Used when there is no live site. */
  repositoryUrl?: string;
  /** Short status shown beside the action, e.g. "In development". */
  statusLabel?: string;
  /** Brand or product image shown instead of the numbered placeholder. */
  visual?: { src: string; alt: string; width: number; height: number };
  /** "published" carries the internal route of the case-study page. */
  caseStudy: CaseStudy;
}

/** One way a client might come to the site: something to build, fix, or improve. */
export interface HelpPath {
  id: "build" | "fix" | "improve";
  /** Short label, e.g. "Build". */
  label: string;
  /** The client's situation, in their words. */
  need: string;
  /** Call to action used where the visitor picks a path, e.g. "Build something new". */
  intent: string;
  /** Prefilled email subject for this path. */
  subject: string;
  work: readonly string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContentItem {
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  /** `null` until the real URL is supplied. */
  href: string | null;
}
