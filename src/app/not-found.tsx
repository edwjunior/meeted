import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_85%_10%,rgb(255_91_46/0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <p className="eyebrow">Error 404</p>
        <h1 className="display-h2 mt-6 max-w-3xl">
          This page does not <span className="text-brand-400">exist</span>.
        </h1>
        <p className="lead mt-6">The link may be outdated or mistyped. Everything lives on the home page.</p>
        <Link href="/" className="btn btn-primary cursor-target mt-10">
          <ArrowLeftIcon size={16} weight="bold" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
