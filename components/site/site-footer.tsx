import { SiGithub, SiLinkedin } from "react-icons/si";
import { MdMailOutline, MdArrowOutward } from "react-icons/md";
import { site } from "@/lib/site";

const linkClass =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition-colors hover:border-cyan-300/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400";

const SiteFooter = () => (
  <footer id="contact" className="scroll-mt-20 border-t border-white/[0.06]">
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-md">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300/80">
          Contact
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Building something that has to work in production?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          Happy to talk about cloud platforms, infrastructure, and turning
          hardware prototypes into working systems.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a href={`mailto:${site.email}`} className={linkClass}>
          <MdMailOutline aria-hidden="true" /> Email
        </a>
        <a href={site.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <SiGithub aria-hidden="true" /> GitHub
        </a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <SiLinkedin aria-hidden="true" /> LinkedIn
        </a>
        <a href={site.creativeUrl} className={linkClass}>
          Creative portfolio <MdArrowOutward aria-hidden="true" />
        </a>
      </div>
    </div>
    <p className="pb-8 text-center font-mono text-[11px] text-white/35">
      © {new Date().getFullYear()} {site.name} · {site.location}
    </p>
  </footer>
);

export default SiteFooter;
