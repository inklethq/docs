import type { Metadata } from "next";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["300", "400", "500"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.iminklet.com"),
  title: {
    default: "inklet SDK Documentation",
    template: "%s — inklet SDK",
  },
  description:
    "Documentation for @inklethq/sdk — the server-side TypeScript client for inklet e-ink displays.",
  applicationName: "inklet SDK Docs",
  appleWebApp: { title: "inklet SDK Docs" },
  // Declared here so /favicon.ico never falls through to the MDX catch-all.
  icons: {
    icon: [
      { url: "/logo_light.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo_dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

const navbar = (
  <Navbar
    logo={
      <span className="inklet-wordmark">
        inklet <span className="inklet-wordmark-sub">docs</span>
      </span>
    }
    logoLink="https://iminklet.com"
    projectLink="https://github.com/inklethq/sdk"
  />
);

const footer = (
  <Footer>
    <div className="inklet-footer">
      <span>© {new Date().getFullYear()} inklet LLC</span>
      <span className="inklet-footer-links">
        <a href="https://iminklet.com">iminklet.com</a>
        <a href="https://iminklet.com/developers">SDK overview</a>
        <a href="https://www.npmjs.com/package/@inklethq/sdk">npm</a>
      </span>
    </div>
  </Footer>
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${newsreader.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <Head
        color={{
          hue: 30,
          saturation: 8,
          lightness: { light: 12, dark: 92 },
        }}
        backgroundColor={{
          light: "#f5f3ed",
          dark: "#1a1a1a",
        }}
      />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/inklethq/sdk"
          editLink={null}
          feedback={{ content: null }}
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          toc={{ backToTop: "Back to top" }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
