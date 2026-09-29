import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { contactEmail, contactMailto, helpPaths, mailtoWithSubject } from "@/data/site";

const usefulToInclude = [
  "What the application does today",
  "What is broken, or what you want changed",
  "Any deadline you are working toward",
] as const;

export function ContactCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden border-t border-line"
    >
      <div aria-hidden="true" className="bg-grid mask-fade-radial absolute inset-0 -z-10" />
      <div className="container-page section">
        <Reveal className="max-w-4xl">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading" className="type-display mt-5">
            Have a project that needs to get across the finish line?
          </h2>
          <p className="type-lead mt-8 max-w-2xl text-muted">
            Tell me what you&rsquo;re building, what&rsquo;s not working, or what you&rsquo;d
            like to improve.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h3 className="eyebrow font-normal">Where are you starting from?</h3>
            <ul className="mt-5 border-b border-line">
              {helpPaths.map((path) => (
                <li key={path.id} className="border-t border-line">
                  <a
                    href={mailtoWithSubject(path.subject)}
                    className="group flex min-h-16 items-center justify-between gap-4 py-4 text-xl font-medium tracking-tight transition-colors hover:text-accent focus-visible:text-accent sm:text-2xl"
                  >
                    {path.intent}
                    <ArrowRight
                      className="btn-icon size-5 flex-none text-subtle transition-colors group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-subtle">
              Each option opens an email to {contactEmail} with a matching subject line.
            </p>
          </div>

          <div className="lg:col-span-5">
            <h3 className="eyebrow font-normal">Helpful to include</h3>
            <ul className="mt-5 space-y-3 text-muted">
              {usefulToInclude.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] size-1 flex-none bg-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a href={contactMailto} className="btn btn-primary btn-lg w-full sm:w-auto">
                Start a Project
                <ArrowRight className="btn-icon size-4" aria-hidden="true" />
              </a>
              <p className="mt-6 text-muted">
                Or email{" "}
                <a href={`mailto:${contactEmail}`} className="link break-all">
                  {contactEmail}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
