export type CaseStudyStatus = "coming-soon" | "published";

export interface Project {
  slug: string;
  /** Zero-padded display number, e.g. "01". */
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: readonly string[];
  /**
   * Case-study pages do not exist yet. While `status` is "coming-soon" the UI
   * renders a disabled action. When a page ships, set "published" and the
   * action links to `/work/${slug}`.
   */
  caseStudy: { status: CaseStudyStatus };
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
