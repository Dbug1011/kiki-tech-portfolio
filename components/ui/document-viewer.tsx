"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MdClose, MdDownload, MdOpenInNew } from "react-icons/md";
import { useMounted } from "@/app/hooks/use-mounted";
import dynamic from "next/dynamic";

// The dossier (and all its résumé data) stays out of the initial bundle and
// loads on first open. `preloadDossier` lets a trigger warm it on hover.
const loadDossier = () => import("@/components/ui/resume-dossier");
const ResumeDossier = dynamic(loadDossier, { ssr: false });
export const preloadDossier = () => {
  void loadDossier();
};
import type { ResumeSection } from "@/lib/resume-data";

type ViewerDoc = { src: string; title: string };

type Active =
  | { kind: "dossier"; section: ResumeSection }
  | { kind: "file"; doc: ViewerDoc };

type DocumentViewerContextType = {
  openDocument: (doc: ViewerDoc) => void;
  openDossier: (section?: ResumeSection) => void;
  closeDocument: () => void;
};

const DocumentViewerContext = createContext<
  DocumentViewerContextType | undefined
>(undefined);

/** The downloadable PDF résumé, shown by the navbar's Resume button. */
export const RESUME_PDF: ViewerDoc = {
  src: "/pdf/Karis-Ruth-Jumawan-Resume.pdf",
  title: "Resume",
};

export const isPdf = (href: string) => /\.pdf($|[?#])/i.test(href);
export const isVideo = (href: string) => /\.(mp4|webm)($|[?#])/i.test(href);

/**
 * Hosts every in-page reader for the app: the native résumé dossier, the PDF
 * previewer, and a video player. Components call `openDossier()` /
 * `openDocument()` instead of linking straight to raw files, so visitors
 * never get bounced to a bare file tab or a surprise download.
 */
export const DocumentViewerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [active, setActive] = useState<Active | null>(null);
  const mounted = useMounted();

  const openDocument = useCallback(
    (doc: ViewerDoc) => setActive({ kind: "file", doc }),
    []
  );
  const openDossier = useCallback(
    (section: ResumeSection = "overview") =>
      setActive({ kind: "dossier", section }),
    []
  );
  const closeDocument = useCallback(() => setActive(null), []);

  // Shareable deep link: /#resume opens the PDF résumé on load.
  useEffect(() => {
    if (window.location.hash === "#resume") openDocument(RESUME_PDF);
  }, [openDocument]);

  // Freeze the ambient background while a modal covers it. Nobody can see
  // the blobs moving behind the modal, and the modal's own backdrop-blur no
  // longer has to be recomputed every frame.
  useEffect(() => {
    document.documentElement.classList.toggle("ambient-paused", !!active);
  }, [active]);

  const value = useMemo(
    () => ({ openDocument, openDossier, closeDocument }),
    [openDocument, openDossier, closeDocument]
  );

  return (
    <DocumentViewerContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {active?.kind === "dossier" && (
              <ResumeDossier
                key="dossier"
                initialSection={active.section}
                onClose={closeDocument}
              />
            )}
            {active?.kind === "file" && (
              <FileViewerModal
                key={active.doc.src}
                doc={active.doc}
                onClose={closeDocument}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </DocumentViewerContext.Provider>
  );
};

export const useDocumentViewer = () => {
  const context = useContext(DocumentViewerContext);
  if (!context) {
    throw new Error(
      "useDocumentViewer must be used within a DocumentViewerProvider"
    );
  }
  return context;
};

const FileViewerModal = ({
  doc,
  onClose,
}: {
  doc: ViewerDoc;
  onClose: () => void;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const mounted = useMounted();
  const rawPrefersReducedMotion = useReducedMotion();
  const prefersReducedMotion = mounted && !!rawPrefersReducedMotion;
  const video = isVideo(doc.src);

  // Why PDFs used to download: when a browser has no inline PDF viewer (or
  // the user turned on "Download PDF files" in Chrome/Edge), *any* <object>
  // or <iframe> pointing at a PDF silently triggers a download. The standard
  // `navigator.pdfViewerEnabled` flag tells us up front, so we only mount the
  // embed when it will actually render inline.
  const [canInline, setCanInline] = useState<boolean | null>(null);
  useEffect(() => {
    const flag = (navigator as Navigator & { pdfViewerEnabled?: boolean })
      .pdfViewerEnabled;
    setCanInline(flag !== false);
  }, []);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] };

  const src = encodeURI(doc.src);
  // Chrome/Edge/Firefox's built-in viewers honour these hash params; others
  // ignore them harmlessly.
  const viewerSrc = `${src}#toolbar=1&navpanes=0&view=FitH`;

  const actionClass =
    "h-9 px-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 text-white/85 text-xs font-medium hover:border-cyan-400/50 hover:text-white hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400";

  return (
    <motion.div
      className="fixed inset-0 z-[10001] flex items-center justify-center p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        className={
          "relative w-full flex flex-col rounded-2xl overflow-hidden border border-white/15 bg-slate-950/85 backdrop-blur-md md:bg-slate-950/70 md:backdrop-blur-xl shadow-[0_0_80px_-20px_rgba(34,211,238,0.55)] " +
          (video ? "max-w-5xl" : "max-w-5xl h-[92dvh]")
        }
        initial={prefersReducedMotion ? false : { y: 24, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={prefersReducedMotion ? undefined : { y: 24, scale: 0.98 }}
        transition={transition}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
          <h2 className="text-white font-semibold text-sm sm:text-base truncate">
            {doc.title}
          </h2>
          <div className="flex shrink-0 items-center gap-2">
          {!video && (
            <>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionClass} hidden sm:inline-flex`}
              >
                <MdOpenInNew aria-hidden="true" />
                New tab
              </a>
              {/* Only downloads when the visitor asks for it. */}
              <a href={src} download className={actionClass}>
                <MdDownload aria-hidden="true" />
                <span className="hidden sm:inline">Download</span>
              </a>
            </>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`${actionClass} px-2`}
          >
            <MdClose className="text-base" aria-hidden="true" />
          </button>
          </div>
        </div>

        {video ? (
          <video
            className="aspect-video w-full bg-black"
            src={src}
            controls
            autoPlay
            playsInline
            preload="auto"
          />
        ) : canInline === null ? (
          <div className="flex-1 animate-pulse bg-white/[0.03]" />
        ) : canInline ? (
          <object
            data={viewerSrc}
            type="application/pdf"
            aria-label={doc.title}
            className="flex-1 w-full bg-neutral-800"
          >
            <PreviewUnavailable src={src} title={doc.title} actionClass={actionClass} />
          </object>
        ) : (
          <PreviewUnavailable src={src} title={doc.title} actionClass={actionClass} />
        )}
      </motion.div>
    </motion.div>
  );
};

const PreviewUnavailable = ({
  src,
  title,
  actionClass,
}: {
  src: string;
  title: string;
  actionClass: string;
}) => (
  <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
    <p className="text-white/80 text-sm max-w-sm">
      This browser can&apos;t preview PDFs inline, so nothing was downloaded.
      You can still open {title} in its own tab if you&apos;d like.
    </p>
    <a href={src} target="_blank" rel="noopener noreferrer" className={actionClass}>
      <MdOpenInNew aria-hidden="true" />
      Open in new tab
    </a>
  </div>
);
