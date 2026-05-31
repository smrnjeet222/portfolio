import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://jeet22.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
