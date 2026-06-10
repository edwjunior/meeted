"use client";

import { useState } from "react";
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
        color: "from-[#c91029]/25 to-[#07091c]",
        tech: ["Python", "Azure OpenAI", "RAG", "LLM"],
    },
    {
        id: "liferay-portal",
        tag: "Java / Liferay",
        title: "Enterprise Portal Migration",
        description:
            "Full migration and modernization of a large-scale Liferay DXP portal for an international organization.",
        color: "from-[#2d5ec8]/30 to-[#07091c]",
        tech: ["Java", "Liferay DXP", "CI/CD"],
    },
    {
        id: "padel-sensor",
        tag: "Hardware / Embedded",
        title: "Padel Analytics Sensor",
        description:
            "UPF thesis: embedded motion sensor in a padel racket to extract real-time player performance kinematics.",
        color: "from-[#0e1230] to-[#07091c]",
        tech: ["Embedded C", "Hardware", "Signal Processing"],
    },
    {
        id: "meeted",
        tag: "Next.js / React",
        title: "MeetEd Portfolio",
        description:
            "This very portfolio — built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.",
        color: "from-[#2050b8]/25 to-[#07091c]",
        tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
    },
    {
        id: "startup-pipeline",
        tag: "Business / Growth",
        title: "Startup Lead Pipeline",
        description:
            "Built and managed a B2B lead-generation pipeline for tech startups seeking public funding at Intelectium.",
        color: "from-[#c91029]/20 to-[#07091c]",
        tech: ["B2B", "Growth", "Intelectium"],
    },
    {
        id: "cicd-gates",
        tag: "DevOps / CI-CD",
        title: "CI/CD Quality Gates",
        description:
            "End-to-end Jenkins pipelines with SonarQube quality gates and JUnit integration test suites.",
        color: "from-[#0e1230] to-[#07091c]",
        tech: ["Jenkins", "SonarQube", "JUnit", "Git Flow"],
    },
];

export default function WorkSection() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = projects.find((p) => p.id === selectedId) ?? null;

    return (
        <section id="work" className="py-24 lg:py-32 bg-[#0a0d22]">
            <div className="max-w-7xl mx-auto px-8 lg:px-16">

                {/* ── Section header ───────────────────────────────── */}
                <div className="text-center mb-16">
                    <span className="text-[#7a9ad0] font-semibold text-xs tracking-widest uppercase">
                        My Work
                    </span>
                    <h2 className="mt-3 text-3xl lg:text-4xl font-bold">Work & Projects</h2>
                    <p className="mt-4 text-[#8090b8] text-sm max-w-xl mx-auto leading-relaxed">
                        End-to-end engineering — from enterprise portals to AI systems and personal builds.
                    </p>
                </div>

                {/* ── Block 1: What I Do ───────────────────────────── */}
                <div className="mb-20">
                    <p className="text-[#7a9ad0] text-xs font-semibold uppercase tracking-widest mb-6">
                        What I Do
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        {services.map((service) => (
                            <div
                                key={service.title}
                                className="flex items-start gap-3 p-4 bg-[#07091c] border border-[#2d5ec8]/12 rounded-xl"
                            >
                                <div className="shrink-0 text-[#2d5ec8] mt-0.5">
                                    {service.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white mb-1">{service.title}</p>
                                    <p className="text-[#8090b8] text-xs leading-relaxed">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Block 2: Project Highlights ──────────────────── */}
                <div>
                    <p className="text-[#7a9ad0] text-xs font-semibold uppercase tracking-widest mb-6">
                        Project Highlights
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                layoutId={`project-card-${project.id}`}
                                onClick={() => setSelectedId(project.id)}
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                className={`group relative rounded-xl overflow-hidden bg-gradient-to-br ${project.color} border border-[#2d5ec8]/12 hover:border-[#2d5ec8]/40 transition-all duration-300 cursor-pointer aspect-[4/3] flex flex-col justify-end`}
                            >
                                <div className="absolute inset-0 bg-[#2d5ec8]/0 group-hover:bg-[#2d5ec8]/8 transition-all duration-300" />
                                <div className="relative p-6">
                                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#7a9ad0] bg-[#2d5ec8]/15 px-2.5 py-1 rounded mb-3">
                                        {project.tag}
                                    </span>
                                    <motion.h3
                                        layoutId={`project-title-${project.id}`}
                                        className="text-base font-bold mb-1.5"
                                    >
                                        {project.title}
                                    </motion.h3>
                                    <p className="text-[#8090b8] text-xs leading-relaxed line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="mt-4 text-[#2d5ec8] group-hover:text-[#5580d8] transition-colors duration-300">
                                        <IconArrow />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <a
                            href="https://www.linkedin.com/in/eduard-puig-valls/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-white/12 hover:border-[#2d5ec8]/50 hover:text-[#7a9ad0] text-[#b8ccec] font-semibold rounded transition-colors duration-200 cursor-pointer text-sm"
                        >
                            View All on LinkedIn
                            <IconArrow />
                        </a>
                    </div>
                </div>

                {/* ── Project modal ─────────────────────────────────── */}
                <AnimatePresence>
                    {selected && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            />

                            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                                <motion.div
                                    layoutId={`project-card-${selected.id}`}
                                    className="bg-[#090d2e] border border-[#2d5ec8]/30 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
                                >
                                    <div className="p-8 overflow-y-auto">
                                        <div className="flex justify-between items-start mb-5">
                                            <div>
                                                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#7a9ad0] bg-[#2d5ec8]/15 px-2.5 py-1 rounded mb-3">
                                                    {selected.tag}
                                                </span>
                                                <motion.h3
                                                    layoutId={`project-title-${selected.id}`}
                                                    className="text-2xl font-bold text-white"
                                                >
                                                    {selected.title}
                                                </motion.h3>
                                            </div>
                                            <button
                                                onClick={() => setSelectedId(null)}
                                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors shrink-0"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <motion.p
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: 0.08 }}
                                            className="text-white/75 leading-relaxed mb-8 text-sm"
                                        >
                                            {selected.description}
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-wrap gap-2"
                                        >
                                            {selected.tech.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 rounded-full text-xs font-medium bg-[#2d5ec8]/20 text-[#b8ccec] border border-[#2d5ec8]/30"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </motion.div>
                                    </div>

                                    <div className="p-6 bg-black/20 border-t border-white/5 flex justify-end">
                                        <button
                                            onClick={() => setSelectedId(null)}
                                            className="px-6 py-2 bg-[#2d5ec8] hover:bg-[#2050b8] text-white rounded-lg font-medium transition-colors text-sm"
                                        >
                                            Close
                                        </button>
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
