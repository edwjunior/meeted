"use client";

import { useEffect, useState } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react";

import Magnet from "@/components/interactions/Magnet";
import PillNav, { type PillLink } from "@/components/interactions/PillNav";
import { cn } from "@/lib/utils";
import { CONTACT_LABEL, EMAIL } from "@/lib/site";

// Module-level so PillNav's GSAP timelines are not rebuilt on every render
const LINKS: PillLink[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Personal", href: "#personal" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Highlight the section currently crossing the middle of the viewport
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector<HTMLElement>(l.href)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Esc closes the mobile menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      {/* Scrim: keeps the logo and CTA legible over content scrolling underneath */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-4 -z-10 h-28 bg-gradient-to-b from-ink via-ink/75 to-transparent"
        aria-hidden="true"
      />
      <nav aria-label="Main" className="container-x grid grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <a
          href="#home"
          className="cursor-target justify-self-start rounded-full px-1 text-[15px] font-semibold tracking-tight text-paper"
        >
          Eduard Puig<span className="text-brand-500">.</span>
        </a>

        <div className="hidden md:block">
          <PillNav links={LINKS} activeHref={active} />
        </div>

        <div className="hidden justify-self-end md:block">
          <Magnet>
            <a href={`mailto:${EMAIL}`} className="btn btn-primary cursor-target h-10">
              {CONTACT_LABEL}
            </a>
          </Magnet>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="glass grid size-11 cursor-pointer place-items-center justify-self-end rounded-full text-paper transition-[scale] duration-150 ease-out-strong active:scale-[0.97] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <XIcon size={18} weight="bold" /> : <ListIcon size={18} weight="bold" />}
        </button>
      </nav>

      {open && (
        // Enters via @starting-style (Tailwind `starting:`); exit is instant — the user is done with it
        <div className="container-x md:hidden">
          <div
            id="mobile-menu"
            className={cn(
              "glass mt-3 rounded-3xl p-3 shadow-float",
              "origin-top transition-[opacity,translate,scale] duration-200 ease-out-strong",
              "starting:-translate-y-2 starting:scale-[0.98] starting:opacity-0",
            )}
          >
            <ul className="grid">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.href ? "location" : undefined}
                    className={cn(
                      "flex h-12 items-center rounded-full px-4 text-base font-medium tracking-tight transition-colors duration-200",
                      active === link.href ? "bg-paper text-ink" : "text-paper active:bg-white/10",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href={`mailto:${EMAIL}`} className="btn btn-primary mt-3 w-full">
              {CONTACT_LABEL}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
