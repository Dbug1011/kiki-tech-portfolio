import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-4 py-32 sm:px-8">
      <p className="micro text-lilac">404</p>
      <h1 className="mt-3 text-4xl font-light tracking-tight text-snow">Nothing deployed at this route.</h1>
      <Link href="/" className="btn-ghost mt-8">
        ← Back to the case studies
      </Link>
    </section>
  );
}
