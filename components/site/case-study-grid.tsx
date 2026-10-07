"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdArrowForward } from "react-icons/md";
import { caseStudies, categories, type Category } from "@/lib/case-studies";
import { PipelinePreview } from "./architecture-diagram";
import { StatusBadge } from "./status-badge";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CaseStudyGrid() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const visible = caseStudies.filter((c) => filter === "all" || c.category === filter);

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter case studies"
        className="mb-10 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((c) => {
          const count =
            c.key === "all"
              ? caseStudies.length
              : caseStudies.filter((s) => s.category === c.key).length;
          const selected = filter === c.key;
          return (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(c.key)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                selected ? "text-white" : "text-white/55 hover:text-white/90"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="case-filter"
                  className="absolute inset-0 rounded-full border border-cyan-300/30 bg-gradient-to-r from-cyan-500/30 to-blue-600/30"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">
                {c.label}
                <span className="ml-1.5 font-mono text-[11px] opacity-60">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((study, i) => (
            <motion.li
              key={study.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.03 }}
              className="list-none"
            >
              <Link
                href={`/work/${study.slug}`}
                data-cursor="magnet"
                className="group flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.06] hover:shadow-[0_24px_60px_-28px_rgba(34,211,238,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:p-8 md:backdrop-blur-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-white/45">
                    {categories.find((c) => c.key === study.category)?.label} · {study.year}
                  </span>
                  <StatusBadge status={study.status} />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{study.tagline}</p>
                </div>

                <PipelinePreview stages={study.architecture} />

                <div className="mt-auto flex items-end justify-between gap-4">
                  <ul className="flex flex-wrap gap-1.5">
                    {study.stack.slice(0, 4).map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-200"
                      >
                        {tech}
                      </li>
                    ))}
                    {study.stack.length > 4 && (
                      <li className="px-1 py-1 text-[11px] text-white/40">
                        +{study.stack.length - 4}
                      </li>
                    )}
                  </ul>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-cyan-300 transition-transform group-hover:translate-x-1">
                    Case study <MdArrowForward aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
