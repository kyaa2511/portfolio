import { Reveal } from "@/components/motion/Reveal";

const codeLines = [
  "function totalPrice(items: CartItem[]) {",
  "  let total = 0;",
  "  for (let i = 0; i <= items.length; i++) {",
  "    total += items[i].price * items[i].qty;",
  "  }",
  "  return total;",
  "}",
] as const;

export function PlaygroundTeaser() {
  return (
    <section
      id="playground"
      aria-labelledby="playground-heading"
      className="section border-t border-line"
    >
      <div className="container-page">
        <Reveal className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-2">
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <p className="eyebrow">Bug Hunt</p>
            <h2 id="playground-heading" className="type-title mt-5">
              Think you can spot the bug?
            </h2>
            <p className="type-lead mt-6 text-muted">
              Bug Hunt &mdash; interactive debugging challenge coming soon.
            </p>
            <p className="mt-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-muted">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              Coming soon
            </p>
          </div>

          <div className="border-t border-line bg-bg lg:border-t-0 lg:border-l">
            <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-xs text-subtle">
              <span>cart.ts</span>
              <span>bugs found 0 / 1</span>
            </div>
            <pre
              tabIndex={0}
              aria-label="Code sample containing one bug"
              className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-7 text-muted sm:p-6 sm:text-sm"
            >
              <code>
                {codeLines.map((line, index) => (
                  <span key={index} className="block whitespace-pre">
                    <span
                      aria-hidden="true"
                      className="mr-4 inline-block w-4 text-right text-subtle select-none"
                    >
                      {index + 1}
                    </span>
                    {line}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
