import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

const tone: Record<CaseStudy["status"], string> = {
  Production: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  Prototype: "border-cyan-300/30 bg-cyan-400/10 text-cyan-200",
  Competition: "border-amber-300/30 bg-amber-400/10 text-amber-200",
  Academic: "border-white/15 bg-white/[0.06] text-white/70",
};

export function StatusBadge({ status }: { status: CaseStudy["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        tone[status]
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
