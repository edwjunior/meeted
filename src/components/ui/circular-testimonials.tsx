"use client";

/*
 * CircularTestimonials — from 21st.dev, adapted to this project's design rules:
 *  - Tailwind + theme tokens instead of styled-jsx and hardcoded hex.
 *  - Explicit transitions (transform/opacity) with a strong ease-out instead of `all` with an overshoot curve.
 *  - Arrow keys only act while the carousel has focus (the original listened on the whole window).
 *  - Autoplay off by default, paused on hover/focus, disabled for reduced motion.
 *  - Word reveal keeps a light blur (4px) and short stagger; skipped entirely for reduced motion.
 *  - No measuring on resize: the side offset is CSS (container query units).
 *  - Phosphor arrows (the project icon set) instead of adding react-icons.
 */

import { useCallback, useEffect, useState, type CSSProperties, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  /** Responsive candidates, e.g. from next/image `getImageProps`. */
  srcSet?: string;
  sizes?: string;
  /** Alt text. Falls back to `name`. */
  alt?: string;
  /** CSS `object-position` to keep the subject in frame. */
  objectPosition?: string;
}

interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  /** Milliseconds between steps under autoplay. */
  interval?: number;
  colors?: Colors;
  fontSizes?: FontSizes;
  /** What a screen reader calls the carousel. */
  label?: string;
  className?: string;
}

// Same curve as --ease-out-strong in globals.css
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Position of an image relative to the active one: centre, left or right. */
type Slot = "active" | "left" | "right" | "hidden";

const SLOT_STYLE: Record<Slot, CSSProperties> = {
  active: { zIndex: 3, opacity: 1, transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)" },
  // --ct-gap scales with the container width (cqi), so no resize listener is needed
  left: {
    zIndex: 2,
    opacity: 1,
    transform: "translateX(calc(var(--ct-gap) * -1)) translateY(calc(var(--ct-gap) * -0.8)) scale(0.85) rotateY(15deg)",
  },
  right: {
    zIndex: 2,
    opacity: 1,
    transform: "translateX(var(--ct-gap)) translateY(calc(var(--ct-gap) * -0.8)) scale(0.85) rotateY(-15deg)",
  },
  hidden: { zIndex: 1, opacity: 0, transform: "scale(0.8)", pointerEvents: "none" },
};

export const CircularTestimonials = ({
  testimonials,
  autoplay = false,
  interval = 5000,
  colors = {},
  fontSizes = {},
  label = "Testimonials",
  className,
}: CircularTestimonialsProps) => {
  const count = testimonials.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion() ?? false;

  const active = testimonials[activeIndex];

  const handleNext = useCallback(() => setActiveIndex((i) => (i + 1) % count), [count]);
  const handlePrev = useCallback(() => setActiveIndex((i) => (i - 1 + count) % count), [count]);

  // Autoplay restarts after every change, so a manual step resets the timer
  useEffect(() => {
    if (!autoplay || paused || reduced || count < 2) return;
    const timer = window.setTimeout(handleNext, interval);
    return () => window.clearTimeout(timer);
  }, [autoplay, paused, reduced, count, interval, activeIndex, handleNext]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  const slotOf = (index: number): Slot => {
    if (index === activeIndex) return "active";
    if (index === (activeIndex - 1 + count) % count) return "left";
    if (index === (activeIndex + 1) % count) return "right";
    return "hidden";
  };

  // Colours and sizes travel as CSS variables, so hover states stay in CSS (no hover state in React)
  const vars = {
    "--ct-name": colors.name ?? "var(--color-paper)",
    "--ct-designation": colors.designation ?? "var(--color-mist)",
    "--ct-quote": colors.testimony ?? "var(--color-secondary)",
    "--ct-arrow-bg": colors.arrowBackground ?? "transparent",
    "--ct-arrow-fg": colors.arrowForeground ?? "var(--color-paper)",
    "--ct-arrow-hover": colors.arrowHoverBackground ?? "var(--color-paper)",
    "--ct-size-name": fontSizes.name ?? "clamp(1.75rem, 3vw, 2.5rem)",
    "--ct-size-designation": fontSizes.designation ?? "0.8125rem",
    "--ct-size-quote": fontSizes.quote ?? "1.125rem",
  } as CSSProperties;

  if (!count) return null;

  const words = active.quote.split(" ");

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className={cn("w-full rounded-3xl", className)}
      style={vars}
    >
      <div className="grid gap-16 md:grid-cols-2 md:items-center md:gap-20">
        {/* Images — side ones are clickable shortcuts; the arrows are the accessible controls */}
        <div
          className="relative mx-auto mt-12 h-[22rem] w-[calc(100%-4rem)] [container-type:inline-size] md:w-[calc(100%-6rem)] [perspective:1000px] md:h-[26rem]"
          style={{ "--ct-gap": "clamp(36px, 15cqi, 72px)" } as CSSProperties}
        >
          {testimonials.map((t, index) => {
            const slot = slotOf(index);
            return (
              // eslint-disable-next-line @next/next/no-img-element -- srcSet comes from getImageProps; next/image would fight the 3D transforms
              <img
                key={t.src}
                src={t.src}
                srcSet={t.srcSet}
                sizes={t.sizes}
                alt={slot === "active" ? (t.alt ?? t.name) : ""}
                aria-hidden={slot !== "active"}
                draggable={false}
                decoding="async"
                onClick={slot === "left" ? handlePrev : slot === "right" ? handleNext : undefined}
                className={cn(
                  "absolute inset-0 h-full w-full select-none rounded-3xl object-cover",
                  "border border-white/10 shadow-float",
                  "transition-[transform,opacity] duration-[600ms] ease-out-strong motion-reduce:transition-opacity",
                  (slot === "left" || slot === "right") && "cursor-pointer",
                )}
                style={{ ...SLOT_STYLE[slot], objectPosition: t.objectPosition }}
              />
            );
          })}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between">
          <div aria-live="polite" className="min-h-[14rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, transform: "translateY(12px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)", transition: { duration: 0.3, ease: EASE_OUT } }}
                // Exit faster than enter: the old copy just needs to get out of the way
                exit={{ opacity: 0, transform: "translateY(-8px)", transition: { duration: 0.15, ease: EASE_OUT } }}
              >
                <h3
                  className="font-semibold tracking-tight"
                  style={{ color: "var(--ct-name)", fontSize: "var(--ct-size-name)" }}
                >
                  {active.name}
                </h3>
                <p
                  className="mt-1 mb-6 font-mono tabular-nums"
                  style={{ color: "var(--ct-designation)", fontSize: "var(--ct-size-designation)" }}
                >
                  {active.designation}
                </p>
                <p
                  className="max-w-[48ch] leading-relaxed"
                  style={{ color: "var(--ct-quote)", fontSize: "var(--ct-size-quote)" }}
                >
                  {reduced
                    ? active.quote
                    : words.map((word, i) => (
                        <motion.span
                          key={i}
                          className="inline-block"
                          initial={{ filter: "blur(4px)", opacity: 0, transform: "translateY(4px)" }}
                          animate={{ filter: "blur(0px)", opacity: 1, transform: "translateY(0px)" }}
                          transition={{ duration: 0.25, ease: EASE_OUT, delay: Math.min(i * 0.015, 0.4) }}
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 pt-10">
            <ArrowButton label="Previous" onClick={handlePrev} back />
            <ArrowButton label="Next" onClick={handleNext} />
            <span className="meta ml-2 tabular-nums" aria-hidden="true">
              {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function ArrowButton({ label, onClick, back = false }: { label: string; onClick: () => void; back?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "cursor-target grid size-11 cursor-pointer place-items-center rounded-full border border-white/15",
        "bg-[var(--ct-arrow-bg)] text-[var(--ct-arrow-fg)]",
        "hover:border-[var(--ct-arrow-hover)] hover:bg-[var(--ct-arrow-hover)] hover:text-ink",
        "transition-[background-color,border-color,color,scale] duration-300 ease-out-expo active:scale-[0.97] active:duration-150",
      )}
    >
      {back ? <ArrowLeftIcon size={18} weight="bold" /> : <ArrowRightIcon size={18} weight="bold" />}
    </button>
  );
}

export default CircularTestimonials;
