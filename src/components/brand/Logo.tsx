/*
 * EduPuig brand marks (v6). Shapes use `currentColor`, so the parent sets the colour —
 * use `text-logo` to get the theme-aware token. The orange eye of the P is fixed.
 * Both marks are drawn upright on a unit grid and slanted 12° with one skew matrix
 * (tan 12° ≈ 0.2126, pivoting on the baseline y = 16).
 */

type MarkProps = { className?: string };

const SKEW = "matrix(1 0 -0.2126 1 3.4009 0)";

/** Monogram "EP" (v6 · B): one solid mass, E counter closed against the P stem. */
export function LogoMark({ className }: MarkProps) {
  return (
    <svg viewBox="0.5 -0.5 23 22" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        fillRule="evenodd"
        transform={SKEW}
        d="M0 4 A4 4 0 0 1 4 0 H13 A8 8 0 0 1 13 16 V20 A1 1 0 0 1 12 21 H10 A1 1 0 0 1 9 20 V16 H4 A4 4 0 0 1 0 12 Z M4 4 H9 V12 H4 V9.5 H6.5 V6.5 H4 Z M13 4 A4 4 0 0 1 13 12 Z"
      />
      <circle cx="16.3" cy="8" r="1" className="fill-logo-accent" />
    </svg>
  );
}

/** Wordmark "Edu Puig" (variant 1): orange eye inside the P, like the monogram. */
export function LogoWordmark({ className }: MarkProps) {
  return (
    <svg viewBox="0.5 -0.75 79 22" className={className} aria-hidden="true" focusable="false">
      <g fill="currentColor" fillRule="evenodd" transform={SKEW}>
        {/* E */}
        <path d="M0 4 A4 4 0 0 1 4 0 H9 V4 H4 V6.5 H7.5 V9.5 H4 V12 H9 V16 H4 A4 4 0 0 1 0 12 Z" />
        {/* d */}
        <path transform="translate(10.6 0)" d="M6 0 H9.6 V16 H6 A6 6 0 0 1 6 4 Z M6 7.6 A2.4 2.4 0 0 0 6 12.4 Z" />
        {/* u */}
        <path transform="translate(21.8 0)" d="M0 4 H3.6 V11 A1.4 1.4 0 0 0 6.4 11 V4 H10 V16 H5 A5 5 0 0 1 0 11 Z" />
        {/* P (stem drops below the baseline, as in the monogram) */}
        <path
          transform="translate(37.3 0)"
          d="M0 0 H3.6 A8 8 0 0 1 3.6 16 V20 A1 1 0 0 1 2.6 21 H1 A1 1 0 0 1 0 20 Z M3.6 4 A4 4 0 0 1 3.6 12 Z"
        />
        {/* u */}
        <path transform="translate(50.1 0)" d="M0 4 H3.6 V11 A1.4 1.4 0 0 0 6.4 11 V4 H10 V16 H5 A5 5 0 0 1 0 11 Z" />
        {/* i (stem) */}
        <path transform="translate(61.7 0)" d="M0 4 H3.6 V16 H0 Z" />
        {/* g */}
        <path
          transform="translate(66.9 0)"
          d="M6 4 H9.6 V19 A2 2 0 0 1 7.6 21 H1 A1 1 0 0 1 0 20 V18.6 A1 1 0 0 1 1 17.6 H6 V16 A6 6 0 0 1 6 4 Z M6 7.6 A2.4 2.4 0 0 0 6 12.4 Z"
        />
      </g>
      {/* Dots sit outside the skew so they stay perfectly round */}
      <circle cx="44.2" cy="8" r="1" className="fill-logo-accent" />
      <circle cx="66.65" cy="1.2" r="1.75" fill="currentColor" />
    </svg>
  );
}
