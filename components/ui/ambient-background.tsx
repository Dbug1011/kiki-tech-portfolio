import { cn } from "@/lib/utils";

/**
 * Atmospheric lighting: broad, blurred midnight-indigo and violet glows that
 * fade into the near-black canvas. Kept dim and concentrated near the top so
 * dark neutrals stay dominant. Blobs move with `transform` only, so the GPU
 * just slides textures around.
 */
export default function AmbientBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-ink",
        className
      )}
    >
      <div className="ambient-blob left-[-20%] top-[-35%] h-[70vmax] w-[70vmax] bg-[radial-gradient(circle,rgba(21,22,65,0.9),transparent_65%)] animate-drift-a" />
      <div className="ambient-blob right-[-25%] top-[-25%] h-[55vmax] w-[55vmax] bg-[radial-gradient(circle,rgba(121,69,255,0.2),transparent_65%)] animate-drift-b" />
      {/* Third blob is desktop-only: one fewer full-screen layer on phones. */}
      <div className="ambient-blob hidden md:block bottom-[-45%] left-[25%] h-[60vmax] w-[60vmax] bg-[radial-gradient(circle,rgba(21,22,65,0.7),transparent_65%)] animate-drift-c" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_35%,rgba(11,13,15,0.85)_100%)]" />
    </div>
  );
}
