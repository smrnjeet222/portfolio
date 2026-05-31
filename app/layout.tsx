import type { Metadata, Viewport } from "next";
import "./globals.css";
import TerminalCursor from "@/components/TerminalCursor";
import NpxTerminal from "@/components/NpxTerminal";
import ProgressBar from "@/components/ProgressBar";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";

const SITE_URL = "https://jeet22.xyz";
const SITE_NAME = "Simranjeet Singh";
const TITLE = "Simranjeet Singh — Senior Software Engineer (Web3 / Fullstack)";
const DESCRIPTION =
  "Portfolio of Simranjeet Singh — Senior Software Engineer specializing in Web3 and fullstack development. Building DeFi protocols, token systems, NFT platforms, and distributed product systems at scale.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Simranjeet Singh",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Simranjeet Singh",
    "smrnjeet222",
    "smrnjeet_22",
    "jeet22",
    "Web3 Developer",
    "Web3 Engineer",
    "Fullstack Engineer",
    "Senior Software Engineer",
    "Solidity",
    "Smart Contracts",
    "DeFi",
    "NFT",
    "Ethereum",
    "EVM",
    "Next.js",
    "React",
    "TypeScript",
    "NestJS",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Simranjeet Singh", url: SITE_URL }],
  creator: "Simranjeet Singh",
  publisher: "Simranjeet Singh",
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Simranjeet Singh — Senior Software Engineer (Web3 / Fullstack)",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@smrnjeet_22",
    creator: "@smrnjeet_22",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Simranjeet Singh",
  alternateName: ["smrnjeet222", "jeet22"],
  url: SITE_URL,
  image: `${SITE_URL}/simranjeet.jpg`,
  jobTitle: "Senior Software Engineer",
  description: DESCRIPTION,
  email: "mailto:smrnjeet.dev@gmail.com",
  sameAs: [
    "https://github.com/smrnjeet222",
    "https://www.linkedin.com/in/smrnjeet222/",
    "https://twitter.com/smrnjeet_22",
    "https://x.com/smrnjeet_22",
  ],
  knowsAbout: [
    "Web3",
    "Solidity",
    "DeFi",
    "Ethereum",
    "Smart Contracts",
    "TypeScript",
    "React",
    "Next.js",
    "NestJS",
    "Node.js",
    "Fullstack Development",
  ],
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: SITE_NAME,
  description: DESCRIPTION,
  inLanguage: "en-US",
  author: { "@type": "Person", name: "Simranjeet Singh" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-full">
        <ProgressBar />
        <TerminalCursor />
        <NpxTerminal />
        <KonamiEasterEgg />
        {children}
      </body>
    </html>
  );
}
