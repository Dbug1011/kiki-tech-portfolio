"use client";
import React, { useState } from "react";
import {
  SiArduino,
  SiProteus,
  SiFirebase,
  SiFlutter,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiReact,
  SiElasticsearch,
  SiInfluxdb,
  SiLogstash,
  SiKibana,
  SiGrafana,
  SiPython,
  SiRaspberrypi,
  SiC,
  SiCplusplus,
  SiDart,
  SiMysql,
  SiPostgresql,
  SiGooglecloud,
  SiOpencv,
} from "react-icons/si";
import { BsAndroid } from "react-icons/bs";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMounted } from "@/app/hooks/use-mounted";
import { cn } from "@/lib/utils";

// `color` is each tool's brand colour, nudged brighter where the official
// one would vanish on the dark background. It only appears on hover/focus.
type IconEntry = { Icon: React.ElementType; name: string; color: string };
type IconGroup = { label: string; short: string; items: IconEntry[] };

const iconGroups: IconGroup[] = [
  {
    label: "Cloud & DevOps",
    short: "Cloud",
    items: [
      { Icon: SiGooglecloud, name: "Google Cloud", color: "#4285F4" },
    ],
  },
  {
    label: "Languages",
    short: "Languages",
    items: [
      { Icon: SiPython, name: "Python", color: "#4B8BBE" },
      { Icon: SiC, name: "C", color: "#A8B9CC" },
      { Icon: SiCplusplus, name: "C++", color: "#659AD2" },
      { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
      { Icon: SiDart, name: "Dart", color: "#40C4FF" },
      { Icon: SiHtml5, name: "HTML", color: "#E34F26" },
      { Icon: SiCss3, name: "CSS", color: "#3B9BE8" },
    ],
  },
  {
    label: "Frameworks & Frontend",
    short: "Frontend",
    items: [
      { Icon: SiReact, name: "React / RN", color: "#61DAFB" },
      { Icon: SiFlutter, name: "Flutter", color: "#42A5F5" },
      { Icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
      { Icon: SiTailwindcss, name: "Tailwind", color: "#38BDF8" },
      { Icon: SiNodedotjs, name: "Node.js", color: "#8CC84B" },
      { Icon: BsAndroid, name: "Android", color: "#3DDC84" },
    ],
  },
  {
    label: "Databases & Data",
    short: "Data",
    items: [
      { Icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
      { Icon: SiMysql, name: "MySQL", color: "#5B9BD5" },
      { Icon: SiPostgresql, name: "PostgreSQL", color: "#6E8FEF" },
      { Icon: SiInfluxdb, name: "InfluxDB", color: "#22ADF6" },
      { Icon: SiElasticsearch, name: "Elasticsearch", color: "#FEC514" },
      { Icon: SiKibana, name: "Kibana", color: "#E8478B" },
      { Icon: SiGrafana, name: "Grafana", color: "#F46800" },
      { Icon: SiLogstash, name: "Logstash", color: "#00BFB3" },
    ],
  },
  {
    label: "Computer Vision",
    short: "Vision",
    items: [{ Icon: SiOpencv, name: "OpenCV", color: "#8A7BFF" }],
  },
  {
    label: "Embedded Systems",
    short: "Embedded",
    items: [
      { Icon: SiRaspberrypi, name: "Raspberry Pi", color: "#E8456F" },
      { Icon: SiArduino, name: "Arduino", color: "#00C4CC" },
      { Icon: SiProteus, name: "Proteus", color: "#4FA3E0" },
    ],
  },
  {
    label: "Version Control",
    short: "Git",
    items: [
      { Icon: SiGit, name: "Git", color: "#F05032" },
      { Icon: SiGithub, name: "GitHub", color: "#FFFFFF" },
    ],
  },
];

const allItems = iconGroups.flatMap((group) => group.items);

/* ------------------------------------------------------------------ */
/* Marquee: two rows drifting in opposite directions.                 */
/* ------------------------------------------------------------------ */

const MarqueeRow = ({
  items,
  reverse = false,
}: {
  items: IconEntry[];
  reverse?: boolean;
}) => (
  <div className="marquee-group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
    {/* Two identical copies, each with trailing padding instead of a flex
        gap between them, so translating by -50% lands pixel-exactly on the
        start of copy #2 and the loop never hitches. */}
    <div
      className={cn(
        "marquee-track flex w-max shrink-0",
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      )}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 gap-3 pr-3">
          {items.map(({ Icon, name, color }) => (
            <span
              key={name}
              className="group/pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/60 transition-colors duration-300 hover:border-white/25 hover:text-white"
            >
              <Icon
                className="text-sm transition-colors duration-300 group-hover/pill:text-[color:var(--brand)]"
                style={{ "--brand": color } as React.CSSProperties}
              />
              {name}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* The marquee shows the whole stack at a glance; the tabs reveal one  */
/* category at a time as a single row of chips.                        */
/* ------------------------------------------------------------------ */

const SkillChip = ({ Icon, name, color }: IconEntry) => (
  <motion.li
    layout
    initial={{ opacity: 0, y: 6, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12 } }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    style={{ "--brand": color } as React.CSSProperties}
    className="group relative"
  >
    <span
      tabIndex={0}
      data-cursor="magnet"
      className="relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-medium text-white/75 outline-none md:bg-white/[0.05] md:backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white hover:shadow-[0_6px_24px_-8px_var(--brand)] focus-visible:border-white/40 focus-visible:text-white focus-visible:shadow-[0_6px_24px_-6px_var(--brand)]"
    >
      {/* Brand-tinted wash that fades in on hover/focus. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          background:
            "radial-gradient(80% 120% at 0% 50%, color-mix(in srgb, var(--brand) 26%, transparent), transparent 70%)",
        }}
      />
      <Icon
        aria-hidden="true"
        className="relative text-base transition-all duration-300 group-hover:scale-110 group-hover:text-[color:var(--brand)] group-hover:[filter:drop-shadow(0_0_6px_var(--brand))] group-focus-within:text-[color:var(--brand)]"
      />
      <span className="relative">{name}</span>
    </span>
  </motion.li>
);

const Icons = () => {
  // Server-rendered, so gate the reduced-motion check on mount to keep
  // hydration safe.
  const mounted = useMounted();
  const rawPrefersReducedMotion = useReducedMotion();
  const prefersReducedMotion = mounted && !!rawPrefersReducedMotion;

  const [active, setActive] = useState<string>(iconGroups[2].short);
  const group = iconGroups.find((g) => g.short === active) ?? iconGroups[0];
  const half = Math.ceil(allItems.length / 2);

  return (
    <section aria-labelledby="skills-heading" className="relative w-full">
      <div className="mb-6 flex items-end justify-between gap-3 md:mb-8">
        <h2
          id="skills-heading"
          className="drop-legible bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-lg font-bold tracking-tight text-transparent md:text-xl"
        >
          Skills &amp; Tools
        </h2>
        <p className="text-legible text-[11px] text-white/55">
          {allItems.length} tools · {iconGroups.length} disciplines
        </p>
      </div>

      {/* Whole stack, always moving (decorative: the tabs are the accessible list) */}
      <div aria-hidden="true" className="mb-8 space-y-3">
        <MarqueeRow items={allItems.slice(0, half)} />
        <MarqueeRow items={allItems.slice(half)} reverse />
      </div>

      {/* Category tabs: one scrollable row, never wraps into extra height */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm md:p-5 md:bg-white/[0.03] md:backdrop-blur-md">
        <div
          role="tablist"
          aria-label="Skill categories"
          className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {iconGroups.map((g) => {
            const selected = g.short === active;
            return (
              <button
                key={g.short}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="skills-tabpanel"
                onClick={() => setActive(g.short)}
                className={cn(
                  "relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                  selected ? "text-white" : "text-white/55 hover:text-white/90"
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="skills-filter-pill"
                    className="absolute inset-0 rounded-full border border-cyan-300/30 bg-gradient-to-r from-cyan-600/60 to-blue-600/50 shadow-[0_0_18px_-4px_rgba(103,232,249,0.8)]"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 30 }
                    }
                  />
                )}
                <span className="relative">
                  {g.short}
                  <span className="ml-1 text-[10px] opacity-60">
                    {g.items.length}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <ul
          id="skills-tabpanel"
          role="tabpanel"
          aria-label={group.label}
          className="mt-4 flex min-h-[44px] flex-wrap gap-2.5 border-t border-white/10 pt-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {group.items.map((item) => (
              <SkillChip key={item.name} {...item} />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
};

export default Icons;
