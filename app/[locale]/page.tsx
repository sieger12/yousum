import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { buildHreflang } from "@/lib/hreflang";
import SearchForm from "@/components/SearchForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDesc"),
    metadataBase: new URL("https://yousum.io"),
    alternates: { canonical: `/${locale}`, languages: buildHreflang("") },
    openGraph: { title: t("homeTitle"), description: t("homeDesc") },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const seo = await getTranslations({ locale, namespace: "home.seo" });

  const features = [
    { icon: "✦", title: t("features.0.title"), desc: t("features.0.desc") },
    { icon: "◈", title: t("features.1.title"), desc: t("features.1.desc") },
    { icon: "⊕", title: t("features.2.title"), desc: t("features.2.desc") },
  ];

  const faqs: { q: string; a: string }[] = [
    { q: seo("faqs.0.q"), a: seo("faqs.0.a") },
    { q: seo("faqs.1.q"), a: seo("faqs.1.a") },
    { q: seo("faqs.2.q"), a: seo("faqs.2.a") },
    { q: seo("faqs.3.q"), a: seo("faqs.3.a") },
  ];

  const toolLabels = [
    "YouTube transcript tool", "AI video summary tool",
    "YouTube timestamps viewer", "YouTube notes generator",
    "Summarize educational videos", "Summarize podcast videos",
  ];

  return (
    <div className="flex flex-col items-center px-4">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-rose-500 mb-4">
          {t("badge")}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          {t("h1")}<br />
          <span className="gradient-text">{t("h1gradient")}</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-10">{t("sub")}</p>
        <SearchForm locale={locale} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14 w-full">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="surface p-5 rounded-xl">
              <span className="gradient-text text-lg font-bold">{icon}</span>
              <p className="font-semibold text-white mt-2 mb-1 text-sm">{title}</p>
              <p className="text-zinc-500 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEO blocks */}
      <div className="w-full max-w-2xl py-16 space-y-12">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">{seo("h2_1")}</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">{seo("p1")}</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-3">{seo("h2_2")}</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">{seo("p2")}</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-3">{seo("h2_3")}</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">{seo("p3")}</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-3">{seo("h2_4")}</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">{seo("p4")}</p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-white mb-5">{seo("faqTitle")}</h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <p className="text-white text-sm font-semibold mb-1">{q}</p>
                <p className="text-zinc-500 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">{seo("toolsTitle")}</h2>
          <div className="flex flex-wrap gap-3">
            {toolLabels.map((label) => (
              <a key={label} href={`/${locale}`} className="text-xs text-zinc-500 hover:text-rose-400 transition border border-white/10 px-3 py-1.5 rounded-lg hover:border-rose-500/30">
                {label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
