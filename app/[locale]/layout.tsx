import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geist = Geist({ subsets: ["latin"] });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDesc"),
    metadataBase: new URL("https://yousum.io"),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ko: "/ko" },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDesc"),
      url: `https://yousum.io/${locale}`,
      siteName: "YouSum",
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ko")) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} className={geist.className}>
      <body className="min-h-screen flex flex-col bg-[#09090b]">
        <NextIntlClientProvider messages={messages}>
          <header className="border-b border-white/5 sticky top-0 z-40" style={{ background: "rgba(9,9,11,0.92)", backdropFilter: "blur(16px)" }}>
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <a href={`/${locale}`} className="font-extrabold text-lg gradient-text">YouSum</a>
              <div className="flex items-center gap-5">
                <nav className="flex items-center gap-5 text-sm text-zinc-500">
                  <a href={`/${locale}`} className="hover:text-rose-400 transition">
                    {locale === "ko" ? "요약하기" : "Summarizer"}
                  </a>
                  <a href={`/${locale}/how-it-works`} className="hover:text-rose-400 transition">
                    {locale === "ko" ? "사용 방법" : "How it works"}
                  </a>
                </nav>
                <div className="flex gap-1 text-xs">
                  <a href="/en" className={`px-2 py-1 rounded transition ${locale === "en" ? "text-white font-semibold" : "text-zinc-600 hover:text-zinc-400"}`}>EN</a>
                  <a href="/ko" className={`px-2 py-1 rounded transition ${locale === "ko" ? "text-white font-semibold" : "text-zinc-600 hover:text-zinc-400"}`}>KO</a>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/5 py-6 text-center text-xs text-zinc-700">
            {locale === "ko" ? "© 2026 YouSum · 유튜브 및 구글과 무관합니다." : "© 2026 YouSum · Not affiliated with YouTube or Google."}
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
