import { locales } from "@/i18n/routing";

const BASE = "https://yousum.io";

export function buildHreflang(path: string): Record<string, string> {
  const result: Record<string, string> = {
    "x-default": `${BASE}/en${path}`,
  };
  for (const locale of locales) {
    result[locale] = `${BASE}/${locale}${path}`;
  }
  return result;
}
