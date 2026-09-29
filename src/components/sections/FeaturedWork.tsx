import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content";

function ProjectVisual({ project }: { project: Project }) {
  if (project.visual) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-white sm:aspect-[16/10]">
        <div className="absolute inset-6 sm:inset-10">
          <Image
            src={project.visual.src}
            alt={project.visual.alt}
            width={project.visual.width}
            height={project.visual.height}
            sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
            className="size-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface sm:aspect-[16/10]"
    >
      <div className="bg-grid mask-fade-radial absolute inset-0 transition-transform duration-700 ease-out group-hover/project:scale-105" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
        <span>{project.slug}</span>
        <span>Preview</span>
      </div>

      <p className="text-outline absolute inset-0 flex items-center justify-center text-[clamp(6rem,22vw,11rem)] leading-none font-semibold tracking-tighter lg:text-[clamp(6rem,12vw,10rem)]">
        {project.number}
      </p>

      <p className="absolute bottom-4 left-4 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
        Visual placeholder
      </p>
    </div>
  );
}

function ExternalAction({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
      {label}
      <ArrowUpRight className="btn-icon size-4" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function CaseStudyAction({ project }: { project: Project }) {
  const { caseStudy, websiteUrl, repositoryUrl, statusLabel } = project;

  if (caseStudy.status === "published") {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button href={caseStudy.href}>View Case Study</Button>
        {websiteUrl ? <ExternalAction href={websiteUrl} label="Visit Live Website" /> : null}
      </div>
    );
  }

  if (websiteUrl) {
    return <ExternalAction href={websiteUrl} label="Visit Website" />;
  }

  if (repositoryUrl) {
    const action = <ExternalAction href={repositoryUrl} label="View on GitHub" />;

    if (!statusLabel) return action;

    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {action}
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-subtle">
          {statusLabel}
        </span>
      </div>
    );
  }

  // No page or link yet: show a disabled action instead of a dead "#" link.
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <button type="button" disabled className="btn btn-secondary">
        View Case Study
      </button>
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-subtle">
        Coming soon
      </span>
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="section pt-[clamp(3rem,2rem+4.5vw,6rem)]">
      <div className="container-page">
        <SectionHeader
          eyebrow="Selected work"
          titleId="work-heading"
          title="Featured Work"
          description="Applications built, fixed, and improved for real users."
        />

        <ol className="mt-9 space-y-10 md:mt-12 md:space-y-16">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal
                as="article"
                className="group/project grid gap-8 border-t border-line pt-6 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pt-8"
              >
                <div className={cn("lg:col-span-7", index % 2 === 1 && "lg:order-2")}>
                  <ProjectVisual project={project} />
                </div>

                <div className="lg:col-span-5">
                  <p className="font-mono text-sm text-accent">{project.number}</p>
                  <h3 className="type-subtitle mt-3">{project.title}</h3>
                  <p className="mt-2 text-muted">{project.subtitle}</p>
                  <p className="mt-6 text-pretty">{project.description}</p>

                  <ul
                    aria-label={`${project.title} technologies`}
                    className="mt-6 flex flex-wrap gap-x-2 gap-y-1 font-mono text-sm text-subtle"
                  >
                    {project.technologies.map((tech, techIndex) => (
                      <li key={tech} className="flex gap-2">
                        {tech}
                        {techIndex < project.technologies.length - 1 ? (
                          <span aria-hidden="true">/</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <CaseStudyAction project={project} />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
