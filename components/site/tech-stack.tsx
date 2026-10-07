import { buildsUsing, stackGroups, toolCount, type Tool } from "@/lib/stack";
import { caseStudies } from "@/lib/case-studies";
import { SectionHeading } from "./section-heading";

/**
 * The full toolset in six groups. Tools used in a case study are listed
 * first and lit (violet dot + build count); the rest are known tools that
 * haven't been written up yet. Icons stay monochrome per the design system.
 */
const allTools = stackGroups.flatMap((g) => g.tools);
const half = Math.ceil(allTools.length / 2);
const beltA = allTools.slice(0, half);
const beltB = allTools.slice(half);

function Belt({ tools, reverse = false }: { tools: Tool[]; reverse?: boolean }) {
  return (
    <div className="marquee-group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {/* Two identical copies with trailing padding, so -50% loops seamlessly. */}
      <div className={reverse ? "marquee-track flex w-max animate-marquee-reverse" : "marquee-track flex w-max animate-marquee"}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-3 pr-3">
            {tools.map((tool) => {
              const lit = buildsUsing(tool).length > 0;
              const { Icon } = tool;
              return (
                <span
                  key={tool.name}
                  className={
                    lit
                      ? "inline-flex items-center gap-2 rounded-full border border-volt/40 bg-volt/[0.1] px-4 py-2 text-sm text-snow shadow-[0_0_24px_-12px_rgba(121,69,255,0.9)]"
                      : "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-mist"
                  }
                >
                  {Icon ? (
                    <Icon className={lit ? "text-base text-lilac" : "text-base text-mist/70"} />
                  ) : (
                    <span className={lit ? "h-1.5 w-1.5 rounded-full bg-lilac" : "h-1.5 w-1.5 rounded-full bg-mist/50"} />
                  )}
                  {tool.name}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const used = new Set(caseStudies.flatMap((c) => c.stack)).size;

  return (
    <section aria-labelledby="stack-h" id="stack" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="stack-h" eyebrow="Tech stack" lines={["Tools I", "ship with"]}>
            {toolCount} tools across the whole system, from cloud platform to
            servo motor.
          </SectionHeading>
          <p className="flex shrink-0 items-center gap-2 text-xs text-mist">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-volt shadow-[0_0_8px_#7945FF]" />
            Used in a case study ({used} stack items across {caseStudies.length} builds)
          </p>
        </div>

        {/* Moving belts: the whole stack drifting in opposite directions.
            Decorative (the grid below is the accessible list); pauses on
            hover and stops for reduced-motion visitors. */}
        <div aria-hidden="true" className="relative left-1/2 mt-12 w-screen -translate-x-1/2 space-y-3">
          <Belt tools={beltA} />
          <Belt tools={beltB} reverse />
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stackGroups.map((group, i) => {
            const tools = [...group.tools].sort(
              (a, b) => buildsUsing(b).length - buildsUsing(a).length
            );
            return (
              <li key={group.title} className="surface flex flex-col rounded-xl p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-normal text-snow">
                    <span className="mr-2.5 text-sm font-light text-lilac/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {group.title}
                  </h3>
                  <span className="micro shrink-0 text-mist/60">{group.tools.length}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-mist">{group.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {tools.map((tool) => (
                    <ToolChip key={tool.name} tool={tool} />
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ToolChip({ tool }: { tool: Tool }) {
  const builds = buildsUsing(tool);
  const lit = builds.length > 0;
  const { Icon } = tool;

  return (
    <li
      title={lit ? `Used in: ${builds.map((b) => b.title).join(", ")}` : undefined}
      className={
        lit
          ? "group inline-flex items-center gap-1.5 rounded-full border border-volt/35 bg-volt/[0.08] py-1 pl-2 pr-2.5 text-xs text-snow transition-colors hover:border-lilac/60"
          : "group inline-flex items-center gap-1.5 rounded-full border border-white/10 py-1 pl-2 pr-2.5 text-xs text-mist transition-colors hover:border-white/25 hover:text-snow"
      }
    >
      {Icon ? (
        <Icon aria-hidden="true" className={lit ? "text-[13px] text-lilac" : "text-[13px] text-mist/70 group-hover:text-snow"} />
      ) : (
        <span aria-hidden="true" className={lit ? "h-1.5 w-1.5 rounded-full bg-lilac" : "h-1.5 w-1.5 rounded-full bg-mist/50"} />
      )}
      {tool.name}
      {lit && (
        <span className="ml-0.5 rounded-full bg-volt/30 px-1.5 text-[10px] text-lilac">
          <span className="sr-only">used in </span>
          {builds.length}
          <span className="sr-only"> case {builds.length === 1 ? "study" : "studies"}</span>
        </span>
      )}
    </li>
  );
}
