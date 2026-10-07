export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300/80">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">{children}</p>}
    </div>
  );
}
