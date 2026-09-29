import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { aboutApproach } from "@/data/site";

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
              I&rsquo;m Katana Yaa, a full-stack developer who helps businesses build new
              applications, fix frustrating problems, and improve the software they already
              depend on.
            </p>
            <p className="type-lead mt-6 text-muted">
              My experience spans enterprise applications and small-business websites,
              including frontend development, backend services, databases, and production
              support. Supporting applications after launch has taught me to look beyond
              whether a feature works once and consider how people will use and maintain it
              every day.
            </p>
            <p className="type-lead mt-6 text-muted">
              When we work together, I focus on understanding what you need, explaining
              technical decisions clearly, and finding practical solutions. Whether you have
              an idea to develop or an existing application that needs attention, I can help
              you work through the next steps.
            </p>
          </Reveal>

          <StaggerContainer
            as="ul"
            className="mt-12 grid border-b border-line sm:grid-cols-3 sm:gap-x-8"
            stagger={0.05}
          >
            {aboutApproach.map((item) => (
              <StaggerItem key={item.title} as="li" className="border-t border-line py-5">
                <h3 className="font-medium text-fg">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal className="mt-10">
            <Button href="#contact" variant="secondary">
              Let&rsquo;s Talk
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
