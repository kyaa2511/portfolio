import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { JourneyTimeline, type JourneyStep } from "@/components/motion/JourneyTimeline";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { mailtoWithSubject } from "@/data/site";
import { projects } from "@/data/projects";

const SLUG = "my-tech-hero";
const PROJECT_TYPE = "Small Business Website & Customer Request Platform";

export const metadata: Metadata = {
  title: "My Tech Hero Case Study | Katana Yaa",
  description:
    "How I built and deployed My Tech Hero: a small business website with a protected customer-request flow, Cloudflare hosting, and a search-ready foundation.",
};

const summary =
  "A production website for my technology support business: clear service information, a low-friction request flow, and a deployment I own from code to custom domain.";

const overviewPoints = [
  "Communicating services clearly",
  "Establishing trust",
  "Making it simple to ask for help",
  "Working well on phones",
  "Protecting the public request form",
  "Running on a professional production setup",
] as const;

const challenges = [
  {
    title: "A mixed audience",
    body: "Visitors may not be comfortable with technology, so navigation and language had to stay plain and unintimidating.",
  },
  {
    title: "Services without jargon",
    body: "Help spans computers, phones, Wi-Fi, printers, streaming, and smart-home devices. Each needed an everyday description.",
  },
  {
    title: "A low-friction request",
    body: "Asking for help had to take very little effort, whether by form or by picking up the phone.",
  },
  {
    title: "A public form",
    body: "Any open contact form attracts automated abuse. It needed protection that would not get in the way of real customers.",
  },
  {
    title: "Real production needs",
    body: "A local service business still needs search metadata, a custom domain, and dependable hosting.",
  },
] as const;

const responsibilities = [
  {
    title: "Product and UX decisions",
    detail: "Structure, language, and the path from landing to request.",
  },
  {
    title: "Frontend development",
    detail: "The React application and its responsive layout.",
  },
  {
    title: "Request workflow",
    detail: "Form, validation, and email delivery through a Cloudflare Worker.",
  },
  {
    title: "Spam protection",
    detail: "Cloudflare Turnstile on the form, verified on the server.",
  },
  {
    title: "SEO configuration",
    detail: "Metadata, canonical URLs, robots.txt, and sitemap.xml.",
  },
  {
    title: "Deployment and domain",
    detail: "Cloudflare deployment and custom domain setup.",
  },
] as const;

const deliverables = [
  {
    title: "Business Website",
    description:
      "A responsive, service-focused site with a home page, a pricing page, and a request confirmation page, written in plain language.",
    details: ["Home", "Pricing", "Request confirmation", "Responsive layout"],
  },
  {
    title: "Customer Request Flow",
    description:
      "A request form that takes a visitor from reading about services to a confirmation page, with call and text options for anyone who would rather not type.",
    details: ["Request form", "Call or text", "Confirmation page"],
  },
  {
    title: "Form Protection",
    description:
      "Cloudflare Turnstile guards the form without a puzzle-heavy CAPTCHA. The Worker verifies the token and validates the fields on the server before any email is sent.",
    details: ["Turnstile", "Server-side verification", "Server-side validation"],
  },
  {
    title: "Production Infrastructure",
    description:
      "One Cloudflare Worker serves the built React app and handles the request endpoint, on a custom domain over HTTPS, with structured logging for troubleshooting.",
    details: ["Cloudflare Worker", "Static assets", "Custom domain", "HTTPS"],
  },
  {
    title: "Search Foundation",
    description:
      "Per-page titles, descriptions, and canonical URLs, plus robots.txt and sitemap.xml. The confirmation page is kept out of search results.",
    details: ["Page metadata", "Canonical URLs", "robots.txt", "sitemap.xml"],
  },
] as const;

const journey: readonly JourneyStep[] = [
  {
    title: "Discover",
    where: "Home page",
    detail:
      "The page opens with a plain-language promise and a list of everyday tech frustrations visitors will recognize.",
  },
  {
    title: "Explore services",
    where: "Home page sections",
    detail: "Sections describe the services and the ways to get help, in everyday terms.",
  },
  {
    title: "Review pricing",
    where: "/pricing",
    detail:
      "A dedicated page lists starting prices, so cost is clear before anyone reaches out.",
  },
  {
    title: "Request help",
    where: "Contact section",
    detail:
      "The request form sits on the home page, next to call and text options for anyone who would rather talk.",
  },
  {
    title: "Protected submission",
    where: "Cloudflare Worker /api/contact",
    detail:
      "The form needs a Turnstile token to submit. The Worker verifies it, validates the fields, and only then sends the request by email.",
  },
  {
    title: "Request received",
    where: "/request-received",
    detail:
      "A confirmation page tells the visitor the request went through. It is excluded from search indexing.",
  },
];

const decisions = [
  {
    title: "Keep the experience approachable",
    body: "Services are described in everyday language, and prices live on their own page so visitors are not left guessing.",
  },
  {
    title: "Protect the form without adding friction",
    body: "Turnstile keeps automated submissions out, and verifying the token on the server means the check cannot be skipped by bypassing the browser.",
  },
  {
    title: "Treat SEO as product infrastructure",
    body: "Canonical URLs, robots.txt, sitemap.xml, and per-page metadata shipped with the first production build rather than being bolted on afterward.",
  },
  {
    title: "Make it easy on a phone",
    body: "Requests can start from a phone, so the layout collapses to a mobile menu and the contact section offers call and text buttons.",
  },
  {
    title: "One Worker for the site and its API",
    body: "Serving the app and the request endpoint from a single Cloudflare deployment keeps hosting simple and leaves fewer moving parts to maintain.",
  },
] as const;

const stack = [
  { label: "Frontend", items: ["React", "Vite", "Custom CSS"] },
  { label: "Request handling", items: ["Cloudflare Workers", "Resend"] },
  { label: "Protection", items: ["Cloudflare Turnstile"] },
  { label: "Hosting", items: ["Cloudflare", "Wrangler", "Custom domain"] },
] as const;

const results = [
  "A production-ready business website",
  "A responsive service and pricing experience",
  "A protected customer-request flow with a confirmation state",
  "A custom domain served over HTTPS",
  "A search-engine foundation: metadata, canonical URLs, robots.txt, sitemap.xml",
  "A live deployment on Cloudflare",
] as const;

function CaseSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="border-b border-line py-[clamp(3.5rem,2.5rem+5vw,7rem)]"
    >
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`${id}-heading`} className="type-title mt-5">
              {title}
            </h2>
          </div>
        </Reveal>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="mt-[0.7em] size-1 flex-none bg-accent" />
      {children}
    </li>
  );
}

export default function MyTechHeroCaseStudy() {
  const project = projects.find((item) => item.slug === SLUG);
  if (!project || !project.websiteUrl) notFound();

  return (
    <main id="main" className="flex-1">
      <section
        aria-labelledby="case-heading"
        className="relative isolate overflow-hidden border-b border-line"
      >
        <div aria-hidden="true" className="bg-grid mask-fade-bottom absolute inset-0 -z-10" />

        <div className="container-page pt-6 pb-16 md:pt-8 md:pb-24">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 font-mono text-xs uppercase tracking-[0.08em] text-subtle">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center hover:text-fg">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#work" className="inline-flex min-h-11 items-center hover:text-fg">
                  Featured Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-fg">
                {project.title}
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid gap-12 md:mt-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="min-w-0 lg:col-span-7">
              <FadeIn lift={false}>
                <p className="eyebrow">Case study</p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 id="case-heading" className="type-display mt-6">
                  {project.title}
                </h1>
                <p className="mt-5 text-lg font-medium tracking-tight text-fg sm:text-xl">
                  {PROJECT_TYPE}
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="type-lead mt-6 max-w-[38rem] text-muted">{summary}</p>

                <ul
                  aria-label="Technologies"
                  className="mt-8 flex flex-wrap gap-x-2 gap-y-1 font-mono text-sm text-subtle"
                >
                  {project.technologies.map((tech, index) => (
                    <li key={tech} className="flex gap-2">
                      {tech}
                      {index < project.technologies.length - 1 ? (
                        <span aria-hidden="true">/</span>
                      ) : null}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-subtle">
                  <span
                    aria-hidden="true"
                    className="pulse-dot size-2 flex-none rounded-full bg-accent"
                  />
                  Status: <span className="text-fg">Live in production</span>
                </p>
              </FadeIn>

              <FadeIn delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg w-full sm:w-auto"
                >
                  Visit Live Website
                  <ArrowUpRight className="btn-icon size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </FadeIn>
            </div>

            {project.visual ? (
              <FadeIn delay={0.25} className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-white">
                  <div className="absolute inset-8 sm:inset-12">
                    <Image
                      src={project.visual.src}
                      alt={project.visual.alt}
                      width={project.visual.width}
                      height={project.visual.height}
                      sizes="(min-width: 1280px) 460px, (min-width: 1024px) 40vw, 100vw"
                      priority
                      className="size-full object-contain"
                    />
                  </div>
                </div>
              </FadeIn>
            ) : null}
          </div>
        </div>
      </section>

      <CaseSection id="overview" eyebrow="01 / Overview" title="Overview">
        <Reveal>
          <p className="type-lead max-w-2xl text-pretty">
            My Tech Hero exists to make professional technology help approachable for people
            who find technology frustrating or overwhelming. The development challenge was
            translating a service business into a clear web experience.
          </p>
        </Reveal>
        <StaggerContainer
          as="ul"
          className="mt-10 grid gap-x-10 border-b border-line text-muted sm:grid-cols-2"
          stagger={0.05}
        >
          {overviewPoints.map((point) => (
            <StaggerItem key={point} as="li" className="flex gap-3 border-t border-line py-4">
              <span aria-hidden="true" className="mt-[0.7em] size-1 flex-none bg-accent" />
              {point}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </CaseSection>

      <CaseSection id="challenge" eyebrow="02 / Challenge" title="The challenge">
        <StaggerContainer as="ul" className="border-b border-line" stagger={0.07}>
          {challenges.map((item) => (
            <StaggerItem
              key={item.title}
              as="li"
              className="grid gap-2 border-t border-line py-6 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-8"
            >
              <h3 className="text-lg font-medium tracking-tight text-balance">{item.title}</h3>
              <p className="text-muted">{item.body}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </CaseSection>

      <CaseSection id="role" eyebrow="03 / Role" title="My role">
        <Reveal>
          <p className="type-lead max-w-2xl text-pretty">
            I built My Tech Hero for my own technology support business, so the product
            decisions and the engineering were both mine.
          </p>
        </Reveal>
        <StaggerContainer
          as="ul"
          className="mt-10 grid gap-x-10 border-b border-line sm:grid-cols-2"
          stagger={0.05}
        >
          {responsibilities.map((item) => (
            <StaggerItem key={item.title} as="li" className="border-t border-line py-5">
              <h3 className="font-medium tracking-tight">{item.title}</h3>
              <p className="mt-1 text-muted">{item.detail}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </CaseSection>

      <CaseSection id="built" eyebrow="04 / Delivered" title="What I built">
        <StaggerContainer as="ol" className="border-b border-line" stagger={0.08}>
          {deliverables.map((item, index) => (
            <StaggerItem
              key={item.title}
              as="li"
              className="grid gap-3 border-t border-line py-8 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-6 md:py-10"
            >
              <span aria-hidden="true" className="font-mono text-sm text-subtle">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-2xl leading-snug font-medium tracking-tight text-balance">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl text-muted">{item.description}</p>
                <ul
                  aria-label={`${item.title} details`}
                  className="mt-5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-subtle"
                >
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </CaseSection>

      <CaseSection id="journey" eyebrow="05 / Flow" title="Customer journey">
        <Reveal>
          <p className="type-lead mb-12 max-w-2xl text-pretty">
            The path a visitor takes on the live site, from first impression to a confirmed
            request.
          </p>
        </Reveal>
        <JourneyTimeline steps={journey} />
      </CaseSection>

      <CaseSection id="decisions" eyebrow="06 / Decisions" title="Key decisions">
        <StaggerContainer as="ul" className="border-b border-line" stagger={0.07}>
          {decisions.map((item) => (
            <StaggerItem
              key={item.title}
              as="li"
              className="grid gap-2 border-t border-line py-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-8"
            >
              <h3 className="text-lg font-medium tracking-tight text-balance">{item.title}</h3>
              <p className="text-muted">{item.body}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </CaseSection>

      <CaseSection id="technology" eyebrow="07 / Stack" title="Technology">
        <Reveal>
          <dl className="border-b border-line">
            {stack.map((group) => (
              <div
                key={group.label}
                className="grid gap-1 border-t border-line py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.08em] text-subtle sm:pt-1">
                  {group.label}
                </dt>
                <dd className="text-lg">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </CaseSection>

      <CaseSection id="result" eyebrow="08 / Result" title="Result">
        <Reveal>
          <p className="type-lead max-w-2xl text-pretty">
            What shipped, and what it took to run it in production:
          </p>
          <ul className="mt-8 space-y-3 text-lg">
            {results.map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
        </Reveal>
      </CaseSection>

      <section
        aria-labelledby="case-cta-heading"
        className="relative isolate overflow-hidden py-[clamp(4.5rem,3rem+7vw,9.5rem)]"
      >
        <div aria-hidden="true" className="bg-grid mask-fade-radial absolute inset-0 -z-10" />
        <div className="container-page">
          <Reveal className="max-w-4xl">
            <p className="eyebrow">Work with me</p>
            <h2 id="case-cta-heading" className="type-display mt-5">
              Need something like this built for your business?
            </h2>
            <p className="type-lead mt-8 max-w-2xl text-muted">
              I build, fix, and improve web applications and business websites. Tell me what
              you need and we can work out the next step.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/#contact" size="lg" className="w-full sm:w-auto">
                Start a Project
              </Button>
              <Button href="/#work" size="lg" variant="secondary" arrow={false} className="w-full sm:w-auto">
                Return to Work
              </Button>
            </div>
            <p className="mt-6 text-muted">
              Prefer email?{" "}
              <a href={mailtoWithSubject("Project Inquiry — Business Website")} className="link">
                Write about a business website
                <ArrowRight className="ml-1 inline size-3.5" aria-hidden="true" />
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
