import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdArrowBack, MdArrowForward, MdArrowOutward, MdCheck } from "react-icons/md";
import { SiGithub } from "react-icons/si";
import { ArchitectureDiagram } from "@/components/site/architecture-diagram";
import { StatusBadge } from "@/components/site/status-badge";
import { caseStudies, categories, getCaseStudy, type CaseLink } from "@/lib/case-studies";
import { site } from "@/lib/site";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return { title: study.title, description: study.tagline };
}

const sections = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "architecture", label: "Architecture" },
  { id: "stack", label: "Stack" },
  { id: "results", label: "Results" },
  { id: "links", label: "Repos & demos" },
];

const LinkIcon = ({ kind }: { kind: CaseLink["kind"] }) =>
  kind === "repo" ? <SiGithub aria-hidden="true" /> : <MdArrowOutward aria-hidden="true" />;

function Block({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border-t border-white/[0.07] py-10">
      <p className="font-mono text-xs text-cyan-300/70">{String(n).padStart(2, "0")}</p>
      <h2 id={`${id}-h`} className="mt-1 text-2xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function CaseStudyPage({ params }: Params) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const category = categories.find((c) => c.key === study.category)?.label;

  return (
    <article className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 rounded text-sm text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <MdArrowBack aria-hidden="true" /> All case studies
      </Link>

      {/* Header */}
      <header className="mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-white/45">
            {category} · {study.year}
          </span>
          <StatusBadge status={study.status} />
        </div>
        <h1 className="text-legible mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {study.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-white/70">{study.tagline}</p>
        <p className="mt-4 font-mono text-xs text-white/50">
          Role: <span className="text-white/80">{study.role}</span>
        </p>
      </header>

      {study.metrics && (
        <dl className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {study.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <dt className="text-xs text-white/50">{m.label}</dt>
              <dd className="mt-1 text-2xl font-semibold text-cyan-200">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {study.cover && (
        <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-3xl border border-white/10">
          <Image src={study.cover} alt={`${study.title} cover`} fill className="object-cover" sizes="(min-width: 1152px) 1152px, 100vw" />
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[180px_1fr]">
        {/* Section index */}
        <nav aria-label="Sections" className="hidden lg:block">
          <ol className="sticky top-24 space-y-2 font-mono text-xs">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-white/45 transition-colors hover:text-cyan-200">
                  <span className="text-cyan-300/60">{String(i + 1).padStart(2, "0")}</span> {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0">
          <Block id="problem" n={1} title="Problem">
            <p className="max-w-3xl text-base leading-relaxed text-white/75">{study.problem}</p>
          </Block>

          <Block id="solution" n={2} title="Solution">
            <ul className="max-w-3xl space-y-3">
              {study.solution.map((s) => (
                <li key={s} className="flex gap-3 text-base leading-relaxed text-white/75">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                  {s}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="architecture" n={3} title="Architecture">
            <ArchitectureDiagram stages={study.architecture} />
            {study.architectureNote && (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/60">{study.architectureNote}</p>
            )}
          </Block>

          <Block id="stack" n={4} title="Stack">
            <ul className="flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-xl border border-cyan-300/20 bg-cyan-400/[0.07] px-3 py-1.5 font-mono text-xs text-cyan-100"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="results" n={5} title="Results">
            <ul className="max-w-3xl space-y-3">
              {study.results.map((r) => (
                <li key={r} className="flex gap-3 text-base leading-relaxed text-white/75">
                  <MdCheck aria-hidden="true" className="mt-1 shrink-0 text-emerald-300" />
                  {r}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="links" n={6} title="Repos & demos">
            {study.links.length > 0 ? (
              <ul className="flex flex-wrap gap-3">
                {study.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white/85 transition-colors hover:border-cyan-300/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      <LinkIcon kind={l.kind} /> {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="max-w-3xl text-sm leading-relaxed text-white/60">
                The code for this one isn&apos;t public. Happy to walk through it,{" "}
                <a href={`mailto:${site.email}`} className="text-cyan-300 underline-offset-4 hover:underline">
                  just ask
                </a>
                .
              </p>
            )}
          </Block>
        </div>
      </div>

      {/* Next */}
      <Link
        href={`/work/${next.slug}`}
        data-cursor="magnet"
        className="group mt-10 flex items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition-colors hover:border-cyan-300/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:p-8"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/45">Next case study</p>
          <p className="mt-2 text-2xl font-semibold text-white">{next.title}</p>
          <p className="mt-1 text-sm text-white/60">{next.tagline}</p>
        </div>
        <MdArrowForward aria-hidden="true" className="shrink-0 text-2xl text-cyan-300 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
