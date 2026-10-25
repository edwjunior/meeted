"use client";

/*
 * Target cursor — port of the aaftab.is-a.dev interaction (React Bits TargetCursor), GSAP-driven.
 * A dot plus four spinning corners. Over any `.cursor-target` the spin stops and the corners
 * hug the element, with a little parallax while the pointer moves.
 *
 * Only on devices with a fine, hovering pointer and no reduced-motion preference.
 * The system cursor stays visible, so nothing is lost if the overlay is ignored.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

const BORDER = 3;
const CORNER = 12;

type Point = { x: number; y: number };

export default function TargetCursor({
  targetSelector = ".cursor-target",
  spinDuration = 3,
  hoverDuration = 0.25,
  parallaxOn = true,
  cursorColor = "#f3f0ea", // paper
  cursorColorOnTarget = "#ff7b52", // brand-400
}: {
  targetSelector?: string;
  spinDuration?: number;
  hoverDuration?: number;
  parallaxOn?: boolean;
  cursorColor?: string;
  cursorColorOnTarget?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canHover =
      matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!root || !canHover) return;

    const dot = root.querySelector<HTMLElement>(".tc-dot")!;
    const corners = gsap.utils.toArray<HTMLElement>(".tc-corner", root);

    // Resting position of each corner around the dot
    const rest: Point[] = [
      { x: -1.5 * CORNER, y: -1.5 * CORNER },
      { x: 0.5 * CORNER, y: -1.5 * CORNER },
      { x: 0.5 * CORNER, y: 0.5 * CORNER },
      { x: -1.5 * CORNER, y: 0.5 * CORNER },
    ];

    const ctx = gsap.context(() => {
      corners.forEach((c, i) => gsap.set(c, rest[i]));
      gsap.set(root, { xPercent: -50, yPercent: -50, x: innerWidth / 2, y: innerHeight / 2, autoAlpha: 0 });
    }, root);

    const spin = () =>
      gsap.timeline({ repeat: -1 }).to(root, { rotation: "+=360", duration: spinDuration, ease: "none" });
    let spinTl = spin();

    // quickTo reuses one tween instead of creating a new one per mousemove
    const moveX = gsap.quickTo(root, "x", { duration: 0.1, ease: "power3.out" });
    const moveY = gsap.quickTo(root, "y", { duration: 0.1, ease: "power3.out" });

    let active: Element | null = null;
    let targets: Point[] | null = null;
    let resumeTimer: number | undefined;
    const strength = { v: 0 };

    const onMove = (e: MouseEvent) => {
      gsap.to(root, { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
      moveX(e.clientX);
      moveY(e.clientY);
    };
    const onDown = () => {
      gsap.to(dot, { scale: 0.7, duration: 0.3 });
      gsap.to(root, { scale: 0.9, duration: 0.2 });
    };
    const onUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(root, { scale: 1, duration: 0.2 });
    };
    const onWindowLeave = () => gsap.to(root, { autoAlpha: 0, duration: 0.2 });

    // Each frame while there is a target, corners re-place relative to the live cursor → parallax
    const tick = () => {
      if (!targets || strength.v === 0) return;
      const cx = gsap.getProperty(root, "x") as number;
      const cy = gsap.getProperty(root, "y") as number;
      corners.forEach((c, i) => {
        const x = gsap.getProperty(c, "x") as number;
        const y = gsap.getProperty(c, "y") as number;
        const tx = targets![i].x - cx;
        const ty = targets![i].y - cy;
        const d = strength.v >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;
        gsap.to(c, {
          x: x + (tx - x) * strength.v,
          y: y + (ty - y) * strength.v,
          duration: d,
          ease: d ? "power1.out" : "none",
          overwrite: "auto",
        });
      });
    };

    const leave = () => {
      gsap.ticker.remove(tick);
      targets = null;
      strength.v = 0;
      active?.removeEventListener("mouseleave", leave);
      active = null;
      gsap.to(corners, { borderColor: cursorColor, duration: 0.15 });
      gsap.to(dot, { backgroundColor: cursorColor, duration: 0.15 });
      corners.forEach((c, i) => gsap.to(c, { ...rest[i], duration: 0.3, ease: "power3.out" }));
      // Resume the spin from the current angle, no jump
      resumeTimer = window.setTimeout(() => {
        if (active) return;
        const r = (gsap.getProperty(root, "rotation") as number) % 360;
        spinTl.kill();
        gsap.to(root, {
          rotation: r + 360,
          duration: spinDuration * (1 - r / 360),
          ease: "none",
          onComplete: () => {
            gsap.set(root, { rotation: 0 });
            spinTl = spin();
          },
        });
      }, 50);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.(targetSelector);
      if (!el || el === active) return;
      if (active) leave();
      window.clearTimeout(resumeTimer);
      active = el;

      spinTl.kill();
      gsap.killTweensOf(root, "rotation");
      gsap.set(root, { rotation: 0 });
      gsap.to(corners, { borderColor: cursorColorOnTarget, duration: 0.15, ease: "power2.out" });
      gsap.to(dot, { backgroundColor: cursorColorOnTarget, duration: 0.15, ease: "power2.out" });

      // The element's four corners, with a few px of breathing room
      const r = el.getBoundingClientRect();
      targets = [
        { x: r.left - BORDER, y: r.top - BORDER },
        { x: r.right + BORDER - CORNER, y: r.top - BORDER },
        { x: r.right + BORDER - CORNER, y: r.bottom + BORDER - CORNER },
        { x: r.left - BORDER, y: r.bottom + BORDER - CORNER },
      ];
      const cx = gsap.getProperty(root, "x") as number;
      const cy = gsap.getProperty(root, "y") as number;
      corners.forEach((c, i) =>
        gsap.to(c, { x: targets![i].x - cx, y: targets![i].y - cy, duration: 0.2, ease: "power2.out" }),
      );
      gsap.ticker.add(tick);
      gsap.to(strength, { v: 1, duration: hoverDuration, ease: "power2.out" });
      el.addEventListener("mouseleave", leave);
    };

    // If the page scrolls and the target slides out from under the cursor, let go.
    // `scrollend` fires once per scroll gesture, not every frame.
    const onScrollEnd = () => {
      if (!active) return;
      const hit = document.elementFromPoint(
        gsap.getProperty(root, "x") as number,
        gsap.getProperty(root, "y") as number,
      );
      if (!hit || (hit !== active && hit.closest(targetSelector) !== active)) leave();
    };

    addEventListener("mousemove", onMove);
    addEventListener("mousedown", onDown);
    addEventListener("mouseup", onUp);
    addEventListener("mouseover", onOver);
    addEventListener("scrollend", onScrollEnd);
    document.documentElement.addEventListener("mouseleave", onWindowLeave);

    return () => {
      removeEventListener("mousemove", onMove);
      removeEventListener("mousedown", onDown);
      removeEventListener("mouseup", onUp);
      removeEventListener("mouseover", onOver);
      removeEventListener("scrollend", onScrollEnd);
      document.documentElement.removeEventListener("mouseleave", onWindowLeave);
      active?.removeEventListener("mouseleave", leave);
      window.clearTimeout(resumeTimer);
      gsap.ticker.remove(tick);
      spinTl.kill();
      gsap.killTweensOf([root, dot, ...corners, strength]);
      ctx.revert();
    };
  }, [targetSelector, spinDuration, hoverDuration, parallaxOn, cursorColor, cursorColorOnTarget]);

  return (
    <div
      ref={rootRef}
      className="tc invisible"
      aria-hidden="true"
      style={{ "--tc-color": cursorColor } as React.CSSProperties}
    >
      <div className="tc-dot" />
      <div className="tc-corner" />
      <div className="tc-corner" />
      <div className="tc-corner" />
      <div className="tc-corner" />
    </div>
  );
}
