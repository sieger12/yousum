import { getTranslations } from "next-intl/server";
import SearchForm from "@/components/SearchForm";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const features = [
    { icon: "✦", title: t("features.0.title"), desc: t("features.0.desc") },
    { icon: "◈", title: t("features.1.title"), desc: t("features.1.desc") },
    { icon: "⊕", title: t("features.2.title"), desc: t("features.2.desc") },
  ];

  const isKo = locale === "ko";

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
        {isKo ? (
          <>
            <section>
              <h2 className="text-xl font-bold text-white mb-3">유튜브 자막 도구란?</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">유튜브 자막 도구는 영상의 음성 내용을 텍스트로 변환해줍니다. 긴 영상을 다시 보는 대신, 자막을 훑어보고 특정 타임스탬프로 바로 이동해 원하는 부분을 찾을 수 있습니다. 학생, 연구자, 마케터, 창업자 등 유튜브 영상에서 정보를 빠르게 얻고 싶은 모든 분에게 유용합니다.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-3">YouSum은 유튜브 영상을 어떻게 요약하나요?</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">YouSum은 유튜브 URL을 받아 자막을 추출하고, 핵심 포인트·타임스탬프·FAQ가 포함된 간결한 요약으로 변환합니다. 강의, 팟캐스트, 인터뷰, 튜토리얼 등 어떤 영상이든 몇 초 만에 읽기 쉬운 노트로 만들어드립니다.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-3">AI 영상 요약을 언제 사용하면 좋나요?</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">시간을 절약하거나, 여러 영상을 빠르게 비교하거나, 긴 토론을 처음부터 다시 보지 않고 복습하고 싶을 때 유용합니다. 강의, TED 강연, 스타트업 인터뷰, 교육 콘텐츠, 제품 리뷰, 비즈니스 팟캐스트에 특히 잘 맞습니다.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-3">자막과 타임스탬프가 중요한 이유</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">자막과 타임스탬프는 영상 콘텐츠를 검색 가능하게 만들어줍니다. 영상 전체를 다시 볼 필요 없이 정확한 답변을 찾고, 특정 순간을 인용하거나 중요한 부분을 복습할 수 있습니다. 요약까지 함께 제공되면 훨씬 빠르고 집중적인 시청 경험이 가능합니다.</p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="text-xl font-bold text-white mb-3">What is a YouTube transcript tool?</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">A YouTube transcript tool helps you turn spoken video content into readable text. Instead of replaying a long video, you can scan the transcript, jump to specific timestamps, and find the exact section you need. This is useful for students, researchers, marketers, founders, and anyone who wants faster access to information inside YouTube videos.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-3">How YouSum summarizes YouTube videos</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">YouSum takes a YouTube URL, extracts the available transcript, and turns it into a concise summary with key points, timestamps, and FAQs. Whether you are learning from a lecture, podcast, interview, or tutorial, YouSum is designed to turn video content into readable notes in seconds.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-3">When to use a YouTube video summary</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">A YouTube video summary is useful when you want to save time, compare multiple videos quickly, or revisit a long discussion without starting from the beginning. It works well for lectures, TED talks, startup interviews, educational explainers, product reviews, and business podcasts.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Why transcripts and timestamps matter</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">Transcripts and timestamps make video content searchable. They help users find exact answers, quote specific moments, and review important sections without scrubbing through the entire video. With a summary on top, the viewing experience becomes much faster and more focused.</p>
            </section>
          </>
        )}

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-white mb-5">{isKo ? "자주 묻는 질문" : "Frequently Asked Questions"}</h2>
          <div className="space-y-5">
            {(isKo ? [
              { q: "모든 유튜브 영상에서 자막을 가져올 수 있나요?", a: "자막 또는 CC가 활성화된 공개 유튜브 영상이라면 가능합니다. 대부분의 인기 영상은 자동 생성 자막이 있어 대부분의 경우 작동합니다." },
              { q: "자막이 없는 영상도 요약되나요?", a: "아니요. YouSum은 유튜브의 자막 데이터를 기반으로 작동합니다. 자막이 없는 영상은 처리할 수 없습니다." },
              { q: "긴 교육 영상도 요약할 수 있나요?", a: "네. 강의, 팟캐스트, 인터뷰 등 긴 형식의 콘텐츠도 처리됩니다." },
              { q: "YouSum은 무료인가요?", a: "네, 완전 무료입니다. 로그인이나 결제가 필요하지 않습니다." },
            ] : [
              { q: "Can I get a transcript from any YouTube video?", a: "YouSum works with any public YouTube video that has captions or subtitles enabled. Most popular videos have auto-generated captions." },
              { q: "Does YouSum work without captions?", a: "No — YouSum relies on YouTube's caption data. Videos without captions cannot be summarized." },
              { q: "Can I summarize long educational videos?", a: "Yes. YouSum handles long-form content like lectures, full podcasts, and interviews." },
              { q: "Is YouSum free to use?", a: "Yes, completely free. No login required." },
            ]).map(({ q, a }) => (
              <div key={q}>
                <p className="text-white text-sm font-semibold mb-1">{q}</p>
                <p className="text-zinc-500 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">{isKo ? "도구" : "Tools"}</h2>
          <div className="flex flex-wrap gap-3">
            {(isKo ? [
              "유튜브 자막 도구", "AI 영상 요약 도구", "유튜브 타임스탬프 뷰어",
              "유튜브 노트 생성기", "교육 영상 요약", "팟캐스트 영상 요약",
            ] : [
              "YouTube transcript tool", "AI video summary tool", "YouTube timestamps viewer",
              "YouTube notes generator", "Summarize educational videos", "Summarize podcast videos",
            ]).map((label) => (
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
