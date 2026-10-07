import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-4 py-32 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300/80">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">Nothing deployed at this route.</h1>
      <Link href="/" className="mt-6 text-sm font-medium text-cyan-300 hover:text-cyan-200">
        ← Back to the case studies
      </Link>
    </section>
  );
}
