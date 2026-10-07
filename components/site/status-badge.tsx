import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

const tone: Record<CaseStudy["status"], string> = {
  Production: "text-emerald-200 [--dot:theme(colors.emerald.300)]",
  Prototype: "text-lilac [--dot:theme(colors.volt)]",
  Competition: "text-amber-100 [--dot:theme(colors.amber.300)]",
  Academic: "text-mist [--dot:theme(colors.mist)]",
};

export function StatusBadge({ status }: { status: CaseStudy["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em]",
        tone[status]
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--dot)] shadow-[0_0_8px_var(--dot)]" />
      {status}
    </span>
  );
}
