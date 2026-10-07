import { Fragment } from "react";
import type { ArchStage } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

/**
 * Data-driven architecture flow. Stages read left → right on desktop and
 * top → bottom on phones; a stage with several nodes stacks them to show
 * parallel pieces. Pure CSS, so it renders on the server.
 */
export function ArchitectureDiagram({ stages }: { stages: ArchStage[] }) {
  return (
    <figure
      aria-label="Architecture diagram"
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#071022]/70 p-5 md:p-8"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
      <ol className="relative flex flex-col items-stretch md:flex-row md:items-center">
        {stages.map((stage, i) => (
          <Fragment key={stage.title}>
            <li className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">
                {String(i + 1).padStart(2, "0")} · {stage.title}
              </p>
              <div className="flex flex-col gap-2">
                {stage.nodes.map((node) => (
                  <div
                    key={node.label}
                    className="rounded-xl border border-white/12 bg-white/[0.05] px-3 py-2.5 shadow-[0_8px_30px_-18px_rgba(34,211,238,0.6)]"
                  >
                    <p className="text-sm font-semibold text-white">{node.label}</p>
                    {node.detail && (
                      <p className="mt-0.5 text-xs leading-snug text-white/55">{node.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            </li>
            {i < stages.length - 1 && <Connector />}
          </Fragment>
        ))}
      </ol>
    </figure>
  );
}

const Connector = () => (
  <li aria-hidden="true" className="flex shrink-0 items-center justify-center py-1 md:px-1 md:py-0">
    {/* Vertical on phones */}
    <span className="relative block h-8 w-px bg-gradient-to-b from-cyan-400/10 via-cyan-400/50 to-cyan-400/10 md:hidden">
      <span className="flow-dot-y absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
    </span>
    {/* Horizontal from md up */}
    <span className="relative hidden h-px w-8 bg-gradient-to-r from-cyan-400/10 via-cyan-400/50 to-cyan-400/10 md:block lg:w-10">
      <span className="flow-dot-x absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
    </span>
  </li>
);

/** One-line version for cards: the first node of each stage, joined by arrows. */
export function PipelinePreview({
  stages,
  className,
}: {
  stages: ArchStage[];
  className?: string;
}) {
  return (
    <ol
      aria-label="Pipeline"
      className={cn("flex flex-wrap items-center gap-x-1.5 gap-y-2 font-mono text-[11px]", className)}
    >
      {stages.map((stage, i) => (
        <li key={stage.title} className="flex items-center gap-1.5">
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-white/70">
            {stage.nodes[0].label}
            {stage.nodes.length > 1 && (
              <span className="text-cyan-300/70"> +{stage.nodes.length - 1}</span>
            )}
          </span>
          {i < stages.length - 1 && (
            <span aria-hidden="true" className="text-cyan-300/60">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
