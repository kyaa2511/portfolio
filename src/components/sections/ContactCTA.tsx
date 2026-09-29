import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { contactEmail, contactMailto } from "@/data/site";

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
            Whether you need something built from scratch, an existing application fixed,
            or an older system improved, let&rsquo;s talk.
          </p>
          <div className="mt-10">
            <a href={contactMailto} className="btn btn-primary btn-lg w-full sm:w-auto">
              Start a Project
              <ArrowRight className="btn-icon size-4" aria-hidden="true" />
            </a>
            <p className="mt-6 text-muted">
              Or email{" "}
              <a href={`mailto:${contactEmail}`} className="link">
                {contactEmail}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
