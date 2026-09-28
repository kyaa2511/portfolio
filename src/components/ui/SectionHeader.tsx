import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  /** id applied to the h2 so the parent section can use aria-labelledby. */
  titleId: string;
  description?: ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleId,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId} className="type-title mt-5">
        {title}
      </h2>
      {description ? <p className="type-lead mt-6 text-muted">{description}</p> : null}
    </Reveal>
  );
}
