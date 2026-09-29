import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { helpPaths } from "@/data/site";

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section border-t border-line"
    >
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Services</p>
            <h2 id="services-heading" className="type-title mt-5">
              How I can help
            </h2>
            <p className="type-lead mt-6 text-muted">
              Most projects start in one of three places. Find the one that sounds like
              yours.
            </p>
          </div>
        </Reveal>

        <StaggerContainer as="ul" className="border-b border-line lg:col-span-8" stagger={0.1}>
          {helpPaths.map((path, index) => (
            <StaggerItem
              key={path.id}
              as="li"
              className="grid gap-4 border-t border-line py-8 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-6 md:py-10"
            >
              <span className="font-mono text-sm text-subtle">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-mono text-sm uppercase tracking-[0.08em] text-accent">
                  {path.label}
                </h3>
                <p className="mt-3 text-2xl leading-snug font-medium tracking-tight text-balance">
                  &ldquo;{path.need}&rdquo;
                </p>
                <ul
                  aria-label={`${path.label}: relevant work`}
                  className="mt-6 grid gap-x-8 gap-y-2 text-muted sm:grid-cols-2"
                >
                  {path.work.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] size-1 flex-none bg-line-strong" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
