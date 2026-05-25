import Image from "next/image";
import Navbar from "@/components/Navbar";

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

// ─── Icons ───────────────────────────────────────────────────────────────────

function IconBrowser() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path strokeLinecap="round" d="M2 8h20" />
      <circle cx="6" cy="5.5" r="0.8" fill="currentColor" />
      <circle cx="9" cy="5.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function IconBrain() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 2a2.5 2.5 0 0 1 5 0v.5A2.5 2.5 0 0 1 17 5v.5a2.5 2.5 0 0 1 0 5v.5a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 7 11v-.5a2.5 2.5 0 0 1 0-5V5a2.5 2.5 0 0 1 2.5-2.5Z" />
      <path strokeLinecap="round" d="M12 13v9M8 22h8" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path strokeLinecap="round" d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  );
}

function IconGitBranch() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path strokeLinecap="round" d="M6 9v6M6 9a9 9 0 0 0 9 9M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </svg>
  );
}

function IconLightbulb() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m1.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

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

      {/* Geometric lines BEHIND the photo */}
      <svg
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
        viewBox="0 0 1200 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <polygon
          points="870,40 1180,820 560,820"
          stroke="white"
          strokeWidth="1.2"
          strokeOpacity="0.1"
          fill="none"
        />
        <polygon
          points="870,180 1100,740 640,740"
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.06"
          fill="none"
        />
        <circle cx="870" cy="40" r="4" fill="#5580d8" fillOpacity="0.5" />
        <circle cx="1180" cy="820" r="4" fill="#5580d8" fillOpacity="0.5" />
        <circle cx="560" cy="820" r="4" fill="#5580d8" fillOpacity="0.5" />
      </svg>

      {/* Photo — full right side, bleeds top-to-bottom */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] z-[10] pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src="/res/edu-portrait.png"
          alt=""
          fill
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
              href="#portfolio"
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

const skills = [
  { label: "Java / Liferay DXP", pct: 90 },
  { label: "Python / AI & LLM", pct: 82 },
  { label: "Frontend Development", pct: 75 },
  { label: "DevOps & CI/CD", pct: 70 },
] as const;

function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: styled code card */}
        <div className="relative max-w-sm mx-auto lg:mx-0 w-full">
          <div className="relative rounded-xl overflow-hidden bg-[#0e1230] border border-[#2d5ec8]/15 aspect-[4/5]">
            <pre
              className="absolute inset-0 text-xs text-white/20 overflow-hidden p-6 leading-relaxed select-none font-mono"
              aria-hidden="true"
            >{`public class Engineer {

  String name = "Eduard Puig";
  String role = "DX Engineer";
  String company = "NTT DATA";

  // 3+ years enterprise dev

  @Agile
  void lead() {
    sprint.plan();
    team.coordinate();
    client.engage();
  }

  @AI
  Bot buildChatbot() {
    return new RAGBot(
      llm: AzureOpenAI,
      data: enterpriseDB
    );
  }

  @Java
  Portal buildPortal() {
    return Liferay.DXP
      .withComponents()
      .deploy();
  }
}`}</pre>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1230]/70 via-transparent to-transparent" />
            {/* Dual-color bottom bar — blue left, warm right */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2d5ec8] to-[#c91029]" />
          </div>

          {/* Experience badge */}
          <div className="absolute -bottom-5 -right-5 bg-[#c91029] text-white p-4 rounded-xl shadow-2xl shadow-[#c91029]/30 text-center">
            <span className="block text-4xl font-bold leading-none">3+</span>
            <span className="block text-[11px] font-semibold mt-1.5 leading-tight uppercase tracking-wide">
              Years of
              <br />
              Experience
            </span>
          </div>
        </div>

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

          <div className="space-y-5">
            {skills.map((skill) => (
              <div key={skill.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[#b8ccec]">
                    {skill.label}
                  </span>
                  <span className="text-sm font-bold text-[#7a9ad0]">
                    {skill.pct}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#2d5ec8] to-[#5580d8]"
                    style={{ width: `${skill.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="mailto:edupuigjunior.6@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c91029] hover:bg-[#ab0d22] text-white font-semibold rounded transition-colors duration-200 cursor-pointer text-sm"
            >
              Hire Me
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-[#2d5ec8]/50 text-[#b8ccec] hover:text-white font-semibold rounded transition-colors duration-200 cursor-pointer text-sm"
            >
              My Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

const services = [
  {
    icon: <IconBrowser />,
    title: "Enterprise Web Portals",
    description:
      "Scalable Liferay DXP portals and Java backend systems for large international organizations.",
  },
  {
    icon: <IconBrain />,
    title: "AI & Chatbot Solutions",
    description:
      "Intelligent chatbots using Python, Azure OpenAI, LLM, and RAG architecture for real operational impact.",
  },
  {
    icon: <IconUsers />,
    title: "Technical Leadership",
    description:
      "Agile team coordination, sprint planning, backlog refinement, and international client management.",
  },
  {
    icon: <IconGitBranch />,
    title: "DevOps & CI/CD",
    description:
      "End-to-end pipelines with Jenkins, SonarQube, Git Flow, and quality-gate best practices.",
  },
  {
    icon: <IconCode />,
    title: "Frontend Development",
    description:
      "Reusable component libraries with HTML, CSS, JavaScript and modern frameworks for enterprise UIs.",
  },
  {
    icon: <IconLightbulb />,
    title: "Digital Consulting",
    description:
      "Architecture decisions, tech stack selection, and digital transformation strategy for complex projects.",
  },
] as const;

function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-[#0a0d22]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <span className="text-[#7a9ad0] font-semibold text-xs tracking-widest uppercase">
            What I Do
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold">My Services</h2>
          <p className="mt-4 text-[#8090b8] text-sm max-w-xl mx-auto leading-relaxed">
            End-to-end engineering solutions — from enterprise portals to AI
            systems — tailored for real business impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 bg-[#07091c] hover:bg-[#2d5ec8] border border-[#2d5ec8]/15 hover:border-[#2d5ec8] rounded-xl transition-all duration-300 cursor-pointer"
            >
              <div className="mb-4 text-[#2d5ec8] group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-base font-bold mb-2 group-hover:text-white">
                {service.title}
              </h3>
              <p className="text-[#8090b8] group-hover:text-blue-100 text-sm leading-relaxed transition-colors duration-300">
                {service.description}
              </p>
              <div className="mt-5 text-[#2d5ec8] group-hover:text-white transition-colors duration-300">
                <IconArrow />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats ───────────────────────────────────────────────────────────────────

const stats: { value: string; label: string; highlight?: boolean }[] = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Projects Delivered", highlight: true },
  { value: "5+", label: "AI Solutions Built" },
  { value: "2", label: "Industries Served" },
];

function StatsSection() {
  return (
    <section className="py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/4 rounded-xl overflow-hidden">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center justify-center py-10 px-6 text-center ${
              stat.highlight ? "bg-[#c91029]" : "bg-[#07091c]"
            }`}
          >
            <span
              className={`text-4xl lg:text-5xl font-bold ${
                stat.highlight ? "text-white" : "text-[#5580d8]"
              }`}
            >
              {stat.value}
            </span>
            <span
              className={`mt-2 text-xs font-semibold uppercase tracking-wider ${
                stat.highlight ? "text-red-100" : "text-[#8090b8]"
              }`}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Portfolio ───────────────────────────────────────────────────────────────

const projects = [
  {
    tag: "AI / Python",
    title: "Industrial AI Chatbot",
    description:
      "Multi-bot RAG system for an industrial NTT DATA client using Azure OpenAI, Python, and enterprise databases.",
    color: "from-[#c91029]/25 to-[#07091c]",
  },
  {
    tag: "Java / Liferay",
    title: "Enterprise Portal Migration",
    description:
      "Full migration and modernization of a large-scale Liferay DXP portal for an international organization.",
    color: "from-[#2d5ec8]/30 to-[#07091c]",
  },
  {
    tag: "Hardware / Embedded",
    title: "Padel Analytics Sensor",
    description:
      "UPF thesis: embedded motion sensor in a padel racket to extract real-time player performance kinematics.",
    color: "from-[#0e1230] to-[#07091c]",
  },
  {
    tag: "Next.js / React",
    title: "MeetEd Portfolio",
    description:
      "This very portfolio — built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.",
    color: "from-[#2050b8]/25 to-[#07091c]",
  },
  {
    tag: "Business / Growth",
    title: "Startup Lead Pipeline",
    description:
      "Built and managed a B2B lead-generation pipeline for tech startups seeking public funding at Intelectium.",
    color: "from-[#c91029]/20 to-[#07091c]",
  },
  {
    tag: "DevOps / CI-CD",
    title: "CI/CD Quality Gates",
    description:
      "End-to-end Jenkins pipelines with SonarQube quality gates and JUnit integration test suites.",
    color: "from-[#0e1230] to-[#07091c]",
  },
] as const;

function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <span className="text-[#7a9ad0] font-semibold text-xs tracking-widest uppercase">
            My Work
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold">My Portfolio</h2>
          <p className="mt-4 text-[#8090b8] text-sm max-w-xl mx-auto leading-relaxed">
            A selection of enterprise, AI, and personal projects across multiple
            industries and technology stacks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`group relative rounded-xl overflow-hidden bg-gradient-to-br ${project.color} border border-[#2d5ec8]/12 hover:border-[#2d5ec8]/40 transition-all duration-300 cursor-pointer aspect-[4/3] flex flex-col justify-end`}
            >
              <div className="absolute inset-0 bg-[#2d5ec8]/0 group-hover:bg-[#2d5ec8]/8 transition-all duration-300" />
              <div className="relative p-6">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#7a9ad0] bg-[#2d5ec8]/15 px-2.5 py-1 rounded mb-3">
                  {project.tag}
                </span>
                <h3 className="text-base font-bold mb-1.5">{project.title}</h3>
                <p className="text-[#8090b8] text-xs leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.linkedin.com/in/eduardpuigvalls"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/12 hover:border-[#2d5ec8]/50 hover:text-[#7a9ad0] text-[#b8ccec] font-semibold rounded transition-colors duration-200 cursor-pointer text-sm"
          >
            View All on LinkedIn
            <IconArrow />
          </a>
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
            href="https://www.linkedin.com/in/eduardpuigvalls"
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
        <ServicesSection />
        <StatsSection />
        <PortfolioSection />
        <ContactSection />
        <FooterSection />
      </main>
    </>
  );
}
