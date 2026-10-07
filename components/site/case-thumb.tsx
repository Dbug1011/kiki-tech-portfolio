import Image from "next/image";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

// Where the violet glow sits, so neighbouring thumbnails don't look identical.
const glows = [
  "bg-[radial-gradient(circle_at_20%_20%,rgba(121,69,255,0.45),transparent_55%)]",
  "bg-[radial-gradient(circle_at_80%_30%,rgba(121,69,255,0.4),transparent_55%)]",
  "bg-[radial-gradient(circle_at_50%_100%,rgba(121,69,255,0.45),transparent_60%)]",
  "bg-[radial-gradient(circle_at_10%_90%,rgba(121,69,255,0.4),transparent_55%)]",
];

/**
 * Landscape thumbnail for a case study. Uses the cover photo when there is
 * one (graded cool); otherwise draws the system itself: its pipeline stages
 * as glowing nodes on a dark field.
 */
export function CaseThumb({
  study,
  index,
  className,
  badge,
}: {
  study: CaseStudy;
  index: number;
  className?: string;
  badge?: React.ReactNode;
}) {
  const stages = study.architecture;
  const first = stages[0];
  const last = stages[stages.length - 1];
  const middle = stages.length - 2;

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.07] bg-gradient-to-br from-night/80 via-ink-2 to-ink",
        className
      )}
    >
      {study.cover ? (
        <>
          <Image
            src={study.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
            className="object-cover saturate-[0.7] transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-night/30 to-transparent mix-blend-multiply" />
        </>
      ) : (
        <>
          <div aria-hidden="true" className={cn("absolute inset-0", glows[index % glows.length])} />
          <div aria-hidden="true" className="bg-grid absolute inset-0" />
          {/* The system in one line: where data enters → how many stages → where it lands. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 items-center transition-transform duration-700 group-hover:scale-[1.04]"
          >
            <Node label={first.nodes[0].label} />
            <span className="h-px min-w-3 flex-1 bg-gradient-to-r from-volt/80 to-lilac/40" />
            {middle > 0 && (
              <>
                <span className="shrink-0 rounded-full border border-lilac/30 bg-volt/25 px-1.5 py-0.5 text-[9px] text-lilac">
                  +{middle}
                </span>
                <span className="h-px min-w-3 flex-1 bg-gradient-to-r from-lilac/40 to-volt/80" />
              </>
            )}
            <Node label={last.nodes[0].label} />
          </div>
        </>
      )}
      <span className="absolute left-3 top-3 text-[10px] font-medium uppercase tracking-[0.18em] text-snow/60">
        {String(index + 1).padStart(2, "0")}
      </span>
      {badge && <div className="absolute right-3 top-3 rounded-full bg-ink/60 backdrop-blur-md">{badge}</div>}
    </div>
  );
}

const Node = ({ label }: { label: string }) => (
  <span className="max-w-[45%] shrink-0 truncate rounded-md border border-lilac/25 bg-ink/75 px-2 py-1.5 text-[11px] text-snow/85 shadow-[0_0_20px_-6px_rgba(121,69,255,0.9)] backdrop-blur-sm">
    {label}
  </span>
);
