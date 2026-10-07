import Link from "next/link";
import { MdArrowDownward, MdArrowOutward } from "react-icons/md";
import { SiGithub } from "react-icons/si";
import CaseStudyGrid from "@/components/site/case-study-grid";
import ResumeButton from "@/components/site/resume-button";
import { SectionHeading } from "@/components/site/section-heading";
import Icons from "@/components/ui/icons";
import { caseStudies } from "@/lib/case-studies";
import { credentials, experience } from "@/lib/resume-data";
import { site } from "@/lib/site";

// Engineering roles only; the full history lives in the résumé dossier.
const roles = experience.filter((e) => /engineer|developer/i.test(e.title));

const facts = [
  { label: "Now", value: "GTM Customer Engineer, Alphaus" },
  { label: "Based in", value: site.location },
  { label: "Degree", value: "BS Computer Engineering, 2026" },
  { label: "Certified", value: "FinOps Certified Practitioner" },
];

const primaryBtn =
  "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_-8px_rgba(34,211,238,0.8)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300";
const ghostBtn =
  "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-cyan-300/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300/80">
              Systems · Cloud · Hardware
            </p>
            <h1 className="text-legible mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl">
              {site.name}
              <span className="drop-legible mt-2 block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                builds systems that hold up.
              </span>
            </h1>
            <p className="text-legible mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Backend and cloud platforms, automation tools, and
              hardware/software builds. Each project here is written up as a
              case study: the problem, the architecture, the stack, and what
              it actually does.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#work" className={primaryBtn}>
                Read the case studies <MdArrowDownward aria-hidden="true" />
              </Link>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className={ghostBtn}>
                <SiGithub aria-hidden="true" /> GitHub
              </a>
              <ResumeButton className={ghostBtn}>Résumé</ResumeButton>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 font-mono text-xs">
            {facts.map((f) => (
              <div key={f.label} className="bg-[#060d1c]/90 p-4">
                <dt className="uppercase tracking-wider text-cyan-300/70">{f.label}</dt>
                <dd className="mt-1.5 text-[13px] leading-snug text-white/85">{f.value}</dd>
              </div>
            ))}
            <div className="col-span-2 flex items-center justify-between bg-[#060d1c]/90 p-4">
              <span className="text-white/55">
                <span className="text-cyan-300">{caseStudies.length}</span> case studies
              </span>
              <a
                href={site.creativeUrl}
                className="inline-flex items-center gap-1 text-white/55 transition-colors hover:text-white"
              >
                Looking for video work? <MdArrowOutward aria-hidden="true" />
              </a>
            </div>
          </dl>
        </div>
      </section>

      {/* Case studies */}
      <section aria-labelledby="work-heading" id="work" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading id="work-heading" eyebrow="Case studies" title="Selected builds">
            Problem, solution, architecture, stack, results, and code for each
            one. Filter by area, or open any card for the full write-up.
          </SectionHeading>
          <CaseStudyGrid />
        </div>
      </section>

      {/* Stack */}
      <section id="stack" aria-label="Stack" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Icons />
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience-heading" id="experience" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <SectionHeading id="experience-heading" eyebrow="Experience" title="Where I've shipped" />
            <ol className="relative space-y-8 border-l border-white/10 pl-6">
              {roles.map((role) => (
                <li key={`${role.org}-${role.title}`} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border border-cyan-300/60 bg-[#050a14] shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                  />
                  <p className="font-mono text-xs text-white/45">
                    {role.period}
                    {role.place && ` · ${role.place}`}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {role.title} <span className="text-white/50">· {role.org}</span>
                  </h3>
                  {role.points && (
                    <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-white/65">
                      {role.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
            <ResumeButton
              section="experience"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            >
              Full history, education &amp; awards <MdArrowOutward aria-hidden="true" />
            </ResumeButton>
          </div>

          <aside aria-labelledby="creds-heading" className="self-start rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:backdrop-blur-md">
            <h3 id="creds-heading" className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300/80">
              Credentials
            </h3>
            <ul className="mt-4 divide-y divide-white/[0.06]">
              {credentials.map((c) => (
                <li key={c.name} className="py-3">
                  <p className="text-sm text-white/85">{c.name}</p>
                  <p className="text-xs text-white/45">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
