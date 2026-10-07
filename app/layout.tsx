import type { Metadata } from "next";
import { JetBrains_Mono, Michroma, Sora } from "next/font/google";
import "./globals.css";
import { DocumentViewerProvider } from "@/components/ui/document-viewer";
import CursorGlow from "@/components/ui/cursor-glow";
import AmbientBackground from "@/components/ui/ambient-background";
import SiteNav from "@/components/site/site-nav";
import SiteFooter from "@/components/site/site-footer";

// Sora: clean, slightly wide geometric sans for everything readable. It
// shares Michroma's geometry without competing with it.
const sans = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});
// Display face for the wordmark and hero name. The intended font is Riosark
// (Nazmulsdesign, commercial). Michroma is the closest free match (wide,
// squircle "o/a/s"); `.display-weight` in globals.css thickens it toward
// Riosark's weight. With a licensed file, drop it in app/fonts/ and swap to:
//   import localFont from "next/font/local";
//   const display = localFont({ src: "./fonts/Riosark.woff2", variable: "--font-display", display: "swap" });
// and remove `.display-weight` from the hero name.
const display = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});
// Mono stays for code-ish details.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Technical portfolio of Karis Ruth Jumawan: cloud and backend systems, automation tools, and hardware/software builds, written up as case studies.";

export const metadata: Metadata = {
  // Vercel sets VERCEL_URL on every deployment.
  metadataBase: new URL(
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
  ),
  title: {
    default: "Karis Ruth Jumawan · Systems & Engineering",
    template: "%s · Karis Ruth Jumawan",
  },
  description,
  icons: { icon: "/assets/logo.svg" },
  openGraph: {
    title: "Karis Ruth Jumawan · Systems & Engineering",
    description,
    siteName: "Karis Ruth Jumawan",
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans font-light antialiased">
        {/* One fixed background for the whole site; content sits above it. */}
        <AmbientBackground className="fixed" />
        <DocumentViewerProvider>
          <div className="relative z-10 flex min-h-dvh flex-col">
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </DocumentViewerProvider>
        <CursorGlow />
      </body>
    </html>
  );
}
