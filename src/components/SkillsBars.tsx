"use client";

import {motion} from "framer-motion";

const skills = [
  { label: "Java / Liferay DXP", pct: 90 },
  { label: "Python / AI & LLM", pct: 82 },
  { label: "Frontend Development", pct: 75 },
  { label: "DevOps & CI/CD", pct: 70 },
];

export default function SkillBars() {
    return (
        <div className="space-y-5">
            {skills.map((skill, index) => (
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
                    {/* Barra de progreso animada (Fill) */}
                    <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#2d5ec8] to-[#5580d8]"
                    // 1. Estado inicial antes de hacer scroll
                    initial={{ width: 0 }}
                    // 2. Estado final cuando el elemento entra en pantalla
                    whileInView={{ width: `${skill.pct}%` }}
                    // 3. Configuración del viewport (once: true evita que se repita al subir y bajar)
                    viewport={{ once: true, margin: "-50px" }}
                    // 4. Duración y fluidez de la animación, con un ligero retraso en cascada
                    transition={{ 
                        duration: 1.75, 
                        ease: "easeOut", 
                        delay: index * 0.25 
                    }}
                    />
                  {/*<div
                    className="h-full rounded-full bg-gradient-to-r from-[#2d5ec8] to-[#5580d8]"
                    style={{ width: `${skill.pct}%` }}
                  />*/}
                </div>
              </div>
            ))}
        </div>
    );
}