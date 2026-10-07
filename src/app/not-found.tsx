import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-ink px-6 sm:px-8 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_20%,rgba(45,94,200,0.16),transparent_70%),radial-gradient(ellipse_40%_40%_at_10%_90%,rgba(191,29,51,0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-7xl">
        <span className="eyebrow">404 · Page not found</span>
        <h1 className="mt-4 max-w-[14ch] text-5xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
          This route does not exist.
        </h1>
        <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted">
          The link may be outdated or mistyped. Everything lives on the home page.
        </p>
        <Link href="/" className="btn btn-primary mt-10">
          Back to home
        </Link>
      </div>
    </main>
  );
}
