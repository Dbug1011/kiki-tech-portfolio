"use client";

import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { RESUME_PDF, useDocumentViewer } from "@/components/ui/document-viewer";
import { nav, site } from "@/lib/site";

const SiteNav = () => {
  const { openDocument } = useDocumentViewer();

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#050a14]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
            k
          </span>
          <span className="hidden sm:inline">
            {site.handle}
            <span className="text-cyan-300">/</span>
            <span className="text-white/60">systems</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm text-white/65">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-1.5 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.creativeUrl}
            className="hidden items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Creative work
            <MdArrowOutward aria-hidden="true" />
          </a>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => openDocument(RESUME_PDF)}
            className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-100 transition-colors hover:bg-cyan-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Résumé
          </button>
        </div>
      </div>
    </header>
  );
};

export default SiteNav;
