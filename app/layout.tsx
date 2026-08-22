import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
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
  icons: {
    icon: [
      { url: "/logo_light.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo_dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider
          search={{
            options: {
              api: "/api/search",
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
