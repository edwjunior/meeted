import { existsSync } from "node:fs";
import { join } from "node:path";
import { getImageProps, type StaticImageData } from "next/image";
import { ArrowUpIcon, ArrowUpRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";

import Navbar from "@/components/Navbar";
import WorkSection from "@/components/WorkSection";
import StatsTicker from "@/components/StatsTicker";
import Magnet from "@/components/interactions/Magnet";
import { CircularTestimonials, type Testimonial } from "@/components/ui/circular-testimonials";
import ProfileCard from "@/components/ui/profile-card";
import { CONTACT_LABEL, EMAIL, LINKEDIN } from "@/lib/site";
import portrait from "../../public/res/edu-portrait.png";
import padelPhoto from "../../public/res/personal/padel.webp";
import crossfitPhoto from "../../public/res/personal/crossfit.webp";
import dronePhoto from "../../public/res/personal/drone.webp";

// Drop the PDF in public/res/ and the "Download CV" button appears automatically.
// Checked at build time (Server Component), so no dead link ships in the meantime.
const CV_PATH = "/res/eduard-puig-valls-cv.pdf";
const hasCv = existsSync(join(process.cwd(), "public", CV_PATH));

// ─── Hero ────────────────────────────────────────────────────────────────────

// Optimized, responsive portrait for the profile card (the PNG source is 1685px / 4.6 MB)
const { props: portraitImg } = getImageProps({
  src: portrait,
  alt: "Portrait of Eduard Puig Valls",
  sizes: "(max-width: 1024px) 100vw, 448px",
});
const portraitProps = {
  avatarUrl: portraitImg.src,
  avatarSrcSet: portraitImg.srcSet,
  avatarSizes: portraitImg.sizes,
  avatarAlt: portraitImg.alt,
};

function HeroSection() {
  return (
    <section id="home" className="relative">
      <div className="container-x grid min-h-[100dvh] items-center gap-12 pb-16 pt-28 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        {/* First-visit entrance: each block rises 80ms after the previous one */}
        <div className="lg:col-span-7 [&>*]:animate-page-in">
          <h1 className="display-h1">
            Eduard
            <br />
            Puig Valls<span className="text-brand-500">.</span>
          </h1>

          <p className="lead mt-8 [animation-delay:80ms]">
            Digital Experience Engineer at NTT DATA. I build enterprise portals and AI products with Java,
            Python and LLMs.
          </p>

          {/* Paired magnets: gentler pull + wider gap so the two never collide (max 15px each, 32px apart) */}
          <div className="mt-10 flex flex-wrap items-center gap-8 [animation-delay:160ms]">
            <Magnet strength={8}>
              {hasCv ? (
                <a href={CV_PATH} download className="btn btn-primary cursor-target">
                  <DownloadSimpleIcon size={16} weight="bold" />
                  Download CV
                </a>
              ) : (
                <a href={`mailto:${EMAIL}`} className="btn btn-primary cursor-target">
                  {CONTACT_LABEL}
                </a>
              )}
            </Magnet>
            <Magnet strength={8}>
              <a href="#work" className="btn btn-ghost cursor-target">
                View work
              </a>
            </Magnet>
          </div>
        </div>

        {/* Holographic profile card (React Bits): tilts toward the cursor and catches the light once on load.
            Width is capped by viewport height so the whole card fits above the fold on short laptops. */}
        <div className="w-full animate-page-in justify-self-center [animation-delay:200ms] lg:col-span-5 lg:justify-self-end">
          <ProfileCard
            {...portraitProps}
            avatarPosition="50% 15%"
            avatarPriority
            handle="eduard-puig-valls"
            status="Available for new opportunities"
            radius={14}
            holo={0.45}
            glare={0.35}
            tiltStrength={10}
            parallax={8}
            className="mx-auto w-full max-w-[28rem] lg:mx-0 lg:ml-auto lg:max-w-[min(28rem,calc((100dvh-15rem)*0.8))]"
          />
        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

const experience = [
  {
    place: "NTT DATA",
    role: "Digital Experience Engineer",
    detail: "Java, Liferay DXP, Python, Azure OpenAI",
  },
  {
    place: "Intelectium",
    role: "Startup growth",
    detail: "B2B lead generation for startups seeking public funding",
  },
  {
    place: "UPF Barcelona",
    role: "Audiovisual Systems Engineering",
    detail: "Thesis: a motion sensor for a padel racket",
  },
];

function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <p className="eyebrow">About</p>
        <h2 className="display-h2 mt-6 max-w-5xl">
          From audiovisual systems to <span className="text-brand-400">enterprise software</span>.
        </h2>

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="lead">
              At NTT DATA I lead cross-functional teams, architect enterprise Liferay portals in Java and deliver AI
              chatbots with Python, Azure, LLM and RAG.
            </p>
            <p className="lead mt-6">The work runs in production for industrial clients worldwide.</p>

            <dl className="mt-12 flex items-end gap-5">
              <dt className="sr-only">Experience</dt>
              <dd className="display-h2 text-brand-400 tabular-nums">3+</dd>
              <dd className="max-w-[16ch] pb-2 text-secondary">years building enterprise platforms</dd>
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="text-sm text-mist">Experience</h3>
            <ul className="mt-6">
              {experience.map((e) => (
                <li key={e.place} className="grid gap-1 border-t border-white/10 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <p className="text-xl font-medium tracking-tight text-paper">{e.place}</p>
                  <div>
                    <p className="text-paper">{e.role}</p>
                    <p className="meta mt-2">{e.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Personal ────────────────────────────────────────────────────────────────

/**
 * Runs the photo through the Next.js image optimizer: the browser picks a resized
 * WebP from `srcSet` instead of downloading the original (padel.webp is 4725px / 1.8 MB).
 * The image card is at most ~620px wide, so `sizes` lets a 2x screen settle on ~1200px.
 */
function photo(img: StaticImageData, alt: string) {
  const { props } = getImageProps({
    src: img,
    alt,
    sizes: "(max-width: 768px) 100vw, 620px",
  });
  return { src: props.src, srcSet: props.srcSet, sizes: props.sizes, alt };
}

// The photos are portraits cropped into a wider card: `objectPosition` keeps the subject in frame.
const hobbies: Testimonial[] = [
  {
    name: "Padel",
    designation: "Sport and thesis",
    quote:
      "My go-to sport. I even built a sensor for my racket as my thesis: combining sport and engineering felt completely natural.",
    ...photo(padelPhoto, "Eduard on a padel court, racket in hand, next to the net"),
    objectPosition: "50% 40%",
  },
  {
    name: "Crossfit",
    designation: "Discipline",
    quote:
      "Discipline outside the gym translates directly to work. Consistency, pushing limits and measuring progress, every session.",
    ...photo(crossfitPhoto, "Eduard holding a barbell overhead at a CrossFit competition"),
    objectPosition: "50% 30%",
  },
  {
    name: "Drone pilot",
    designation: "FPV",
    // TODO(eduard): texto definitivo
    quote: "Placeholder: final copy coming soon.",
    ...photo(dronePhoto, "Eduard wearing FPV goggles, launching a small drone from his hand"),
    objectPosition: "50% 35%",
  },
];

function PersonalSection() {
  return (
    <section id="personal" className="section">
      <div className="container-x">
        <p className="eyebrow">Beyond the code</p>
        <h2 className="display-h2 mt-6">A bit about me</h2>
        <p className="lead mt-6">Not everything is code. Here&apos;s what keeps me going outside work.</p>

        <CircularTestimonials testimonials={hobbies} label="Beyond the code" className="mt-12 md:mt-20" />
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* One ember glow, low and to the left: the page's only light source */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_10%_110%,rgb(255_91_46/0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <h2 className="display-h2 max-w-5xl">
          Let&apos;s build something <span className="text-brand-400">together</span>.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="lead">
              Looking for an engineer who bridges deep Java and Python expertise with technical leadership and AI
              delivery? Let&apos;s talk.
            </p>
            <Magnet className="mt-10 inline-block">
              <a href={`mailto:${EMAIL}`} className="btn btn-primary cursor-target h-12 px-6 text-base">
                {CONTACT_LABEL}
              </a>
            </Magnet>
          </div>

          <dl className="grid content-start gap-8 lg:col-span-5 lg:col-start-8">
            <div className="border-t border-white/10 pt-5">
              <dt className="meta">Email</dt>
              <dd className="mt-2 text-xl tracking-tight text-paper">
                <a href={`mailto:${EMAIL}`} className="uv-link cursor-target">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="meta">LinkedIn</dt>
              <dd className="mt-2 text-xl tracking-tight text-paper">
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uv-link cursor-target inline-flex items-center gap-1.5"
                >
                  eduard-puig-valls
                  <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function FooterSection() {
  return (
    <footer className="border-t border-white/10 pt-20">
      <div className="container-x">
        <p className="display-footer text-paper/90" aria-hidden="true">
          Eduard Puig<span className="text-brand-500">.</span>
        </p>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta">&copy; {new Date().getFullYear()} Eduard Puig Valls. Barcelona</p>
          <ul className="flex items-center gap-6 text-sm text-secondary">
            <li>
              <a href={`mailto:${EMAIL}`} className="uv-link cursor-target">
                Email
              </a>
            </li>
            <li>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="uv-link cursor-target">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#home" className="uv-link cursor-target inline-flex items-center gap-1.5">
                Back to top
                <ArrowUpIcon size={13} weight="bold" aria-hidden="true" />
              </a>
            </li>
          </ul>
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
      <main id="main">
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
