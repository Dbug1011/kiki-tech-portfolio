import { cn } from "@/lib/utils";

/**
 * Full-bleed moving gradient. Instead of animating `background-position`
 * (which repaints the whole viewport every frame), a few large pre-blurred
 * colour blobs drift with `transform` only. Each blob is promoted to its own
 * compositor layer, so the GPU just moves textures around and the main
 * thread stays free.
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
        "pointer-events-none absolute inset-0 overflow-hidden bg-[#050a14]",
        className
      )}
    >
      <div className="ambient-blob left-[-15%] top-[-20%] h-[70vmax] w-[70vmax] bg-[radial-gradient(circle,rgba(37,99,235,0.42),transparent_65%)] animate-drift-a" />
      <div className="ambient-blob right-[-20%] top-[-10%] h-[60vmax] w-[60vmax] bg-[radial-gradient(circle,rgba(6,182,212,0.28),transparent_65%)] animate-drift-b" />
      <div className="ambient-blob bottom-[-30%] left-[20%] h-[75vmax] w-[75vmax] bg-[radial-gradient(circle,rgba(79,70,229,0.32),transparent_65%)] animate-drift-c" />
      {/* Fourth blob is desktop-only: one fewer full-screen layer on phones. */}
      <div className="ambient-blob hidden md:block bottom-[-10%] right-[-10%] h-[45vmax] w-[45vmax] bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_65%)] animate-drift-b [animation-delay:-12s]" />
      {/* Vignette keeps text contrast steady wherever the blobs wander. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,14,0.8)_100%)]" />
    </div>
  );
}
