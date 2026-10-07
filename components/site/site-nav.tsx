"use client";

import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { RESUME_PDF, useDocumentViewer } from "@/components/ui/document-viewer";
import { nav, site } from "@/lib/site";

const SiteNav = () => {
  const { openDocument } = useDocumentViewer();

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.05] bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link
          href="/"
          className="focus-ring rounded font-display text-sm uppercase tracking-[0.35em] text-snow"
        >
          Kiki
        </Link>

        {/* Pill navigation: translucent dark surface with a fine outline. */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="micro focus-ring block rounded-full px-3.5 py-1.5 text-mist transition-colors hover:bg-white/[0.06] hover:text-snow"
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
            className="micro focus-ring hidden items-center gap-1 rounded-full px-3 py-1.5 text-mist transition-colors hover:text-snow sm:inline-flex"
          >
            Creative <MdArrowOutward aria-hidden="true" />
          </a>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => openDocument(RESUME_PDF)}
            className="btn-primary px-4 py-2"
          >
            Résumé
          </button>
        </div>
      </div>
    </header>
  );
};

export default SiteNav;
