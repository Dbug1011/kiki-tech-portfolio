"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MdClose, MdMailOutline, MdOpenInNew, MdPlace } from "react-icons/md";
import { useMounted } from "@/app/hooks/use-mounted";
import { cn } from "@/lib/utils";
import {
  achievements,
  credentials,
  education,
  experience,
  interests,
  involvement,
  profile,
  projects,
  resumeSections,
  seminars,
  softSkills,
  type ResumeSection,
  type TimelineItem,
} from "@/lib/resume-data";

const seminarCount = seminars.reduce((n, g) => n + g.items.length, 0);
const stats = [
  { value: experience.filter((e) => e.org !== "Independent").length, label: "roles" },
  { value: projects.length, label: "projects" },
  { value: achievements.length, label: "awards" },
  { value: seminarCount, label: "seminars" },
];

const glassCard =
  "rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]";

/* ------------------------------------------------------------------ */

const Timeline = ({ items }: { items: TimelineItem[] }) => (
  <ol className="relative space-y-4 border-l border-white/10 pl-5">
    {items.map((item, i) => (
      <motion.li
        key={`${item.org}-${item.title}`}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.05, duration: 0.3 }}
        className="relative"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-slate-950",
            i === 0
              ? "bg-gradient-to-br from-volt to-lilac shadow-[0_0_12px_rgba(121,69,255,0.8)]"
              : "bg-white/30"
          )}
        />
        <div className={glassCard}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
            <h4 className="font-semibold text-white">{item.title}</h4>
            <span className="text-[11px] font-medium text-lilac/70">
              {item.period}
            </span>
          </div>
          <p className="text-sm text-white/60">
            {item.org}
            {item.place && <span className="text-white/40"> · {item.place}</span>}
          </p>
          {item.points && (
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-white/75">
              {item.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lilac/70" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.li>
    ))}
  </ol>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full border border-lilac/20 bg-lilac0/10 px-2 py-0.5 text-[11px] font-medium text-lilac">
    {children}
  </span>
);

const tierStyle = {
  gold: "from-amber-300/30 to-amber-500/10 text-amber-200 border-amber-300/30",
  silver: "from-slate-200/25 to-slate-400/10 text-slate-100 border-slate-200/25",
  bronze: "from-orange-400/25 to-orange-600/10 text-orange-200 border-orange-300/25",
  honor: "from-lilac/25 to-lilac0/10 text-lilac border-lilac/25",
};

function SectionBody({ section }: { section: ResumeSection }) {
  switch (section) {
    case "overview":
      return (
        <div className="space-y-5">
          <p className="text-[15px] leading-relaxed text-white/80">{profile.summary}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className={cn(glassCard, "text-center")}>
                <div className="bg-gradient-to-br from-white to-lilac bg-clip-text text-3xl font-bold text-transparent">
                  {s.value}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/45">
              Right now
            </h4>
            <Timeline items={experience.slice(0, 1)} />
          </div>
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/45">
              Interests
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {interests.map((i) => (
                <Tag key={i}>{i}</Tag>
              ))}
            </div>
          </div>
        </div>
      );
    case "experience":
      return <Timeline items={experience} />;
    case "education":
      return <Timeline items={education} />;
    case "involvement":
      return <Timeline items={involvement} />;
    case "projects":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className={glassCard}
            >
              <h4 className="font-semibold text-white">{p.name}</h4>
              <div className="my-1.5 flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-white/70">{p.blurb}</p>
            </motion.div>
          ))}
        </div>
      );
    case "skills":
      return (
        <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {softSkills.map((s) => (
            <div key={s.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-white/85">{s.name}</span>
                <span className="text-white/40">{s.level}/5</span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-white/10"
                role="meter"
                aria-label={s.name}
                aria-valuemin={0}
                aria-valuemax={5}
                aria-valuenow={s.level}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-lilac0 to-lilac"
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.level / 5) * 100}%` }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
          <p className="text-xs text-white/40 sm:col-span-2">
            Technical stack lives in the Skills &amp; Tools panel.
          </p>
        </div>
      );
    case "credentials":
      return (
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {credentials.map((c) => (
            <li key={c.name} className={cn(glassCard, "py-3")}>
              <p className="text-sm font-medium text-white">{c.name}</p>
              <p className="text-xs text-white/50">{c.issuer}</p>
            </li>
          ))}
        </ul>
      );
    case "learning":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {seminars.map((g) => (
            <div key={g.group} className={glassCard}>
              <h4 className="mb-2 text-sm font-semibold text-white">{g.group}</h4>
              <ul className="space-y-1 text-sm text-white/70">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lilac/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "achievements":
      return (
        <ul className="grid gap-2 sm:grid-cols-2">
          {achievements.map((a, i) => (
            <motion.li
              key={a.event}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.025, 0.3), duration: 0.25 }}
              className={cn(
                "flex items-center gap-3 rounded-xl border bg-gradient-to-br px-3 py-2.5",
                tierStyle[a.tier]
              )}
            >
              <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-wide">
                {a.place}
              </span>
              <span className="text-sm text-white/80">{a.event}</span>
            </motion.li>
          ))}
        </ul>
      );
  }
}

/* ------------------------------------------------------------------ */

export default function ResumeDossier({
  initialSection = "overview",
  onClose,
}: {
  initialSection?: ResumeSection;
  onClose: () => void;
}) {
  const [section, setSection] = useState<ResumeSection>(initialSection);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const rawReduced = useReducedMotion();
  const reduced = mounted && !!rawReduced;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const choose = (key: ResumeSection) => {
    setSection(key);
    bodyRef.current?.scrollTo({ top: 0 });
  };

  const transition = reduced
    ? { duration: 0.01 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] };

  return (
    <motion.div
      className="fixed inset-0 z-[10001] flex items-center justify-center p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${profile.name} résumé`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        className="relative flex h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-ink/90 shadow-[0_0_80px_-20px_rgba(121,69,255,0.5)] backdrop-blur-md md:bg-ink/75 md:backdrop-blur-xl"
        initial={reduced ? false : { y: 28, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={reduced ? undefined : { y: 28, scale: 0.97 }}
        transition={transition}
      >
        {/* Header */}
        <div className="relative border-b border-white/10 px-5 pb-3 pt-5 sm:px-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lilac/60 to-transparent"
          />
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-lilac/70">
                Résumé
              </p>
              <h2 className="truncate bg-gradient-to-r from-white via-lilac to-lilac bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                {profile.name}
              </h2>
              <p className="text-sm text-white/65">{profile.role}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close résumé"
              className="shrink-0 rounded-full border border-white/15 p-2 text-white/80 transition-colors hover:border-lilac/50 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac"
            >
              <MdClose className="text-lg" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/60">
              <MdPlace aria-hidden="true" /> {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/70 transition-colors hover:border-lilac/40 hover:text-white"
            >
              <MdMailOutline aria-hidden="true" /> {profile.email}
            </a>
            {profile.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/70 transition-colors hover:border-lilac/40 hover:text-white"
              >
                {l.label} <MdOpenInNew aria-hidden="true" className="opacity-60" />
              </a>
            ))}
          </div>

          {/* Section tabs: one scrollable row, never wraps into extra height */}
          <div
            role="tablist"
            aria-label="Résumé sections"
            className="-mx-1 mt-4 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {resumeSections.map(({ key, label }) => {
              const active = section === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="dossier-panel"
                  onClick={() => choose(key)}
                  className={cn(
                    "relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac",
                    active ? "text-white" : "text-white/55 hover:text-white/90"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="dossier-tab"
                      className="absolute inset-0 rounded-full border border-lilac/30 bg-gradient-to-r from-volt/60 to-volt/50"
                      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div
          ref={bodyRef}
          id="dossier-panel"
          role="tabpanel"
          className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 [scrollbar-color:#7945FF_transparent] [scrollbar-width:thin]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={section}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0.01 : 0.22 }}
            >
              <SectionBody section={section} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
