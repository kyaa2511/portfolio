"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { easeOut } from "@/components/motion/variants";
import { navCta, navItems, siteConfig } from "@/data/site";

const MENU_ID = "mobile-menu";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md"
    >
      <m.div
        className="container-page flex h-16 items-center justify-between"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        <Link
          href="/"
          className="-ml-2 flex min-h-11 items-center gap-2.5 rounded-md px-2 text-[0.9375rem] font-semibold tracking-tight"
          onClick={close}
        >
          <span aria-hidden="true" className="size-2 bg-accent" />
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href={navCta.href} className="ml-3" arrow={false}>
            {navCta.label}
          </Button>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 flex size-11 items-center justify-center rounded-md text-fg md:hidden"
          aria-expanded={open}
          aria-controls={MENU_ID}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </m.div>

      <AnimatePresence initial={false}>
        {open ? (
          <m.div
            key="menu"
            id={MENU_ID}
            className="overflow-hidden border-t border-line bg-bg md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
          >
            <nav aria-label="Mobile" className="container-page pt-2 pb-6">
              <ul>
                {navItems.map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex min-h-14 items-center text-xl font-medium tracking-tight"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button
                href={navCta.href}
                size="lg"
                className="mt-6 w-full"
                onClick={close}
              >
                {navCta.label}
              </Button>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
