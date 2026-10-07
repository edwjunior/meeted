import { existsSync } from "node:fs";
import { join } from "node:path";
import Image, { getImageProps, type StaticImageData } from "next/image";
import Navbar from "@/components/Navbar";
import SkillsBars from "@/components/SkillsBars";
import ProfileWritter from "@/components/ProfileWritter";
import WorkSection from "@/components/PortfolioCards";
import StatsTicker from "@/components/StatsTicker";
import { SqueezeCarousel, type SqueezeSlide } from "@/components/ui/carousel-squeeze";
import { IconDownload, IconArrow } from "@/components/icons";
import padelPhoto from "../../public/res/personal/padel.webp";
import crossfitPhoto from "../../public/res/personal/crossfit.webp";
import dronePhoto from "../../public/res/personal/drone.webp";

// Palette lives in globals.css (@theme). Use token utilities: bg-ink, text-muted, bg-accent…

const EMAIL = "edupuigjunior.6@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/eduard-puig-valls/";

// Drop the PDF in public/res/ and the "Download CV" button appears automatically.
// Checked at build time (Server Component), so no dead link ships in the meantime.
const CV_PATH = "/res/eduard-puig-valls-cv.pdf";
const hasCv = existsSync(join(process.cwd(), "public", CV_PATH));

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20"
    >
      {/* Warm-red corner blocks — echo the photo's right-side warm light */}
      <div
        className="absolute top-0 left-0 w-28 h-[420px] bg-accent -translate-x-10 rounded-r-sm z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-28 h-[420px] bg-accent translate-x-10 rounded-l-sm z-0"
        aria-hidden="true"
      />

      {/* Photo — full right side, bleeds top-to-bottom */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] z-10 pointer-events-none">
        <Image
          src="/res/edu-portrait.png"
          alt="Portrait of Eduard Puig Valls"
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover object-[50%_10%]"
          priority
        />
        {/* Left edge fade — precise curve so face stays fully visible */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#07091c_0%,rgba(7,9,28,0.5)_25%,rgba(7,9,28,0.08)_45%,transparent_62%)]"
          aria-hidden="true"
        />
        {/* Top edge fade */}
        <div
          className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-ink/80 to-transparent"
          aria-hidden="true"
        />
        {/* Bottom edge fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-ink to-transparent"
          aria-hidden="true"
        />
        {/* Mobile dark overlay */}
        <div className="absolute inset-0 bg-ink/55 lg:bg-transparent" aria-hidden="true" />
      </div>

      {/* Text content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full pt-20 pb-24">
        {/* First-visit entrance: each block rises 60ms after the previous one */}
        <div className="max-w-xl space-y-8 [&>*]:animate-rise">
          <span className="eyebrow text-sm [animation-delay:0ms]">Hello, I am</span>

          <div className="[animation-delay:60ms]">
            <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[0.98] tracking-[-0.035em]">
              Eduard
              <br />
              Puig Valls
            </h1>
            <p className="mt-5 text-xl text-subtle font-medium">
              Digital Experience Engineer
            </p>
          </div>

          <p className="text-muted text-base leading-relaxed max-w-[52ch] [animation-delay:120ms]">
            Software Engineer with 3+ years building enterprise-grade digital
            platforms and AI solutions at NTT DATA. Expert in Java, Python, LLM
            &amp; RAG architectures. Based in Barcelona.
          </p>

          <div className="flex flex-wrap gap-4 [animation-delay:180ms]">
            {hasCv ? (
              <a href={CV_PATH} download className="btn btn-primary">
                <IconDownload />
                Download CV
              </a>
            ) : (
              <a href={`mailto:${EMAIL}`} className="btn btn-primary">
                Get in touch
              </a>
            )}
            <a href="#work" className="btn btn-ghost text-white">
              My work
            </a>
          </div>

          {/* Scroll cue — a soft drift, not a bounce */}
          <div className="pt-4 [animation-delay:240ms]" aria-hidden="true">
            <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <div className="w-0.5 h-2.5 bg-accent rounded-full animate-scroll-cue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="pt-24 pb-28 lg:pt-32 lg:pb-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: styled code card */}
        <ProfileWritter />
        {/* Right: text + skills */}
        <div className="space-y-8 lg:pl-4">
          <div>
            <span className="eyebrow">01 · About me</span>
            <h2 className="mt-4 text-3xl lg:text-[2.75rem] font-bold leading-[1.08] tracking-[-0.025em]">
              Building scalable digital experiences
            </h2>
          </div>

          <p className="text-muted leading-relaxed text-base max-w-[60ch]">
            Audiovisual Systems Engineer (UPF Barcelona) turned Software
            Engineer. At NTT DATA I lead cross-functional teams, architect
            enterprise Liferay portals in Java, and deliver AI chatbot solutions
            using Python, Azure, LLM and RAG — with measurable operational
            impact for industrial clients worldwide.
          </p>

          <SkillsBars />

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <a href={`mailto:${EMAIL}`} className="btn btn-primary">
              Hire me
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-pale hover:text-white transition-colors duration-200"
            >
              See projects
              <span className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1">
                <IconArrow />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Personal ────────────────────────────────────────────────────────────────

/** Corner label on the open panel — same mono style as the section eyebrows. */
const panelMark = (n: number, name: string) => (
  <span className="font-mono text-xs text-white/90">
    0{n} · {name}
  </span>
);

/**
 * Runs the photo through the Next.js image optimizer: the browser picks a resized
 * WebP from `srcSet` instead of downloading the original (padel.webp is 4725px / 1.8 MB).
 * The open panel is at most ~720px wide, so `sizes` lets a 2x screen settle on ~1440px.
 */
function photo(img: StaticImageData, alt: string) {
  const { props } = getImageProps({
    src: img,
    alt,
    sizes: "(max-width: 640px) 100vw, 720px",
  });
  return {
    image: props.src,
    imageSrcSet: props.srcSet,
    imageSizes: props.sizes,
    imageAlt: alt,
  };
}

// The photos are portraits; the carousel crops them to 16:9.
// `imagePosition` picks the band that stays visible (vertical % = where the subject is).
const personalSlides: SqueezeSlide[] = [
  {
    id: "padel",
    title: "Padel.",
    description:
      "My go-to sport. I even built a sensor for my racket as my thesis — combining sport and engineering felt completely natural.",
    ...photo(padelPhoto, "Eduard on a padel court, racket in hand, next to the net"),
    imagePosition: "50% 42%",
    overlay: panelMark(1, "Padel"),
  },
  {
    id: "crossfit",
    title: "Crossfit.",
    description:
      "Discipline outside the gym translates directly to work. Consistency, pushing limits, and measuring progress — every session.",
    ...photo(crossfitPhoto, "Eduard holding a barbell overhead at a CrossFit competition"),
    imagePosition: "50% 30%",
    overlay: panelMark(2, "Crossfit"),
  },
  {
    id: "drone",
    title: "Drone pilot.",
    // TODO(eduard): texto definitivo
    description: "Placeholder — final copy coming soon.",
    ...photo(dronePhoto, "Eduard wearing FPV goggles, launching a small drone from his hand"),
    imagePosition: "50% 38%",
    overlay: panelMark(3, "Drone pilot"),
  },
];

function PersonalSection() {
  return (
    <section id="personal" className="pt-24 pb-28 lg:pt-32 lg:pb-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">03 · Beyond the code</span>
            <h2 className="mt-4 text-3xl lg:text-[2.75rem] font-bold leading-[1.08] tracking-[-0.025em]">
              A bit about me
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted text-base max-w-[48ch] leading-relaxed">
            Not everything is code — here&apos;s what keeps me going outside work.
          </p>
        </div>

        <SqueezeCarousel
          slides={personalSlides}
          label="Beyond the code"
          accent="var(--color-accent)"
          accentForeground="#fff"
          panelClassName="bg-surface-raised"
          height="clamp(150px, 30cqi, 400px)"
          gap="clamp(8px, 1.5cqi, 16px)"
          // Inherit DM Sans instead of the component's bundled Geist
          style={{ fontFamily: "inherit" }}
        />
      </div>
    </section>
  );
}

// ─── Contact CTA ─────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden pt-24 pb-28 lg:pt-32 lg:pb-40 bg-surface border-t border-white/5"
    >
      {/* Ambient warm/cool glow — mirrors the hero photo lighting */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_100%,rgba(191,29,51,0.14),transparent_70%),radial-gradient(ellipse_50%_60%_at_90%_0%,rgba(45,94,200,0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <span className="eyebrow">04 · Ready to collaborate</span>
        <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.035em] max-w-[16ch]">
          I&apos;m available for new opportunities
        </h2>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-6 text-muted text-base leading-relaxed max-w-[52ch]">
            Looking for a senior engineer who bridges deep Java &amp; Python
            expertise with technical leadership and AI delivery? Let&apos;s talk.
          </p>
          <div className="lg:col-span-6 flex flex-wrap items-center gap-4 lg:justify-end">
            <a href={`mailto:${EMAIL}`} className="btn btn-primary px-7">
              Contact me
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost px-7 text-white"
            >
              LinkedIn
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function FooterSection() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted/60">
        <p>&copy; {new Date().getFullYear()} Eduard Puig Valls</p>
        <div className="flex items-center gap-6">
          <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors duration-200">
            Email
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a href="#home" className="hover:text-white transition-colors duration-200">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-ink text-fg overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <StatsTicker />
        <PersonalSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
