import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { services } from "@/data/site";

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
              Build something new, repair what is broken, or modernize what is holding you
              back.
            </p>
          </div>
        </Reveal>

        <StaggerContainer as="ul" className="border-b border-line lg:col-span-8" stagger={0.06}>
          {services.map((service, index) => (
            <StaggerItem
              key={service.title}
              as="li"
              className="group grid gap-2 border-t border-line py-6 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-6 md:py-7"
            >
              <span className="font-mono text-sm text-subtle transition-colors group-hover:text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-medium tracking-tight text-balance">
                {service.title}
              </h3>
              <p className="text-muted">{service.description}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
