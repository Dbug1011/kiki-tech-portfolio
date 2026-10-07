import { SiGithub, SiLinkedin } from "react-icons/si";
import { MdArrowOutward, MdMailOutline } from "react-icons/md";
import { site } from "@/lib/site";

const iconLink =
  "focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mist transition-colors hover:border-lilac/40 hover:text-snow";

/** Centered contact block inside a large planetary arc edged with violet light. */
const SiteFooter = () => (
  <footer id="contact" className="relative scroll-mt-20 overflow-hidden pt-24">
    {/* The arc: a huge circle whose top edge catches violet light. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-40 h-[1400px] w-[1400px] -translate-x-1/2 rounded-full border-t border-lilac/40 bg-[radial-gradient(circle_at_50%_0%,rgba(121,69,255,0.22),rgba(21,22,65,0.35)_18%,#0B0D0F_45%)] shadow-[0_-30px_120px_-20px_rgba(121,69,255,0.55)] md:top-48"
    />

    <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 pb-16 pt-28 text-center sm:px-8 md:pt-36">
      <p className="micro text-lilac">Contact</p>
      <h2 className="mt-4 text-3xl font-light leading-[1.2] tracking-tight text-snow md:text-5xl">
        Building something that
        <br />
        has to hold up?
      </h2>
      <p className="mt-5 max-w-md text-base leading-relaxed text-mist">
        Cloud platforms, infrastructure, and hardware prototypes that need to
        become working systems. Happy to talk.
      </p>

      <a href={`mailto:${site.email}`} className="btn-primary mt-8">
        <MdMailOutline aria-hidden="true" className="text-sm" /> {site.email}
      </a>

      <div className="mt-8 flex items-center gap-3">
        <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
          <SiGithub aria-hidden="true" />
        </a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
          <SiLinkedin aria-hidden="true" />
        </a>
        <a href={site.creativeUrl} className="btn-ghost ml-1 py-2">
          Creative portfolio <MdArrowOutward aria-hidden="true" />
        </a>
      </div>

      <p className="micro mt-16 text-mist/50">
        © {new Date().getFullYear()} {site.name} · {site.location}
      </p>
    </div>
  </footer>
);

export default SiteFooter;
