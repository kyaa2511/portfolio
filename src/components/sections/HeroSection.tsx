import { FadeIn } from "@/components/motion/FadeIn";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

const architecture = [
  { label: "Interface", detail: "React · Next.js · TypeScript" },
  { label: "Services", detail: "Node.js · APIs · Auth" },
  { label: "Data", detail: "Relational databases" },
] as const;

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden border-b border-line"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-bottom absolute inset-0" />
        <div className="ambient-scan absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />
      </div>

      <div className="container-page grid gap-14 pt-16 pb-20 md:pt-24 md:pb-24 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-28">
        <div className="lg:col-span-8">
          <FadeIn lift={false}>
            <p className="eyebrow">
              <span className="text-fg">{siteConfig.name}</span>
              <span aria-hidden="true">/</span>
              <span>{siteConfig.role}</span>
            </p>
          </FadeIn>

          <h1 id="hero-heading" className="type-display mt-7">
            <TextReveal
              text="I build, fix, and improve web applications."
              delay={0.15}
              accentWords={["web", "applications."]}
            />
          </h1>

          <FadeIn delay={0.75}>
            <p className="type-lead mt-8 max-w-[38rem] text-muted">
              I help businesses turn ideas, broken applications, and complicated
              requirements into reliable software using React, TypeScript, Node.js,
              APIs, and modern databases.
            </p>
          </FadeIn>

          <FadeIn delay={0.9} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#work" size="lg" className="w-full sm:w-auto">
              View My Work
            </Button>
            <Button href="#contact" size="lg" variant="secondary" className="w-full sm:w-auto">
              Work With Me
            </Button>
          </FadeIn>
        </div>

        <FadeIn delay={1.05} className="hidden lg:col-span-4 lg:block">
          <div
            aria-hidden="true"
            className="rounded-xl border border-line bg-surface/70 p-6 font-mono text-sm"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.08em] text-subtle">
              <span>architecture</span>
              <span className="pulse-dot size-2 rounded-full bg-accent" />
            </div>

            <div className="relative mt-8 pl-8">
              <div className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong">
                <span className="ambient-trace absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent" />
              </div>
              <ul className="space-y-9">
                {architecture.map((row) => (
                  <li key={row.label} className="relative">
                    <span className="absolute top-1.5 -left-8 size-[11px] rounded-full border border-line-strong bg-bg" />
                    <p className="text-fg">{row.label}</p>
                    <p className="mt-1 text-xs text-subtle">{row.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
