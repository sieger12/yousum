import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yousum.io";
  const locales = ["en", "ko"];
  const pages = ["", "/how-it-works"];

  return locales.flatMap(locale =>
    pages.map(page => ({
      url: `${base}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "weekly" as const : "monthly" as const,
      priority: page === "" ? 1 : 0.7,
    }))
  );
}
