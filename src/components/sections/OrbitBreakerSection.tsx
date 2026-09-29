import { OrbitBreakerGame } from "@/components/game/OrbitBreakerGame";
import { Reveal } from "@/components/motion/Reveal";

export function OrbitBreakerSection() {
  return (
    <section
      id="playground"
      aria-labelledby="playground-heading"
      className="section border-t border-line"
    >
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Orbit Breaker</p>
          <h2 id="playground-heading" className="type-title mt-5">
            Take a quick space break.
          </h2>
          <p className="type-lead mt-6 text-muted">
            Pilot your ship, break up the asteroids, and see how long you can last. No
            experience needed. Press Play when you are ready.
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          <div className="mx-auto w-full max-w-3xl">
            <OrbitBreakerGame />
          </div>
        </div>
      </div>
    </section>
  );
}
