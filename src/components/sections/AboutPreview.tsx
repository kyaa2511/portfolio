import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { aboutFocusAreas, PENDING_HREF } from "@/data/site";

export function AboutPreview() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section border-t border-line">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">About</p>
          <h2 id="about-heading" className="type-title mt-5">
            Software built to be relied on.
          </h2>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <p className="type-lead">
              Katana is a full-stack software developer with experience building,
              supporting, debugging, and modernizing enterprise and small-business
              applications.
            </p>
            <p className="type-lead mt-6 text-muted">
              His work spans frontend development, backend services, APIs, databases,
              authentication, testing, and production application support.
            </p>
          </Reveal>

          <StaggerContainer
            as="ul"
            className="mt-12 grid border-b border-line sm:grid-cols-2 sm:gap-x-10"
            stagger={0.05}
          >
            {aboutFocusAreas.map((area) => (
              <StaggerItem
                key={area}
                as="li"
                className="border-t border-line py-4 font-mono text-sm text-muted"
              >
                {area}
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal className="mt-10">
            {/* Placeholder: the full About page ships in a later sprint. */}
            <Button href={PENDING_HREF} variant="secondary">
              More About Me
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
