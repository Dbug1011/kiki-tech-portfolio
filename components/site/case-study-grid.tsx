"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdArrowForward } from "react-icons/md";
import { caseStudies, categories, type Category } from "@/lib/case-studies";
import { CaseThumb } from "./case-thumb";
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
        className="mb-10 flex w-fit max-w-full gap-0.5 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                "micro focus-ring relative shrink-0 rounded-full px-3.5 py-2 transition-colors",
                selected ? "text-white" : "text-mist hover:text-snow"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="case-filter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-volt to-[#9a74ff] shadow-[0_0_24px_-8px_rgba(121,69,255,1)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">
                {c.label}
                <span className="ml-1.5 opacity-60">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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
                className="focus-ring group flex h-full flex-col rounded-xl"
              >
                <CaseThumb
                  study={study}
                  index={caseStudies.indexOf(study)}
                  badge={<StatusBadge status={study.status} />}
                  className="transition-[border-color,box-shadow] duration-300 group-hover:border-lilac/30 group-hover:shadow-[0_20px_60px_-30px_rgba(121,69,255,0.9)]"
                />
                <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-mist/80">
                  {categories.find((c) => c.key === study.category)?.label} · {study.year}
                </p>
                <h3 className="mt-3 text-lg font-normal leading-snug text-snow">{study.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist">{study.tagline}</p>
                <span className="micro mt-auto inline-flex items-center gap-1.5 pt-4 text-lilac transition-colors group-hover:text-snow">
                  Read case study
                  <MdArrowForward aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
