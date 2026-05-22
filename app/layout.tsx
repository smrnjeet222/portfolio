import type { Metadata } from "next";
import "./globals.css";
import TerminalCursor from "@/components/TerminalCursor";
import NpxTerminal from "@/components/NpxTerminal";
import ProgressBar from "@/components/ProgressBar";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";

export const metadata: Metadata = {
  title: "Simranjeet Singh — Senior Software Engineer (Web3 / Fullstack)",
  description:
    "Portfolio of Simranjeet Singh — Senior Software Engineer specializing in Web3 and fullstack development. Building DeFi protocols, token systems, NFT platforms, and distributed product systems at scale.",
  keywords: [
    "Simranjeet Singh",
    "Web3 Developer",
    "Fullstack Engineer",
    "Solidity",
    "DeFi",
    "Next.js",
    "React",
    "NestJS",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
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
