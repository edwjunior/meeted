"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const SI = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons";

interface TickerItem {
  name: string;
  logo: string;
}

const technologies: TickerItem[] = [
  { name: "Java",         logo: `${SI}/openjdk.svg` },
  { name: "Python",       logo: `${SI}/python.svg` },
  { name: "TypeScript",   logo: `${SI}/typescript.svg` },
  { name: "Next.js",      logo: `${SI}/nextdotjs.svg` },
  { name: "React",        logo: `${SI}/react.svg` },
  { name: "Tailwind CSS", logo: `${SI}/tailwindcss.svg` },
  { name: "Azure",        logo: `${SI}/microsoftazure.svg` },
  { name: "Docker",       logo: `${SI}/docker.svg` },
  { name: "Jenkins",      logo: `${SI}/jenkins.svg` },
  { name: "SonarQube",    logo: `${SI}/sonarqube.svg` },
  { name: "Git",          logo: `${SI}/git.svg` },
  { name: "PostgreSQL",   logo: `${SI}/postgresql.svg` },
  { name: "MySQL",        logo: `${SI}/mysql.svg` },
  { name: "Liferay",      logo: "/res/logos/liferay.webp" }
];

// Duplicate so -50% translate creates a seamless infinite loop
const row = [...technologies, ...technologies];

function TickerRow({
  items,
  direction,
  duration,
}: {
  items: TickerItem[];
  direction: "left" | "right";
  duration: number;
}) {
  const from = direction === "left" ? "0%" : "-50%";
  const to   = direction === "left" ? "-50%" : "0%";

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex items-center gap-16 w-max py-3"
        animate={{ x: [from, to] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <div key={`${item.name}-${i}`} title={item.name} className="shrink-0 flex items-center justify-center">
            <Image
              src={item.logo}
              alt={item.name}
              width={0}
              height={0}
              sizes="160px"
              className="h-10 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-90 transition-opacity duration-300"
            />
          </div>
        ))}
      </motion.div>

      {/* Edge fades — match the section background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#07091c] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#07091c] to-transparent z-10" />
    </div>
  );
}

export default function StatsTicker() {
  return (
    <section className="py-12 border-y border-white/5">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <TickerRow items={row} direction="left" duration={40} />
      </div>
    </section>
  );
}