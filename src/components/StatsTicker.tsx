import Image from "next/image";

const SI = "https://cdn.jsdelivr.net/npm/simple-icons@16.34.0/icons";

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

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    // Padding instead of gap: each set carries its own trailing space, so -50% lands exactly on the copy
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {technologies.map((item) => (
        <li key={item.name} title={hidden ? undefined : item.name} className="shrink-0 pr-16">
          <Image
            src={item.logo}
            alt={hidden ? "" : item.name}
            width={0}
            height={0}
            sizes="160px"
            className="h-9 w-auto object-contain brightness-0 invert opacity-45 transition-opacity duration-200 hover:opacity-90"
          />
        </li>
      ))}
    </ul>
  );
}

// Pure CSS marquee: runs on the compositor, so it stays smooth while the page is busy.
// Hovering pauses it, so a logo can be looked at. Reduced motion stops it (see globals.css).
export default function StatsTicker() {
  return (
    <section aria-label="Technologies I work with" className="border-t border-white/10 py-14">
      <div className="container-x overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6rem,black_calc(100%-6rem),transparent)]">
        <div className="flex w-max py-3 animate-marquee hover:[animation-play-state:paused]">
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </section>
  );
}
