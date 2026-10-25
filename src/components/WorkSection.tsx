import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";
import { LINKEDIN } from "@/lib/site";

const services = [
  { title: "Enterprise web portals", description: "Liferay DXP portals and Java backend systems for large organizations." },
  { title: "AI and chatbot solutions", description: "Intelligent chatbots using Python, Azure OpenAI, LLM and RAG." },
  { title: "Technical leadership", description: "Agile team coordination, sprint planning and client management." },
  { title: "DevOps and CI/CD", description: "End-to-end pipelines with Jenkins, SonarQube and quality gates." },
  { title: "Frontend development", description: "Reusable component libraries with HTML, CSS, JS and modern frameworks." },
  { title: "Digital consulting", description: "Architecture decisions, tech stack selection and transformation strategy." },
];

/** Tile surfaces — varied on purpose so the bento is not six identical cards. */
const SURFACE = {
  emberTop: "bg-ink-2 bg-[radial-gradient(ellipse_70%_90%_at_100%_0%,rgb(255_91_46/0.22),transparent_70%)]",
  emberBottom: "bg-ink-2 bg-[radial-gradient(ellipse_60%_80%_at_0%_100%,rgb(255_91_46/0.16),transparent_70%)]",
  dots: "bg-ink-2 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:18px_18px]",
  plain: "bg-ink-2",
  raised: "bg-ink-3",
};

// Bento on lg (6 columns): rows of 4+2 / 2+4 / 3+3 — six projects, six cells, no gaps
const projects = [
  {
    tag: "AI / Python",
    title: "Industrial AI chatbot",
    description: "Multi-bot RAG system for an industrial NTT DATA client using Azure OpenAI, Python and enterprise databases.",
    tech: ["Python", "Azure OpenAI", "RAG", "LLM"],
    span: "lg:col-span-4",
    surface: SURFACE.emberTop,
    featured: true,
  },
  {
    tag: "Java / Liferay",
    title: "Enterprise portal migration",
    description: "Full migration and modernization of a large-scale Liferay DXP portal for an international organization.",
    tech: ["Java", "Liferay DXP", "CI/CD"],
    span: "lg:col-span-2",
    surface: SURFACE.dots,
  },
  {
    tag: "Hardware / Embedded",
    title: "Padel analytics sensor",
    description: "UPF thesis: a motion sensor embedded in a padel racket to extract real-time player kinematics.",
    tech: ["Embedded C", "Hardware", "Signal processing"],
    span: "lg:col-span-2",
    surface: SURFACE.raised,
  },
  {
    tag: "Next.js / React",
    title: "MeetEd portfolio",
    description: "This portfolio, built with Next.js 16, React 19, TypeScript, Tailwind CSS v4 and GSAP.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "GSAP"],
    span: "lg:col-span-4",
    surface: SURFACE.emberBottom,
    featured: true,
  },
  {
    tag: "Business / Growth",
    title: "Startup lead pipeline",
    description: "Built and managed a B2B lead-generation pipeline for tech startups seeking public funding at Intelectium.",
    tech: ["B2B", "Growth", "Intelectium"],
    span: "lg:col-span-3",
    surface: SURFACE.dots,
  },
  {
    tag: "DevOps / CI-CD",
    title: "CI/CD quality gates",
    description: "End-to-end Jenkins pipelines with SonarQube quality gates and JUnit integration test suites.",
    tech: ["Jenkins", "SonarQube", "JUnit", "Git Flow"],
    span: "lg:col-span-3",
    surface: SURFACE.plain,
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="section">
      <div className="container-x">
        <h2 className="display-h2 max-w-4xl">
          Work <span className="text-brand-400">&amp;</span> projects
        </h2>
        <p className="lead mt-6">End-to-end engineering, from enterprise portals to AI systems and personal builds.</p>

        {/* What I do — two grouped columns instead of one long list */}
        <div className="mt-20 md:mt-28">
          <h3 className="display-h3">What I do</h3>
          <ol className="mt-10 grid gap-x-16 md:grid-cols-2">
            {services.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-white/10 py-6">
                <span className="meta pt-1 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-xl font-medium tracking-tight text-paper">{s.title}</p>
                  <p className="mt-2 max-w-[48ch] text-secondary">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Selected projects — bento */}
        <div className="mt-24 md:mt-32">
          <h3 className="display-h3">Selected projects</h3>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {projects.map((p) => (
              <li
                key={p.title}
                className={cn(
                  "flex min-h-[18rem] flex-col justify-between gap-10 rounded-3xl border border-white/10 p-7 md:p-8",
                  p.surface,
                  p.span,
                )}
              >
                <span className="meta">{p.tag}</span>
                <div>
                  <h4
                    className={cn(
                      "font-semibold tracking-tight text-paper",
                      p.featured ? "text-3xl md:text-[2.5rem] md:leading-[1.05]" : "text-2xl",
                    )}
                  >
                    {p.title}
                  </h4>
                  <p className="mt-3 max-w-[52ch] text-secondary">{p.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                    {p.tech.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-target mt-12 inline-flex items-center gap-3 rounded-full font-medium text-paper"
          >
            More on LinkedIn
            <span className="uv-arrow">
              <ArrowRightIcon size={14} weight="bold" />
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
