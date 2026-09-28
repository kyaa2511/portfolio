import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { capabilities } from "@/data/site";

export function CapabilitiesSection() {
  return (
    <section aria-labelledby="capabilities-heading" className="border-b border-line">
      <h2 id="capabilities-heading" className="sr-only">
        Capabilities
      </h2>
      <div className="container-page">
        <StaggerContainer
          as="ul"
          className="grid sm:grid-cols-2 lg:grid-cols-5"
        >
          {capabilities.map((item, index) => (
            <StaggerItem
              key={item.title}
              as="li"
              className="border-t border-line py-6 first:border-t-0 sm:px-6 sm:odd:pl-0 sm:even:border-l sm:even:pr-0 sm:nth-2:border-t-0 lg:border-t-0 lg:border-l lg:px-6 lg:py-10 lg:odd:pl-6 lg:even:pr-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="font-mono text-xs text-subtle">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-lg font-medium tracking-tight">{item.title}</p>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
