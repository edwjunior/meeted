"use client";

/*
 * Magnet — CTA drifts toward the pointer once it is within `padding` px of the element.
 * Offset = distance to centre / `strength` (original site: padding 60, strength 5).
 *
 * Writes transform straight to the DOM (no React state): this runs on every pointer move,
 * and re-rendering at that rate would jank. Pointer reads are coalesced to one per frame.
 * Off for touch devices and reduced motion.
 */

import { useEffect, useRef, type ReactNode } from "react";

export default function Magnet({
  children,
  padding = 60,
  strength = 5,
  className,
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    const canHover =
      matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wrap || !inner || !canHover) return;

    let on = false;
    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!last) return;
      const { left, top, width, height } = wrap.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = last.clientX - cx;
      const dy = last.clientY - cy;
      const near = Math.abs(dx) < width / 2 + padding && Math.abs(dy) < height / 2 + padding;

      if (near) {
        on = true;
        inner.style.transition = "transform 0.3s ease-out";
        inner.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
      } else if (on) {
        on = false;
        inner.style.transition = "transform 0.5s ease-in-out";
        inner.style.transform = "translate3d(0, 0, 0)";
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };

    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      inner.style.transform = "";
      inner.style.transition = "";
    };
  }, [padding, strength]);

  return (
    <span ref={wrapRef} className={className ?? "inline-block"}>
      <span ref={innerRef} className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
}
