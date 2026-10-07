import { cn } from "@/lib/utils";

/**
 * Eyebrow + a deliberately short, two-line heading. Pass the heading as
 * `lines` so each section controls its own line break.
 */
export function SectionHeading({
  id,
  eyebrow,
  lines,
  align = "left",
  children,
}: {
  id: string;
  eyebrow: string;
  lines: [string, string?];
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="micro text-lilac">{eyebrow}</p>
      <h2 id={id} className="mt-4 text-3xl font-light leading-[1.2] tracking-tight text-snow md:text-[2.75rem]">
        {lines[0]}
        {lines[1] && (
          <>
            <br />
            <span className="text-snow/60">{lines[1]}</span>
          </>
        )}
      </h2>
      {children && <p className="mt-4 text-base leading-relaxed text-mist">{children}</p>}
    </div>
  );
}
