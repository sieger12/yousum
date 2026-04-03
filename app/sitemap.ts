import { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yousum.io";
  const pages = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/how-it-works", priority: 0.7, freq: "monthly" as const },
  ];

  return locales.flatMap(locale =>
    pages.map(({ path, priority, freq }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: freq,
      priority,
    }))
  );
}
