import type { Metadata } from "next";

const SITE_URL = "https://jeet22.xyz";
const TITLE = "Resume";
const DESCRIPTION =
  "Years of shipping, on one page. Senior Software Engineer building AI, fullstack, and Web3 systems. View or download PDF.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/resume`,
  },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/resume`,
    title: `${TITLE} - Simranjeet Singh`,
    description: DESCRIPTION,
    images: [
      {
        url: "/resume/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Simranjeet Singh - Resume",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} - Simranjeet Singh`,
    description: DESCRIPTION,
    images: ["/resume/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
