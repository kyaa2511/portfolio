import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { PENDING_HREF } from "@/data/site";

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
            {/* Placeholder: the contact flow ships in a later sprint. */}
            <Button href={PENDING_HREF} size="lg" className="w-full sm:w-auto">
              Start a Project
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
