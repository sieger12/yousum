import { defineRouting } from "next-intl/routing";

export const locales = [
  "en", "ko", "af", "ar", "az", "bn", "cs", "da", "de", "el",
  "es", "fa", "fr", "hi", "hu", "id", "it", "ja", "ms", "nl",
  "no", "pl", "pt", "ro", "ru", "sk", "sl", "sv", "sw", "ta",
  "te", "th", "tr", "uk", "ur", "vi", "zh-CN", "zh-TW", "is", "eu",
] as const;

export type Locale = typeof locales[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
});
