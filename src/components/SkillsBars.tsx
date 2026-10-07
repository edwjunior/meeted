"use client";

import { motion } from "framer-motion";

const skills = [
  { label: "Java / Liferay DXP", pct: 90 },
  { label: "Python / AI & LLM", pct: 82 },
  { label: "Frontend Development", pct: 75 },
  { label: "DevOps & CI/CD", pct: 70 },
];

export default function SkillBars() {
  return (
    <ul className="space-y-5">
      {skills.map((skill, index) => (
        <li key={skill.label}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-pale">{skill.label}</span>
            <span className="font-mono text-xs text-subtle tabular-nums">{skill.pct}%</span>
          </div>
          <div
            className="h-1.5 bg-white/6 rounded-full overflow-hidden"
            role="progressbar"
            aria-label={skill.label}
            aria-valuenow={skill.pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {/* Animate scaleX (GPU-composited) instead of width (triggers layout every frame) */}
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cool to-cool-soft origin-left"
              style={{ width: `${skill.pct}%` }}
              // Full transform string: hardware-accelerated, unlike the scaleX shorthand
              initial={{ transform: "scaleX(0)" }}
              whileInView={{ transform: "scaleX(1)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1], delay: index * 0.08 }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
