import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("howTitle"),
    description: t("howDesc"),
    alternates: {
      canonical: `/${locale}/how-it-works`,
      languages: { en: "/en/how-it-works", ko: "/ko/how-it-works" },
    },
  };
}

export default async function HowItWorks({ params }: Props) {
  const { locale } = await params;
  const isKo = locale === "ko";

  const steps = isKo ? [
    {
      title: "Step 1 – 유튜브 URL 붙여넣기",
      body: "유튜브 링크만 입력하면 됩니다. 별도의 설치나 소프트웨어가 필요하지 않습니다. YouSum은 브라우저에서 바로 작동합니다. 자막이 있는 공개 유튜브 영상이라면 짧은 클립부터 긴 강의까지 모두 지원됩니다. 자막 없이는 처리가 불가능하지만, 대부분의 인기 영상은 자동 생성 자막을 제공합니다.",
    },
    {
      title: "Step 2 – 자막 추출",
      body: "URL을 제출하면 YouSum이 유튜브 자막 데이터에서 전체 스크립트를 가져옵니다. 이를 통해 영상에서 말한 모든 내용을 검색 가능한 텍스트로 변환합니다. 긴 영상을 다시 볼 필요 없이 자막을 훑어보고, 타임스탬프를 확인하고, 원하는 부분으로 바로 이동할 수 있습니다.",
    },
    {
      title: "Step 3 – AI 영상 요약 생성",
      body: "YouSum이 전체 자막을 AI 모델에 전달하여 구조화된 요약을 생성합니다. 3줄 개요, 핵심 포인트, 주요 타임스탬프, 실행 체크리스트, 초보자 설명, FAQ가 포함됩니다. 강의 복습, 주제 리서치, 긴 인터뷰 검토 등 어떤 목적이든 원본 영상을 끝까지 보는 것보다 훨씬 빠르게 필요한 내용을 얻을 수 있습니다.",
    },
  ] : [
    {
      title: "Step 1 – Paste a YouTube URL",
      body: "Just paste a YouTube link. You do not need to download anything or install extra software. YouSum works directly in your browser — copy a URL from any public YouTube video and paste it into the search box. Short videos, long lectures, interviews, and full podcasts are all supported. The only requirement is that the video has captions or subtitles available. Most popular videos have auto-generated captions.",
    },
    {
      title: "Step 2 – Extract the Transcript",
      body: "Once you submit a URL, YouSum fetches the full transcript from YouTube's caption data. This produces a searchable, readable text version of everything said in the video. Instead of scrubbing through a long video to find the section you need, you can scan the transcript, spot timestamps, and jump directly to the relevant moment. Transcripts are especially useful when reviewing lectures, business talks, technical tutorials, or any content where you need to find specific information quickly.",
    },
    {
      title: "Step 3 – Generate an AI Video Summary",
      body: "YouSum sends the transcript to an AI model that produces a structured summary including a 3-sentence overview, key takeaways, important timestamps, an action checklist, a beginner-friendly explanation, and FAQs. The AI summary gives you everything important from the video in a format that is faster to read than watching the original. Whether you are catching up on a missed lecture, researching a topic, or reviewing a long interview, the AI output saves significant time.",
    },
  ];

  const features = isKo ? [
    { title: "전체 자막", desc: "타임스탬프가 포함된 완전한 텍스트 버전. 다시 보지 않고도 원하는 순간을 찾을 수 있습니다." },
    { title: "AI 요약", desc: "영상의 핵심 메시지를 3문장으로 요약. 볼 가치가 있는지 빠르게 판단할 수 있습니다." },
    { title: "핵심 포인트", desc: "영상에서 가장 중요한 5~7개 포인트를 명확하게 정리합니다." },
    { title: "타임스탬프", desc: "주요 순간을 레이블과 링크로 제공. 클릭하면 유튜브의 해당 구간으로 바로 이동합니다." },
    { title: "FAQ & 노트", desc: "영상 내용 기반 3개의 Q&A, 실행 체크리스트, 초보자 설명." },
  ] : [
    { title: "Full transcript", desc: "A complete, readable text version with clickable timestamps. Find any moment without rewatching." },
    { title: "Concise AI summary", desc: "A 3-sentence overview of the video's core message. Useful for quickly deciding whether to watch in full." },
    { title: "Key takeaways", desc: "Five to seven of the most important points from the video, extracted and listed clearly." },
    { title: "Important timestamps", desc: "The key moments labeled and linked. Click any timestamp to jump directly to that section on YouTube." },
    { title: "FAQs and notes", desc: "Three question-and-answer pairs, plus an action checklist and a beginner-friendly explanation." },
  ];

  const targets = isKo ? [
    { role: "학생", desc: "강의 요약, 시험 전 핵심 복습, 긴 교육 영상에서 특정 주제 찾기." },
    { role: "연구자", desc: "여러 영상을 빠르게 비교하고, 인용문 추출, 자막에서 관련 정보 탐색." },
    { role: "마케터", desc: "경쟁사 콘텐츠 검토, 업계 강연 분석, 영상 인사이트를 텍스트 노트로 전환." },
    { role: "창업자", desc: "스타트업 인터뷰, 투자자 강연, 컨퍼런스 세션을 빠르게 파악." },
    { role: "크리에이터", desc: "유튜브 콘텐츠를 텍스트 포맷으로 재활용하고 긴 영상의 핵심 장면 추출." },
    { role: "바쁜 시청자", desc: "볼 가치 있는 영상 판단, 중요한 부분으로 건너뛰기, 핵심 1분 안에 파악." },
  ] : [
    { role: "Students", desc: "Summarize lectures, review key points before exams, and find specific topics inside long educational videos." },
    { role: "Researchers", desc: "Compare multiple videos quickly, extract quotes, and scan transcripts for relevant information." },
    { role: "Marketers", desc: "Review competitor content, analyze industry talks, and turn video insights into written notes." },
    { role: "Founders", desc: "Catch up on startup interviews, investor talks, and conference sessions without watching every minute." },
    { role: "Creators", desc: "Repurpose YouTube content into written formats and pull key moments from long-form videos." },
    { role: "Busy viewers", desc: "Decide what's worth watching, skip to the parts that matter, and get the main idea fast." },
  ];

  const faqs = isKo ? [
    { q: "모든 유튜브 영상에서 자막을 가져올 수 있나요?", a: "자막 또는 CC가 활성화된 공개 유튜브 영상이라면 가능합니다. 대부분의 인기 영상은 자동 생성 자막이 있습니다." },
    { q: "자막이 없는 영상도 요약되나요?", a: "아니요. YouSum은 유튜브의 자막 데이터를 기반으로 작동합니다. 자막이 없는 영상은 처리할 수 없습니다." },
    { q: "AI 요약은 얼마나 정확한가요?", a: "요약은 자막을 기반으로 생성되므로, 자막 품질에 따라 정확도가 달라집니다. 깔끔한 자막이 있는 영상은 매우 정확합니다." },
    { q: "긴 교육 영상도 요약할 수 있나요?", a: "네. 강의, 팟캐스트, 인터뷰 등 긴 형식의 콘텐츠도 처리됩니다." },
    { q: "YouSum은 무료인가요?", a: "네, 완전 무료입니다. 로그인이나 결제가 필요하지 않습니다." },
    { q: "어떤 영상이 YouSum에 가장 잘 맞나요?", a: "교육 영상, 강의, 인터뷰, TED 강연, 비즈니스 팟캐스트, 제품 리뷰, 튜토리얼이 가장 적합합니다." },
  ] : [
    { q: "Can I get a transcript from any YouTube video?", a: "YouSum works with any public YouTube video that has captions or subtitles enabled. Most popular videos have auto-generated captions." },
    { q: "Does YouSum work without captions?", a: "No. YouSum relies on YouTube's caption data. Videos without captions cannot be processed." },
    { q: "How accurate is the AI summary?", a: "Accuracy depends on caption quality. For videos with clean captions, the summary is highly accurate. Auto-generated captions on fast speech may produce minor errors." },
    { q: "Can I summarize long YouTube videos?", a: "Yes. YouSum handles long-form content including full lectures, podcasts, and interviews." },
    { q: "Is YouSum free to use?", a: "Yes. Completely free. No account, login, or payment required." },
    { q: "What kind of videos work best with YouSum?", a: "Educational videos, lectures, interviews, TED talks, business podcasts, product reviews, and tutorials work best." },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-14">

      {/* H1 + hero */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          {isKo ? "YouSum 사용 방법" : "How YouSum Works"}
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed mb-6">
          {isKo
            ? "YouSum은 긴 영상을 짧고 읽기 쉬운 인사이트로 변환하는 유튜브 자막 & AI 영상 요약 도구입니다. 유튜브 링크를 붙여넣으면 자막, 핵심 포인트, 타임스탬프, 노트, FAQ를 몇 초 만에 받아볼 수 있습니다."
            : "YouSum is a YouTube transcript and AI video summary tool that helps you turn long videos into short, readable insights. Paste a YouTube link to get a transcript, key takeaways, timestamps, notes, and FAQs in seconds."}
        </p>
        <a
          href={`/${locale}`}
          className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white transition hover:brightness-110"
          style={{ background: "linear-gradient(135deg,#f43f5e,#f97316)" }}
        >
          {isKo ? "지금 사용해보기 →" : "Try YouSum Now →"}
        </a>
      </div>

      {/* Steps */}
      <section className="space-y-10">
        {steps.map(({ title, body }) => (
          <div key={title}>
            <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
            <p className="text-zinc-500 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </section>

      {/* What you get */}
      <section>
        <h2 className="text-xl font-bold text-white mb-5">
          {isKo ? "YouSum에서 얻을 수 있는 것" : "What You Get from YouSum"}
        </h2>
        <div className="space-y-4">
          {features.map(({ title, desc }) => (
            <div key={title} className="surface p-5 rounded-xl">
              <p className="text-white font-semibold text-sm mb-1">{title}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why use */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">
          {isKo ? "유튜브 자막 & 요약 도구를 왜 사용해야 할까요?" : "Why Use a YouTube Transcript and Summary Tool?"}
        </h2>
        <p className="text-zinc-500 text-sm leading-relaxed">
          {isKo
            ? "대부분의 유튜브 영상은 실제로 필요한 것보다 깁니다. 30분짜리 강의에 진짜 유용한 내용은 5분뿐일 수 있고, 45분짜리 인터뷰에서 원하는 답변은 단 하나일 수도 있습니다. 매번 전체 영상을 보는 건 비효율적입니다. 자막과 요약 도구를 사용하면 다운로드나 수동 노트 없이 몇 초 만에 필요한 정보를 추출할 수 있습니다. YouSum은 강의를 복습하는 학생, 여러 소스를 비교하는 연구자, 경쟁사 콘텐츠를 분석하는 마케터, 영상을 텍스트로 재활용하는 크리에이터, 핵심만 빨리 파악하고 싶은 바쁜 시청자를 위해 설계되었습니다."
            : "Most YouTube videos are longer than they need to be. A 30-minute lecture might contain five minutes of genuinely useful content. A 45-minute interview might have one answer you actually need. Watching the full video every time is inefficient, especially when you are doing research, studying, or trying to get through a long list of content. A transcript and summary tool lets you extract the relevant information in seconds, without downloading anything or taking manual notes."}
        </p>
      </section>

      {/* Who is it for */}
      <section>
        <h2 className="text-xl font-bold text-white mb-5">
          {isKo ? "YouSum은 누구를 위한 도구인가요?" : "Who Is YouSum For?"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {targets.map(({ role, desc }) => (
            <div key={role} className="surface p-4 rounded-xl">
              <p className="text-white font-semibold text-sm mb-1">{role}</p>
              <p className="text-zinc-600 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-bold text-white mb-5">
          {isKo ? "자주 묻는 질문" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-5">
          {faqs.map(({ q, a }) => (
            <div key={q}>
              <p className="text-white text-sm font-semibold mb-1">{q}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="surface p-8 rounded-xl text-center">
        <p className="text-white font-bold text-lg mb-2">
          {isKo ? "지금 바로 시작하세요" : "Ready to try it?"}
        </p>
        <p className="text-zinc-500 text-sm mb-5">
          {isKo ? "유튜브 링크를 붙여넣으면 자막과 요약을 몇 초 만에 받아볼 수 있습니다." : "Paste a YouTube link and get your transcript and summary in seconds."}
        </p>
        <a
          href={`/${locale}`}
          className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white transition hover:brightness-110"
          style={{ background: "linear-gradient(135deg,#f43f5e,#f97316)" }}
        >
          {isKo ? "지금 영상 요약하기 →" : "Start summarizing videos in seconds →"}
        </a>
      </div>

      {/* Internal links */}
      <section>
        <h2 className="text-base font-bold text-white mb-3">{isKo ? "관련 도구" : "Related"}</h2>
        <div className="flex flex-wrap gap-3">
          {(isKo ? [
            { label: "홈", href: `/${locale}` },
            { label: "유튜브 자막 도구", href: `/${locale}` },
            { label: "AI 영상 요약 도구", href: `/${locale}` },
            { label: "유튜브 타임스탬프 뷰어", href: `/${locale}` },
            { label: "영상 노트 도구", href: `/${locale}` },
          ] : [
            { label: "Home", href: `/${locale}` },
            { label: "YouTube Transcript Tool", href: `/${locale}` },
            { label: "AI Video Summary Tool", href: `/${locale}` },
            { label: "YouTube Timestamps Viewer", href: `/${locale}` },
            { label: "Video Notes Tool", href: `/${locale}` },
          ]).map(({ label, href }) => (
            <a key={label} href={href} className="text-xs text-zinc-500 hover:text-rose-400 transition border border-white/10 px-3 py-1.5 rounded-lg hover:border-rose-500/30">
              {label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
