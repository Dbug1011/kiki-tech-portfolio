"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MdArrowForward } from "react-icons/md";
import { cn } from "@/lib/utils";

export type CapabilityItem = {
  key: string;
  label: string;
  copy: string;
  count: number;
  stack: string[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Capabilities as scrolling "lyrics": the panel nearest the middle of the
 * viewport is lit (full opacity, full size, violet edge), the ones above and
 * below fade, shrink and blur. The sticky column follows along with the
 * active number. Reduced-motion visitors get static, fully visible panels.
 */
export default function CapabilityLyrics({
  items,
  heading,
}: {
  items: CapabilityItem[];
  heading: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        {heading}

        {/* Follows the lit panel (desktop: the column is sticky). */}
        <div aria-hidden="true" className="mt-10 hidden items-end gap-4 lg:flex">
          <div className="relative h-[5.5rem] w-[7.5rem] overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={active}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 text-[5.5rem] font-light leading-none text-lilac/80"
              >
                {String(active + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="pb-2">
            <p className="micro text-mist/60">/ {String(items.length).padStart(2, "0")}</p>
            <p className="mt-1 text-sm text-snow">{items[active].label}</p>
          </div>
        </div>

        <Link href="#work" className="btn-primary mt-8">
          See the case studies <MdArrowForward aria-hidden="true" />
        </Link>
      </div>

      {/* Padding lets the first and last panels reach the middle of the screen. */}
      <ul className="space-y-5 lg:py-[22vh]">
        {items.map((item, i) => (
          <Lyric
            key={item.key}
            item={item}
            index={i}
            active={active === i}
            reduced={!!reduced}
            onActive={() => setActive(i)}
          />
        ))}
      </ul>
    </div>
  );
}

function Lyric({
  item,
  index,
  active,
  reduced,
  onActive,
}: {
  item: CapabilityItem;
  index: number;
  active: boolean;
  reduced: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // 0 when the panel's top enters at the bottom of the screen, 1 when its
  // bottom leaves at the top; 0.5 is dead centre.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0.12, 0.42, 0.58, 0.88], [0.22, 1, 1, 0.22]);
  const scale = useTransform(scrollYProgress, [0.12, 0.45, 0.55, 0.88], [0.93, 1, 1, 0.93]);
  const blur = useTransform(scrollYProgress, [0.12, 0.42, 0.58, 0.88], [4, 0, 0, 4]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p > 0.38 && p < 0.62) onActive();
  });

  return (
    <motion.li
      ref={ref}
      style={reduced ? undefined : { opacity, scale, filter }}
      className={cn(
        "rounded-xl border p-6 transition-[border-color,box-shadow,background-color] duration-500 md:p-7",
        active
          ? "border-volt/50 bg-gradient-to-b from-[#1f1a33] to-graphite shadow-[0_0_60px_-24px_rgba(121,69,255,0.9)]"
          : "border-white/[0.07] bg-gradient-to-b from-[#1b1d1f] to-graphite"
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className={cn("text-xl font-normal transition-colors duration-500", active ? "text-snow" : "text-snow/80")}>
          <span className={cn("mr-3 text-sm font-light transition-colors duration-500", active ? "text-lilac" : "text-lilac/60")}>
            {String(index + 1).padStart(2, "0")}
          </span>
          {item.label}
        </h3>
        <span className="micro shrink-0 text-mist/70">
          {item.count} {item.count === 1 ? "build" : "builds"}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-mist">{item.copy}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {item.stack.map((t) => (
          <li
            key={t}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] transition-colors duration-500",
              active ? "border-lilac/30 text-snow/90" : "border-white/10 text-snow/70"
            )}
          >
            {t}
          </li>
        ))}
      </ul>
    </motion.li>
  );
}
