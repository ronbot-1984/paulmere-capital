import type { Metadata, Viewport } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./components.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const display = Newsreader({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  style: ["normal", "italic"],
  variable: "--f-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--f-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--f-mono",
  display: "swap",
});

const SITE = "https://paul.ronbot1984.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Paulmere Capital — Compounding conviction across cycles",
    template: "%s · Paulmere Capital",
  },
  description:
    "Paulmere Capital is a global investment firm managing $184 billion across macro, systematic, relative value, credit and private capital strategies for institutions and sovereign investors.",
  keywords: [
    "investment management",
    "global macro",
    "systematic strategies",
    "multi-strategy",
    "private capital",
    "institutional investors",
  ],
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Paulmere Capital",
    title: "Paulmere Capital — Compounding conviction across cycles",
    description:
      "A global investment firm managing $184 billion across five research-led strategies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paulmere Capital",
    description:
      "A global investment firm managing $184 billion across five research-led strategies.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <div className="grain" aria-hidden="true" />
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
