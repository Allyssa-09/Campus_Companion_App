import type { Metadata } from "next";
import { SkipLink } from "@/components/ui/SkipLink";
import { SiteNav } from "@/components/ui/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Campus Companion",
    template: "%s | Campus Companion",
  },
  description:
    "Your first-year guide to Hartwell University — timetables, maps, announcements and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,300&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SkipLink />
        <SiteNav />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer" role="contentinfo">
          <p>
            © 2025 Hartwell University · Campus Companion ·{" "}
            <a href="/accessibility">Accessibility statement</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
