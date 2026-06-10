import Image from "next/image";
import Navbar from "@/components/Navbar";
import SkillsBars from "@/components/SkillsBars";
import ProfileWritter from "@/components/ProfileWritter";
import WorkSection from "@/components/PortfolioCards";
import StatsTicker from "@/components/StatsTicker";
import { IconBrain, IconRacket, IconDumbbell, IconDownload } from "@/components/icons";

// Photo-derived palette:
//   bg dark   #07091c  — photo background
//   blue      #2d5ec8  — cool left light
//   blue dim  #2050b8  — blue hover / darker
//   blue mid  #5580d8  — mid blue tones
//   blue muted #7a9ad0 — labels, accent text
//   blue pale  #b8ccec — light text on dark
//   warm red  #c91029  — warm right light
//   warm dark  #ab0d22 — red hover / darker
//   text       #e8ecf8 — near-white with blue tint

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Warm-red corner blocks — echo the photo's right-side warm light */}
      <div
        className="absolute top-0 left-0 w-28 h-[420px] bg-[#c91029] -translate-x-10 rounded-r-sm z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-28 h-[420px] bg-[#c91029] translate-x-10 rounded-l-sm z-0"
        aria-hidden="true"
      />

      {/* Photo — full right side, bleeds top-to-bottom */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] z-[10] pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src="/res/edu-portrait.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-[50%_10%]"
          priority
        />
        {/* Left edge fade — precise curve so face stays fully visible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #07091c 0%, rgba(7,9,28,0.5) 25%, rgba(7,9,28,0.08) 45%, transparent 62%)",
          }}
        />
        {/* Top edge fade */}
        <div
          className="absolute top-0 left-0 right-0 h-24"
          style={{ background: "linear-gradient(to bottom, rgba(7,9,28,0.8), transparent)" }}
        />
        {/* Bottom edge fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-36"
          style={{ background: "linear-gradient(to top, #07091c, transparent)" }}
        />
        {/* Mobile dark overlay */}
        <div className="absolute inset-0 bg-[#07091c]/55 lg:bg-transparent" />
      </div>

      {/* Text content */}
      <div className="relative z-[30] max-w-7xl mx-auto px-8 lg:px-16 w-full py-20">
        <div className="max-w-xl space-y-8">
          <span className="inline-block bg-[#c91029] text-white text-sm font-semibold px-4 py-2 rounded">
            Hello, I am
          </span>

          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[1.02] tracking-tight">
              Eduard
              <br />
              Puig Valls
            </h1>
            <p className="mt-5 text-xl text-[#7a9ad0] font-semibold tracking-wide">
              Digital Experience Engineer
            </p>
          </div>

          <p className="text-[#8090b8] text-base leading-relaxed max-w-lg">
            Software Engineer with 3+ years building enterprise-grade digital
            platforms and AI solutions at NTT DATA. Expert in Java, Python, LLM
            &amp; RAG architectures. Based in Barcelona.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#c91029] hover:bg-[#ab0d22] text-white font-semibold rounded transition-colors duration-200 cursor-pointer text-sm"
            >
              <IconDownload />
              Download CV
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-white/20 hover:border-[#2d5ec8]/60 hover:text-[#7a9ad0] text-white font-semibold rounded transition-colors duration-200 cursor-pointer text-sm"
            >
              My Work
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="pt-4 opacity-50">
            <div className="w-5 h-9 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
              <div className="w-0.5 h-2.5 bg-[#c91029] rounded-full animate-bounce" />
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
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: styled code card */}
        <ProfileWritter />
        {/* Right: text + skills */}
        <div className="space-y-8 lg:pl-4">
          <div>
            <span className="text-[#7a9ad0] font-semibold text-xs tracking-widest uppercase">
              About Me
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold leading-tight">
              Building Scalable
              <br />
              Digital Experiences
            </h2>
          </div>

          <p className="text-[#8090b8] leading-relaxed text-sm">
            Audiovisual Systems Engineer (UPF Barcelona) turned Software
            Engineer. At NTT DATA I lead cross-functional teams, architect
            enterprise Liferay portals in Java, and deliver AI chatbot solutions
            using Python, Azure, LLM and RAG — with measurable operational
            impact for industrial clients worldwide.
          </p>

          <SkillsBars />

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="mailto:edupuigjunior.6@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c91029] hover:bg-[#ab0d22] text-white font-semibold rounded transition-colors duration-200 cursor-pointer text-sm"
            >
              Hire Me
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-[#2d5ec8]/50 text-[#b8ccec] hover:text-white font-semibold rounded transition-colors duration-200 cursor-pointer text-sm"
            >
              My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── Personal ────────────────────────────────────────────────────────────────

const hobbies = [
  {
    icon: <IconRacket />,
    title: "Padel",
    description:
      "My go-to sport. I even built a sensor for my racket as my thesis — combining sport and engineering felt completely natural.",
  },
  {
    icon: <IconDumbbell />,
    title: "Crossfit",
    description:
      "Discipline outside the gym translates directly to work. Consistency, pushing limits, and measuring progress — every session.",
  },
  {
    icon: <IconBrain />,
    title: "AI Tinkering",
    description:
      "Beyond client projects, I experiment with LLMs, RAG systems, and local models on my own time. The field moves fast and I love keeping up.",
  },
] as const;

function PersonalSection() {
  return (
    <section id="personal" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-14">
          <span className="text-[#7a9ad0] font-semibold text-xs tracking-widest uppercase">
            Beyond the Code
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold">A Bit About Me</h2>
          <p className="mt-4 text-[#8090b8] text-sm max-w-md mx-auto leading-relaxed">
            Not everything is code — here&apos;s what keeps me going outside work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {hobbies.map((hobby) => (
            <div
              key={hobby.title}
              className="flex flex-col items-start gap-5 p-7 bg-[#0a0d22] border border-[#c91029]/15 hover:border-[#c91029]/35 rounded-xl transition-colors duration-300"
            >
              <div className="text-[#c91029]">{hobby.icon}</div>
              <div>
                <h3 className="text-base font-bold mb-2">{hobby.title}</h3>
                <p className="text-[#8090b8] text-sm leading-relaxed">{hobby.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact CTA ─────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-[#0a0d22] border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
        <p className="text-[#7a9ad0] font-semibold text-xs tracking-widest uppercase mb-4">
          Ready to Collaborate
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          I&apos;m Available for
          <br />
          New Opportunities
        </h2>
        <p className="text-[#8090b8] text-sm leading-relaxed max-w-lg mx-auto mb-10">
          Looking for a senior engineer who bridges deep Java &amp; Python
          expertise with technical leadership and AI delivery? Let&apos;s talk.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:edupuigjunior.6@gmail.com"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#c91029] hover:bg-[#ab0d22] text-white font-semibold rounded transition-colors duration-200 cursor-pointer text-sm"
          >
            Contact Me
          </a>
          <a
            href="https://www.linkedin.com/in/eduard-puig-valls/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/15 hover:border-[#2d5ec8]/50 hover:text-[#7a9ad0] text-white font-semibold rounded transition-colors duration-200 cursor-pointer text-sm"
          >
            LinkedIn
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function FooterSection() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#8090b8]/50 text-sm">
          &copy; {new Date().getFullYear()} Eduard Puig Valls. All rights reserved.
        </p>
        <div className="flex items-center gap-1 text-[#8090b8]/50 text-sm">
          <span>Built with</span>
          <span className="text-[#5580d8] mx-1">Next.js</span>
          <span>&amp;</span>
          <span className="text-[#5580d8] mx-1">Tailwind CSS</span>
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
      <main className="bg-[#07091c] text-white overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <StatsTicker />
        <PersonalSection />
        <ContactSection />
        <FooterSection />
      </main>
    </>
  );
}
