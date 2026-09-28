import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content";

function ProjectVisual({ project }: { project: Project }) {
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

function CaseStudyAction({ project }: { project: Project }) {
  // Case-study pages are not built yet: show a disabled action instead of a
  // dead "#" link. Swap to <Button href={`/work/${project.slug}`}> once published.
  if (project.caseStudy.status === "published") {
    return <Button href={`/work/${project.slug}`}>View Case Study</Button>;
  }

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
    <section id="work" aria-labelledby="work-heading" className="section">
      <div className="container-page">
        <SectionHeader
          eyebrow="Selected work"
          titleId="work-heading"
          title="Featured Work"
          description="Applications built, fixed, and improved for real users."
        />

        <ol className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal
                as="article"
                className="group/project grid gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pt-12"
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
