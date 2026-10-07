"use client";

import {
  RESUME_PDF,
  preloadDossier,
  useDocumentViewer,
} from "@/components/ui/document-viewer";
import type { ResumeSection } from "@/lib/resume-data";

/**
 * Opens the PDF résumé, or the in-page dossier at `section` when one is
 * given. Lets server-rendered pages place a résumé trigger anywhere.
 */
export default function ResumeButton({
  section,
  className,
  children,
}: {
  section?: ResumeSection;
  className?: string;
  children: React.ReactNode;
}) {
  const { openDocument, openDossier } = useDocumentViewer();

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => (section ? openDossier(section) : openDocument(RESUME_PDF))}
      onPointerEnter={section ? preloadDossier : undefined}
      onFocus={section ? preloadDossier : undefined}
      className={className}
    >
      {children}
    </button>
  );
}
