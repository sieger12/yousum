import { getRequestConfig } from "next-intl/server";
import { routing, Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  // Only en and ko have full translations, everything else falls back to en
  const messageLocale = (locale === "ko") ? "ko" : "en";

  return {
    locale,
    messages: (await import(`../messages/${messageLocale}.json`)).default,
  };
});
