"use client";

import { useEffect, useState } from "react";

const links = ["About", "Work", "Personal", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Highlight the link of the section currently in the middle of the viewport
  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.toLowerCase()))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Main"
      className="fixed top-0 left-0 right-0 z-50 bg-ink/85 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold tracking-tight text-white">
          Eduard<span className="text-cool">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => {
            const id = link.toLowerCase();
            const isActive = active === id;
            return (
              <li key={link}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative py-1 transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform after:duration-200 after:ease-out-strong ${
                    isActive
                      ? "text-white after:scale-x-100"
                      : "text-muted hover:text-white after:scale-x-0"
                  }`}
                >
                  {link}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="mailto:edupuigjunior.6@gmail.com"
          className="btn btn-primary btn-sm hidden md:inline-flex shadow-none"
        >
          Hire me
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-muted hover:text-white transition-colors cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        // Enters via @starting-style (Tailwind `starting:`), no JS mount state needed
        <div
          id="mobile-menu"
          className="md:hidden border-t border-white/5 bg-ink px-6 py-5 space-y-4 origin-top transition-[opacity,transform] duration-200 ease-out-strong starting:opacity-0 starting:-translate-y-2"
        >
          {links.map((link) => {
            const id = link.toLowerCase();
            return (
              <a
                key={link}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                aria-current={active === id ? "location" : undefined}
                className={`block py-1 transition-colors ${
                  active === id ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {link}
              </a>
            );
          })}
          <a
            href="mailto:edupuigjunior.6@gmail.com"
            className="btn btn-primary btn-sm mt-2 shadow-none"
          >
            Hire me
          </a>
        </div>
      )}
    </nav>
  );
}
