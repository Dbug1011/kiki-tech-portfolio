import Image from "next/image";
import Link from "next/link";
import { MdArrowForward, MdArrowOutward, MdCheck } from "react-icons/md";
import {
  SiFirebase,
  SiFlutter,
  SiGithub,
  SiGooglecloud,
  SiInfluxdb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPython,
  SiRaspberrypi,
  SiReact,
} from "react-icons/si";
import CapabilityLyrics from "@/components/site/capability-lyrics";
import CaseStudyGrid from "@/components/site/case-study-grid";
import ResumeButton from "@/components/site/resume-button";
import { SectionHeading } from "@/components/site/section-heading";
import TechStack from "@/components/site/tech-stack";
import { caseStudies, categories, type Category } from "@/lib/case-studies";
import { credentials, education, experience, profile } from "@/lib/resume-data";
import { site } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const builtWith = [
  { Icon: SiGooglecloud, name: "Google Cloud" },
  { Icon: SiPython, name: "Python" },
  { Icon: SiNodedotjs, name: "Node.js" },
  { Icon: SiReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiInfluxdb, name: "InfluxDB" },
  { Icon: SiMysql, name: "MySQL" },
  { Icon: SiOpencv, name: "OpenCV" },
  { Icon: SiRaspberrypi, name: "Raspberry Pi" },
  { Icon: SiFlutter, name: "Flutter" },
  { Icon: SiFirebase, name: "Firebase" },
];

const capabilityCopy: Record<Category, string> = {
  cloud:
    "Deployment platforms, APIs, and time-series backends: control/data plane splits, consistent hashing, and dashboards on top.",
  automation:
    "Computer-vision pipelines that turn photos and video into structured data: grading paper exams, classifying produce.",
  hardware:
    "Sensors and actuators wired to software: RFID gates feeding live dashboards, a camera steering a solar panel.",
  apps: "Cross-platform mobile apps for real situations: offline-first disaster preparedness, QR check-ins at the door.",
};

const steps = [
  {
    title: "Frame the problem",
    body: "Who is stuck, what it costs them, and what 'working' looks like before any code.",
  },
  {
    title: "Draw the architecture",
    body: "Stages, data stores, and the contracts between them, so the hard parts show up on paper first.",
  },
  {
    title: "Build the thinnest path",
    body: "One request end to end through every layer, then widen it. Hardware included.",
  },
  {
    title: "Write it up",
    body: "Every build ends as a case study: problem, architecture, stack, and honest results.",
  },
];

// Engineering roles, oldest first, so the current role lands last.
const roles = experience.filter((e) => /engineer|developer/i.test(e.title)).reverse();
const featured = caseStudies[0];

/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="starfield absolute inset-0 opacity-80" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-24 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(121,69,255,0.35),rgba(21,22,65,0.4)_45%,transparent_70%)] blur-2xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-8">
          {/* Small utility text at the edges */}
          <div className="micro flex justify-between text-mist/70">
            <span>Systems · Cloud · Hardware</span>
            <span className="hidden sm:inline">{site.location}</span>
          </div>

          <p className="mt-10 text-center font-display text-xs lowercase tracking-[0.45em] text-lilac md:text-sm">
            Karis Ruth
          </p>

          {/* Cutout portrait in front of the display name, lit from behind. */}
          <div className="relative mx-auto mt-2 w-full max-w-[520px]">
            <h1 className="pointer-events-none absolute inset-x-0 top-[9%] flex justify-center">
              <span className="sr-only">Karis Ruth Jumawan</span>
              <span
                aria-hidden="true"
                className="display-weight whitespace-nowrap font-display text-[13vw] font-normal lowercase leading-none tracking-[-0.02em] text-snow [text-shadow:0_0_60px_rgba(121,69,255,0.35)] sm:text-[7.5rem] lg:text-[9.5rem]"
              >
                jumawan
              </span>
            </h1>
            {/* Rim light */}
            <div
              aria-hidden="true"
              className="absolute inset-x-[12%] top-[12%] bottom-[20%] rounded-full bg-[radial-gradient(ellipse_at_50%_40%,rgba(121,69,255,0.55),rgba(21,22,65,0.4)_55%,transparent_75%)] blur-2xl"
            />
            <div className="feather-portrait relative aspect-[3/4]">
              <Image
                src="/photos/portrait-headshot-soft.webp"
                alt="Portrait of Karis Ruth Jumawan"
                fill
                priority
                quality={92}
                sizes="(min-width: 640px) 520px, 100vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>

          <div className="relative -mt-24 flex flex-col items-center pb-20 text-center">
            <p className="max-w-2xl text-lg font-light leading-relaxed text-snow/85 md:text-xl">
              Computer engineer building backend, cloud, and hardware systems
              that hold up, and writing up how each one works.
            </p>
            <p className="micro mt-3 text-mist">GTM Customer Engineer · Alphaus Inc.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="#work" className="btn-primary">
                Read the case studies <MdArrowForward aria-hidden="true" />
              </Link>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <SiGithub aria-hidden="true" /> GitHub
              </a>
              <ResumeButton className="btn-ghost">Resume</ResumeButton>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Built with */}
      <section aria-label="Built with" className="border-y border-white/[0.05]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-8 sm:px-8 md:flex-row md:gap-10">
          <p className="micro shrink-0 text-mist/60">Built with</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 md:justify-between md:flex-1">
            {builtWith.map(({ Icon, name }) => (
              <li key={name} title={name} className="flex items-center gap-2 text-sm text-white/25 transition-colors hover:text-white/60">
                <Icon aria-hidden="true" className="text-lg" />
                <span className="hidden xl:inline">{name}</span>
                <span className="sr-only xl:hidden">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------- Capabilities */}
      <section aria-labelledby="cap-h" id="capabilities" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
          <CapabilityLyrics
            heading={
              <SectionHeading id="cap-h" eyebrow="Capabilities" lines={["Systems across", "the whole stack"]}>
                From the gRPC call to the servo motor. Every area below links to
                builds with the architecture drawn out.
              </SectionHeading>
            }
            items={categories
              .filter((c): c is { key: Category; label: string } => c.key !== "all")
              .map((c) => {
                const studies = caseStudies.filter((s) => s.category === c.key);
                return {
                  key: c.key,
                  label: c.label,
                  copy: capabilityCopy[c.key],
                  count: studies.length,
                  stack: Array.from(new Set(studies.flatMap((s) => s.stack))).slice(0, 6),
                };
              })}
          />
        </div>
      </section>

      {/* ---------------------------------------- Featured (blue panel) */}
      <section
        aria-labelledby="featured-h"
        className="relative overflow-hidden bg-gradient-to-b from-ice via-peri to-dusk text-ink"
      >
        {/* Oversized numeral as background illustration */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 -top-16 select-none text-[22rem] font-light leading-none text-[#6f86d8]/25 md:-top-24 md:text-[30rem]"
        >
          01
        </span>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="micro text-ink/60">Featured case study</p>
            <h2 id="featured-h" className="mt-4 text-4xl font-light leading-[1.15] tracking-tight md:text-5xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink/75">{featured.tagline}</p>
            <ul className="mt-8 space-y-3">
              {featured.results.map((r) => (
                <li key={r} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/60 text-[11px] text-[#4b55a8]">
                    <MdCheck aria-hidden="true" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
            <Link
              href={`/work/${featured.slug}`}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-snow transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-peri"
            >
              Read the case study <MdArrowForward aria-hidden="true" />
            </Link>
          </div>

          <ol aria-label={`${featured.title} pipeline`} className="rounded-2xl border border-white/50 bg-white/35 p-6 backdrop-blur-md md:p-8">
            {featured.architecture.map((stage, i) => (
              <li key={stage.title} className="relative flex gap-4 pb-6 last:pb-0">
                {i < featured.architecture.length - 1 && (
                  <span aria-hidden="true" className="absolute left-[11px] top-7 h-[calc(100%-1.75rem)] w-px bg-[#4b55a8]/30" />
                )}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#4b55a8]/40 bg-white/70 text-[10px] text-[#4b55a8]">
                  {i + 1}
                </span>
                <div>
                  <p className="micro text-ink/50">{stage.title}</p>
                  <p className="mt-1 text-[15px] text-ink">{stage.nodes.map((n) => n.label).join(" · ")}</p>
                  {stage.nodes[0].detail && <p className="text-sm text-ink/60">{stage.nodes[0].detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------- Case studies */}
      <section aria-labelledby="work-h" id="work" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
          <div className="mb-10">
            <SectionHeading id="work-h" eyebrow="Case studies" lines={["Selected builds,", "end to end"]}>
              Problem, solution, architecture, stack, results, and code for
              each one.
            </SectionHeading>
          </div>
          <CaseStudyGrid />
        </div>
      </section>

      {/* ---------------------------------------------------- Tech stack */}
      <TechStack />

      {/* -------------------------------------------------------- About */}
      <section aria-labelledby="about-h" id="about" className="relative scroll-mt-20 overflow-hidden">
        {/* Blurred luminous ribbon behind the composition */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-[140%] -translate-x-1/2 -translate-y-1/4 -rotate-[8deg] rounded-full bg-gradient-to-r from-transparent via-volt/35 to-transparent blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-8">
          <SectionHeading id="about-h" eyebrow="About" lines={["An engineer who", "talks to customers"]} align="center" />

          <div className="mt-14 grid items-center gap-5 md:grid-cols-[1fr_minmax(0,320px)_1fr]">
            <div className="surface rounded-xl p-6 md:p-7">
              <p className="micro text-lilac">Now</p>
              <h3 className="mt-3 text-xl font-normal leading-snug text-snow">
                GTM Customer Engineer
                <br />
                <span className="text-mist">Alphaus Inc. · Tokyo</span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mist">{profile.summary}</p>
            </div>

            <div className="relative mx-auto aspect-[9/16] w-full max-w-[240px] md:max-w-[320px] overflow-hidden rounded-xl bg-lilac md:order-none">
              <Image
                src="/photos/portrait-podium.jpg"
                alt="Karis Ruth Jumawan speaking at a podium at her graduation"
                fill
                sizes="320px"
                className="object-cover object-[50%_30%]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-lilac/40" />
            </div>

            <div className="surface rounded-xl p-6 md:p-7">
              <p className="micro text-lilac">Credentials</p>
              <ul className="mt-3 divide-y divide-white/[0.06]">
                {credentials.slice(0, 4).map((c) => (
                  <li key={c.name} className="py-2.5">
                    <p className="text-sm text-snow/90">{c.name}</p>
                    <p className="text-xs text-mist/80">{c.issuer}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-white/[0.06] pt-3 text-xs text-mist">
                {education[0].title}, {education[0].org} ({education[0].period})
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Process */}
      <section aria-labelledby="process-h" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
          <SectionHeading id="process-h" eyebrow="How I work" lines={["Problem first,", "write-up last"]} align="center" />

          <div className="mt-16 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
            <ol className="space-y-10 md:text-right">
              {steps.slice(0, 2).map((s, i) => (
                <Step key={s.title} n={i + 1} {...s} />
              ))}
            </ol>

            {/* Glossy orb with a bright rim */}
            <div aria-hidden="true" className="relative mx-auto h-48 w-48 md:h-64 md:w-64">
              <div className="absolute inset-0 rounded-full bg-volt/40 blur-3xl" />
              <div className="animate-float absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#ffffff_0%,#CEC6EE_10%,#7945FF_42%,#2a1a6e_75%,#151641_100%)] shadow-[inset_0_0_0_1px_rgba(206,198,238,0.6),inset_-18px_-24px_50px_rgba(11,13,15,0.6),0_0_80px_-10px_rgba(121,69,255,0.9)]" />
            </div>

            <ol start={3} className="space-y-10">
              {steps.slice(2).map((s, i) => (
                <Step key={s.title} n={i + 3} {...s} />
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Experience */}
      <section aria-labelledby="exp-h" id="experience" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
          <SectionHeading id="exp-h" eyebrow="Experience" lines={["Where I've", "shipped"]} align="center" />

          <ul className="mt-14 grid items-end gap-5 md:grid-cols-3">
            {roles.map((role, i) => {
              const current = i === roles.length - 1;
              return (
                <li
                  key={`${role.org}-${role.title}`}
                  className={
                    current
                      ? "relative rounded-xl border border-volt/60 bg-gradient-to-b from-[#221a44] to-graphite p-7 shadow-[0_0_60px_-20px_rgba(121,69,255,0.8)] md:-translate-y-6 md:pb-10"
                      : "surface rounded-xl p-7"
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="micro text-mist">{role.period}</p>
                    {current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-lilac">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-volt shadow-[0_0_8px_#7945FF]" />
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-normal leading-snug text-snow">{role.title}</h3>
                  <p className="text-sm text-mist">
                    {role.org}
                    {role.place && ` · ${role.place}`}
                  </p>
                  {role.points && (
                    <ul className="mt-6 space-y-3 border-t border-white/[0.07] pt-6">
                      {role.points.map((p) => (
                        <li key={p} className="flex gap-3 text-sm leading-relaxed text-snow/75">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-lilac/15 text-[10px] text-lilac">
                            <MdCheck aria-hidden="true" />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-12 flex justify-center">
            <ResumeButton section="experience" className="btn-ghost">
              Full history, education &amp; awards <MdArrowOutward aria-hidden="true" />
            </ResumeButton>
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li>
      <p aria-hidden="true" className="text-6xl font-light leading-none text-lilac/30">
        {String(n).padStart(2, "0")}
      </p>
      <h3 className="mt-2 text-lg font-normal text-snow">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-mist">{body}</p>
    </li>
  );
}
