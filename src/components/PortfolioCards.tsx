"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconBrowser,
    IconBrain,
    IconUsers,
    IconGitBranch,
    IconCode,
    IconLightbulb,
    IconArrow,
} from "@/components/icons";

const services = [
    {
        icon: <IconBrowser />,
        title: "Enterprise Web Portals",
        description: "Liferay DXP portals and Java backend systems for large organizations.",
    },
    {
        icon: <IconBrain />,
        title: "AI & Chatbot Solutions",
        description: "Intelligent chatbots using Python, Azure OpenAI, LLM and RAG.",
    },
    {
        icon: <IconUsers />,
        title: "Technical Leadership",
        description: "Agile team coordination, sprint planning and client management.",
    },
    {
        icon: <IconGitBranch />,
        title: "DevOps & CI/CD",
        description: "End-to-end pipelines with Jenkins, SonarQube and quality gates.",
    },
    {
        icon: <IconCode />,
        title: "Frontend Development",
        description: "Reusable component libraries with HTML, CSS, JS and modern frameworks.",
    },
    {
        icon: <IconLightbulb />,
        title: "Digital Consulting",
        description: "Architecture decisions, tech stack selection and transformation strategy.",
    },
];

const projects = [
    {
        id: "ai-chatbot",
        tag: "AI / Python",
        title: "Industrial AI Chatbot",
        description:
            "Multi-bot RAG system for an industrial NTT DATA client using Azure OpenAI, Python, and enterprise databases.",
        color: "from-accent/25 to-ink",
        tech: ["Python", "Azure OpenAI", "RAG", "LLM"],
    },
    {
        id: "liferay-portal",
        tag: "Java / Liferay",
        title: "Enterprise Portal Migration",
        description:
            "Full migration and modernization of a large-scale Liferay DXP portal for an international organization.",
        color: "from-cool/30 to-ink",
        tech: ["Java", "Liferay DXP", "CI/CD"],
    },
    {
        id: "padel-sensor",
        tag: "Hardware / Embedded",
        title: "Padel Analytics Sensor",
        description:
            "UPF thesis: embedded motion sensor in a padel racket to extract real-time player performance kinematics.",
        color: "from-surface-raised to-ink",
        tech: ["Embedded C", "Hardware", "Signal Processing"],
    },
    {
        id: "meeted",
        tag: "Next.js / React",
        title: "MeetEd Portfolio",
        description:
            "This very portfolio — built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.",
        color: "from-cool-hover/25 to-ink",
        tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
    },
    {
        id: "startup-pipeline",
        tag: "Business / Growth",
        title: "Startup Lead Pipeline",
        description:
            "Built and managed a B2B lead-generation pipeline for tech startups seeking public funding at Intelectium.",
        color: "from-accent/20 to-ink",
        tech: ["B2B", "Growth", "Intelectium"],
    },
    {
        id: "cicd-gates",
        tag: "DevOps / CI-CD",
        title: "CI/CD Quality Gates",
        description:
            "End-to-end Jenkins pipelines with SonarQube quality gates and JUnit integration test suites.",
        color: "from-surface-raised to-ink",
        tech: ["Jenkins", "SonarQube", "JUnit", "Git Flow"],
    },
];

// Same curve as --ease-out-strong in globals.css
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Bento zig-zag on desktop (3 cols): rows of 2+1 / 1+2 / 2+1 — fills all 9 cells with 6 projects
const featured = new Set([0, 3, 4]);

export default function WorkSection() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = projects.find((p) => p.id === selectedId) ?? null;
    const closeRef = useRef<HTMLButtonElement>(null);

    // Modal behaviour: Esc closes, Tab stays inside, page does not scroll behind,
    // focus moves into the dialog and returns to the card that opened it
    useEffect(() => {
        if (!selectedId) return;
        const trigger = document.activeElement as HTMLElement | null;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedId(null);
            if (e.key === "Tab") {
                // The close button is the only focusable element in the dialog
                e.preventDefault();
                closeRef.current?.focus();
            }
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKey);
        closeRef.current?.focus();
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKey);
            trigger?.focus();
        };
    }, [selectedId]);

    return (
        <section id="work" className="pt-24 pb-28 lg:pt-32 lg:pb-40 bg-surface">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">

                {/* ── Section header ───────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
                    <div className="lg:col-span-7">
                        <span className="eyebrow">02 · My work</span>
                        <h2 className="mt-4 text-3xl lg:text-[2.75rem] font-bold leading-[1.08] tracking-[-0.025em]">
                            Work &amp; projects
                        </h2>
                    </div>
                    <p className="lg:col-span-5 text-muted text-base max-w-[48ch] leading-relaxed">
                        End-to-end engineering — from enterprise portals to AI systems and personal builds.
                    </p>
                </div>

                {/* ── Block 1: What I do ───────────────────────────── */}
                <div className="mb-24">
                    <h3 className="font-mono text-xs text-subtle mb-6">What I do</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 border-t border-white/8">
                        {services.map((service) => (
                            <li
                                key={service.title}
                                className="group flex items-start gap-4 py-6 border-b border-white/8"
                            >
                                <div className="shrink-0 text-cool-soft mt-0.5 transition-colors duration-200 group-hover:text-accent">
                                    {service.icon}
                                </div>
                                <div>
                                    <p className="text-base font-semibold text-fg mb-1">{service.title}</p>
                                    <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Block 2: Project highlights ──────────────────── */}
                <div>
                    <h3 className="font-mono text-xs text-subtle mb-6">Project highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {projects.map((project, i) => (
                            <button
                                type="button"
                                key={project.id}
                                onClick={() => setSelectedId(project.id)}
                                aria-haspopup="dialog"
                                className={`group relative text-left rounded-2xl overflow-hidden bg-gradient-to-br ${project.color} border border-cool/12 hover:border-cool/40 hover:-translate-y-1 active:scale-[0.98] transition-[translate,scale,border-color] duration-200 ease-out-strong cursor-pointer min-h-[260px] flex flex-col justify-end ${
                                    featured.has(i) ? "lg:col-span-2" : ""
                                }`}
                            >
                                <div className="absolute inset-0 bg-cool/0 group-hover:bg-cool/8 transition-colors duration-200" />
                                <div className="relative p-6 lg:p-7">
                                    <span className="inline-block font-mono text-[11px] text-subtle bg-cool/15 px-2 py-1 rounded-sm mb-3">
                                        {project.tag}
                                    </span>
                                    <h4
                                        className={`font-heading font-bold tracking-tight mb-1.5 ${
                                            featured.has(i) ? "text-2xl" : "text-lg"
                                        }`}
                                    >
                                        {project.title}
                                    </h4>
                                    <p className="text-muted text-sm leading-relaxed line-clamp-2 max-w-[52ch]">
                                        {project.description}
                                    </p>
                                    <div className="mt-4 w-fit text-cool-soft group-hover:text-white transition-[color,translate] duration-200 ease-out-strong group-hover:translate-x-1">
                                        <IconArrow />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-10">
                        <a
                            href="https://www.linkedin.com/in/eduard-puig-valls/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-pale hover:text-white transition-colors duration-200"
                        >
                            View all on LinkedIn
                            <span className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1">
                                <IconArrow />
                            </span>
                        </a>
                    </div>
                </div>

                {/* ── Project modal ─────────────────────────────────── */}
                <AnimatePresence>
                    {selected && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }}
                                exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeOut" } }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-[55]"
                                aria-hidden="true"
                            />

                            <div className="fixed inset-0 flex items-center justify-center z-[55] p-4 pointer-events-none">
                                {/* Modals stay centered: scale from 0.96 (never 0) + fade.
                                    Full transform strings keep the animation hardware-accelerated.
                                    Exit is faster than enter: the user is done, the system responds. */}
                                <motion.div
                                    initial={{ opacity: 0, transform: "scale(0.96) translateY(8px)" }}
                                    animate={{ opacity: 1, transform: "scale(1) translateY(0px)", transition: { duration: 0.25, ease: EASE_OUT } }}
                                    exit={{ opacity: 0, transform: "scale(0.98) translateY(0px)", transition: { duration: 0.15, ease: EASE_OUT } }}
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="project-dialog-title"
                                    className="bg-surface-raised border border-cool/30 w-full max-w-2xl rounded-2xl shadow-2xl shadow-cool/10 overflow-hidden pointer-events-auto flex flex-col max-h-[90dvh]"
                                >
                                    <div className="p-8 overflow-y-auto">
                                        <div className="flex justify-between items-start gap-6 mb-5">
                                            <div>
                                                <span className="inline-block font-mono text-[11px] text-subtle bg-cool/15 px-2 py-1 rounded-sm mb-3">
                                                    {selected.tag}
                                                </span>
                                                <h4
                                                    id="project-dialog-title"
                                                    className="font-heading text-2xl font-bold tracking-tight text-white"
                                                >
                                                    {selected.title}
                                                </h4>
                                            </div>
                                            <button
                                                ref={closeRef}
                                                type="button"
                                                onClick={() => setSelectedId(null)}
                                                aria-label="Close project details"
                                                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-[background-color,transform] duration-200 shrink-0 cursor-pointer"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <motion.p
                                            initial={{ opacity: 0, transform: "translateY(8px)" }}
                                            animate={{ opacity: 1, transform: "translateY(0px)" }}
                                            transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.06 }}
                                            className="text-pale/85 leading-relaxed mb-8 text-base max-w-[60ch]"
                                        >
                                            {selected.description}
                                        </motion.p>

                                        <motion.ul
                                            initial={{ opacity: 0, transform: "translateY(8px)" }}
                                            animate={{ opacity: 1, transform: "translateY(0px)" }}
                                            transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.12 }}
                                            className="flex flex-wrap gap-2"
                                            aria-label="Technologies"
                                        >
                                            {selected.tech.map((tag) => (
                                                <li
                                                    key={tag}
                                                    className="px-3 py-1 rounded-md font-mono text-xs bg-cool/20 text-pale border border-cool/30"
                                                >
                                                    {tag}
                                                </li>
                                            ))}
                                        </motion.ul>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

