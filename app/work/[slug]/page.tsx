import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdArrowBack, MdArrowForward, MdArrowOutward, MdCheck } from "react-icons/md";
import { SiGithub } from "react-icons/si";
import { ArchitectureDiagram } from "@/components/site/architecture-diagram";
import { StatusBadge } from "@/components/site/status-badge";
import { caseStudies, categories, getCaseStudy, type CaseLink, type CaseStudy } from "@/lib/case-studies";
import HashRingDemo from "@/components/site/hash-ring-demo";
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

// Optional sections only appear (and get a number) when a study has them.
const sectionsFor = (study: CaseStudy) =>
  [
    { id: "problem", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "architecture", label: "Architecture" },
    study.demo && { id: "demo", label: "Try it" },
    study.decisions && { id: "decisions", label: "Decisions" },
    { id: "stack", label: "Stack" },
    { id: "results", label: "Results" },
    { id: "links", label: "Repos & demos" },
  ].filter((s): s is { id: string; label: string } => Boolean(s));

const LinkIcon = ({ kind }: { kind: CaseLink["kind"] }) =>
  kind === "repo" ? <SiGithub aria-hidden="true" /> : <MdArrowOutward aria-hidden="true" />;

function Block({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border-t border-white/[0.07] py-12">
      <p aria-hidden="true" className="text-5xl font-light leading-none text-lilac/25">{String(n).padStart(2, "0")}</p>
      <h2 id={`${id}-h`} className="mt-3 text-2xl font-light tracking-tight text-snow md:text-3xl">
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
  const sections = sectionsFor(study);
  const n = (id: string) => sections.findIndex((s) => s.id === id) + 1;

  return (
    <article className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-8">
      <Link
        href="/#work"
        className="micro focus-ring inline-flex items-center gap-1.5 rounded text-mist transition-colors hover:text-snow"
      >
        <MdArrowBack aria-hidden="true" /> All case studies
      </Link>

      {/* Header */}
      <header className="mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="micro text-mist">
            {category} · {study.year}
          </span>
          <StatusBadge status={study.status} />
        </div>
        <h1 className="mt-5 text-4xl font-light leading-[1.1] tracking-tight text-snow md:text-6xl">
          {study.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-mist md:text-xl">{study.tagline}</p>
        <p className="micro mt-5 text-mist/80">
          Role · <span className="text-snow/90">{study.role}</span>
        </p>
      </header>

      {study.metrics && (
        <dl className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {study.metrics.map((m) => (
            <div key={m.label} className="surface rounded-xl p-4">
              <dt className="micro text-mist">{m.label}</dt>
              <dd className="mt-1 text-3xl font-light text-lilac">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {study.cover && (
        <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-xl border border-white/10">
          <Image src={study.cover} alt={`${study.title} cover`} fill className="object-cover" sizes="(min-width: 1152px) 1152px, 100vw" />
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[180px_1fr]">
        {/* Section index */}
        <nav aria-label="Sections" className="hidden lg:block">
          <ol className="sticky top-24 space-y-2.5 text-[11px] uppercase tracking-[0.16em]">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-mist/70 transition-colors hover:text-snow">
                  <span className="text-lilac/50">{String(i + 1).padStart(2, "0")}</span> {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0">
          <Block id="problem" n={n("problem")} title="Problem">
            <p className="max-w-3xl text-base leading-relaxed text-snow/80">{study.problem}</p>
          </Block>

          <Block id="solution" n={n("solution")} title="Solution">
            <ul className="max-w-3xl space-y-3">
              {study.solution.map((s) => (
                <li key={s} className="flex gap-3 text-base leading-relaxed text-snow/80">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-volt shadow-[0_0_8px_#7945FF]" />
                  {s}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="architecture" n={n("architecture")} title="Architecture">
            <ArchitectureDiagram stages={study.architecture} />
            {study.architectureNote && (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-mist">{study.architectureNote}</p>
            )}
          </Block>

          {study.demo === "hash-ring" && (
            <Block id="demo" n={n("demo")} title="Try the routing">
              <p className="mb-6 max-w-3xl text-base leading-relaxed text-snow/80">
                The core idea in miniature: workloads and executors share one
                hash ring, so resizing the pool only moves the workloads next
                to the executor that changed.
              </p>
              <HashRingDemo />
            </Block>
          )}

          {study.decisions && (
            <Block id="decisions" n={n("decisions")} title="Design decisions">
              <ol className="grid gap-4 md:grid-cols-3">
                {study.decisions.map((d, i) => (
                  <li key={d.title} className="surface flex flex-col rounded-xl p-6">
                    <p className="text-sm font-light text-lilac/70">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-lg font-normal leading-snug text-snow">{d.title}</h3>
                    <p className="micro mt-3 text-mist/70">Over</p>
                    <p className="mt-1 text-sm text-mist">{d.over}</p>
                    <p className="micro mt-4 text-mist/70">Why</p>
                    <p className="mt-1 text-sm leading-relaxed text-snow/80">{d.why}</p>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          <Block id="stack" n={n("stack")} title="Stack">
            <ul className="flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-snow/85"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="results" n={n("results")} title="Results">
            <ul className="max-w-3xl space-y-3">
              {study.results.map((r) => (
                <li key={r} className="flex gap-3 text-base leading-relaxed text-snow/80">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lilac/15 text-[11px] text-lilac">
                    <MdCheck aria-hidden="true" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="links" n={n("links")} title="Repos & demos">
            {study.links.length > 0 ? (
              <ul className="flex flex-wrap gap-3">
                {study.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                    >
                      <LinkIcon kind={l.kind} /> {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="max-w-3xl text-sm leading-relaxed text-mist">
                The code for this one isn&apos;t public. Happy to walk through it,{" "}
                <a href={`mailto:${site.email}`} className="text-lilac underline-offset-4 hover:underline">
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
        className="surface focus-ring group mt-12 flex items-center justify-between gap-6 rounded-xl p-6 transition-[border-color,box-shadow] hover:border-volt/50 hover:shadow-[0_0_60px_-25px_rgba(121,69,255,0.9)] md:p-8"
      >
        <div>
          <p className="micro text-lilac">Next case study</p>
          <p className="mt-2 text-2xl font-light text-snow">{next.title}</p>
          <p className="mt-1 text-sm text-mist">{next.tagline}</p>
        </div>
        <MdArrowForward aria-hidden="true" className="shrink-0 text-2xl text-lilac transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
