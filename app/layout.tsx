import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { DocumentViewerProvider } from "@/components/ui/document-viewer";
import CursorGlow from "@/components/ui/cursor-glow";
import AmbientBackground from "@/components/ui/ambient-background";
import SiteNav from "@/components/site/site-nav";
import SiteFooter from "@/components/site/site-footer";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Technical portfolio of Karis Ruth Jumawan: cloud and backend systems, automation tools, and hardware/software builds, written up as case studies.";

export const metadata: Metadata = {
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
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
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
