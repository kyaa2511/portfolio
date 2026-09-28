import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  /** Show the trailing arrow. */
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = true,
  className,
  onClick,
}: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "btn",
        variant === "primary" ? "btn-primary" : "btn-secondary",
        size === "lg" && "btn-lg",
        className,
      )}
    >
      {children}
      {arrow ? <ArrowRight className="btn-icon size-4" aria-hidden="true" /> : null}
    </Link>
  );
}
