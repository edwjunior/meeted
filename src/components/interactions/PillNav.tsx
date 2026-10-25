"use client";

/*
 * Pill nav — port of the aaftab.is-a.dev interaction (React Bits PillNav), GSAP-driven.
 * On hover a paper circle rises from below and fills the pill while the label swaps:
 * the normal one leaves upward and an ink copy comes in from below.
 * One paused timeline per pill; enter = tweenTo(end) in 0.3s, leave = tweenTo(0) in 0.2s
 * (exit faster than enter). Reduced motion: the same states, without the travel.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

export type PillLink = { label: string; href: string };

export default function PillNav({
  links,
  activeHref,
  ease = "power3.out",
}: {
  links: PillLink[];
  activeHref?: string | null;
  ease?: string;
}) {
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pills = gsap.utils.toArray<HTMLAnchorElement>(".pill", nav);
    const tls: gsap.core.Timeline[] = [];

    const layout = () =>
      pills.forEach((pill, i) => {
        const circle = pill.querySelector<HTMLElement>(".pill-circle")!;
        const label = pill.querySelector<HTMLElement>(".pill-label")!;
        const hover = pill.querySelector<HTMLElement>(".pill-label-hover")!;
        const { width: w, height: h } = pill.getBoundingClientRect();
        if (!w || !h) return;

        // A circle whose top arc passes exactly through the pill's corners
        const R = (w * w) / 4 / (2 * h) + h / 2;
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        Object.assign(circle.style, { width: `${D}px`, height: `${D}px`, bottom: `${-delta}px` });
        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${D - delta}px` });
        gsap.set(label, { y: 0 });
        gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });

        tls[i]?.kill();
        tls[i] = gsap
          .timeline({ paused: true })
          .to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0)
          .to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0)
          .to(hover, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
      });

    const go = (i: number, to: number, d: number) =>
      tls[i]?.tweenTo(to, { duration: reduced ? 0 : d, ease, overwrite: "auto" });

    const handlers = pills.map((pill, i) => {
      const enter = () => go(i, tls[i]?.duration() ?? 0, 0.3);
      const exit = () => go(i, 0, 0.2);
      pill.addEventListener("mouseenter", enter);
      pill.addEventListener("mouseleave", exit);
      pill.addEventListener("focus", enter);
      pill.addEventListener("blur", exit);
      return { pill, enter, exit };
    });

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(nav);
    document.fonts?.ready.then(layout);

    return () => {
      ro.disconnect();
      handlers.forEach(({ pill, enter, exit }) => {
        pill.removeEventListener("mouseenter", enter);
        pill.removeEventListener("mouseleave", exit);
        pill.removeEventListener("focus", enter);
        pill.removeEventListener("blur", exit);
      });
      tls.forEach((tl) => tl?.kill());
    };
  }, [links, ease]);

  return (
    <ul ref={navRef} className="glass flex items-center gap-0.5 rounded-full p-[3px]">
      {links.map((link) => {
        const isActive = activeHref === link.href;
        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "pill cursor-target relative inline-flex h-9 items-center overflow-hidden rounded-full px-3.5",
                "text-[13px] font-medium tracking-tight transition-colors duration-300 ease-out-expo",
                isActive ? "bg-paper text-ink" : "text-paper",
              )}
            >
              <span className="pill-circle pointer-events-none absolute left-1/2 rounded-full bg-paper" aria-hidden="true" />
              <span className="pill-text relative z-10 inline-block leading-none">
                <span className="pill-label inline-block">{link.label}</span>
                <span className="pill-label-hover absolute left-0 top-0 inline-block text-ink" aria-hidden="true">
                  {link.label}
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
