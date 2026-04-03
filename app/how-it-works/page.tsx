import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How YouSum Works | YouTube Transcript & AI Video Summary Tool",
  description: "Learn how YouSum turns YouTube videos into transcripts, AI summaries, key points, timestamps, and FAQs in seconds. Fast, simple, and free to try.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How YouSum Works | YouTube Transcript & AI Video Summary Tool",
    description: "Learn how YouSum turns YouTube videos into transcripts, AI summaries, key points, timestamps, and FAQs in seconds.",
  },
};

export default function HowItWorks() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-14">

      {/* H1 + hero */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          How YouSum Works
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed mb-6">
          YouSum is a YouTube transcript and AI video summary tool that helps you turn long videos into short, readable insights. Paste a YouTube link to get a transcript, key takeaways, timestamps, notes, and FAQs in seconds.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white transition hover:brightness-110"
          style={{ background: "linear-gradient(135deg,#f43f5e,#f97316)" }}
        >
          Try YouSum Now →
        </a>
      </div>

      {/* Steps */}
      <section className="space-y-10">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Step 1 – Paste a YouTube URL</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Just paste a YouTube link. You do not need to download anything or install extra software. YouSum works directly in your browser — copy a URL from any public YouTube video and paste it into the search box on the home page. Short videos, long lectures, interviews, and full podcasts are all supported. The only requirement is that the video has captions or subtitles available. Most popular videos have auto-generated captions, so this works for the vast majority of content on YouTube.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Step 2 – Extract the Transcript</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Once you submit a URL, YouSum fetches the full transcript from YouTube's caption data. This produces a searchable, readable text version of everything said in the video. Instead of scrubbing through a long video to find the section you need, you can scan the transcript, spot timestamps, and jump directly to the relevant moment. Transcripts are especially useful when reviewing lectures, business talks, technical tutorials, or any content where you need to find and quote specific information quickly.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Step 3 – Generate an AI Video Summary</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            YouSum sends the transcript to an AI model that reads the full content and produces a structured summary. This includes a concise 3-sentence overview, key takeaways, important timestamps, an action checklist, a beginner-friendly explanation, and a set of FAQs based on the video. The AI summary is designed to give you everything important from the video in a format that is faster to read than watching the original. Whether you are catching up on a missed lecture, researching a topic, or reviewing a long interview, the AI output saves significant time.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section>
        <h2 className="text-xl font-bold text-white mb-5">What You Get from YouSum</h2>
        <div className="space-y-4">
          {[
            { title: "Full transcript", desc: "A complete, readable text version of the video with clickable timestamps. Find any moment in the video without rewatching." },
            { title: "Concise AI summary", desc: "A 3-sentence overview of the video's core message. Useful for quickly deciding whether the full video is worth watching." },
            { title: "Key takeaways", desc: "Five to seven of the most important points from the video, extracted and listed clearly so you can review the content at a glance." },
            { title: "Important timestamps", desc: "The key moments in the video, labeled and linked. Click any timestamp to jump directly to that section on YouTube." },
            { title: "FAQs and notes", desc: "Three question-and-answer pairs based on the video content, plus an action checklist and a beginner-friendly explanation of the topic." },
          ].map(({ title, desc }) => (
            <div key={title} className="surface p-5 rounded-xl">
              <p className="text-white font-semibold text-sm mb-1">{title}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why use */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Why Use a YouTube Transcript and Summary Tool?</h2>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Most YouTube videos are longer than they need to be. A 30-minute lecture might contain five minutes of genuinely useful content. A 45-minute interview might have one answer you actually need. Watching the full video every time is inefficient, especially when you are doing research, studying for an exam, or trying to get through a long list of content. A transcript and summary tool lets you extract the relevant information in seconds, without downloading anything or taking manual notes. YouSum is designed for students who need to review lectures, researchers who compare multiple sources, marketers who analyze competitor content, creators who repurpose video into written formats, and busy viewers who want the key points without the full runtime.
        </p>
      </section>

      {/* Who is it for */}
      <section>
        <h2 className="text-xl font-bold text-white mb-5">Who Is YouSum For?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { role: "Students", desc: "Summarize lectures, review key points before exams, and find specific topics inside long educational videos." },
            { role: "Researchers", desc: "Compare multiple videos quickly, extract quotes, and scan transcripts for relevant information without watching everything." },
            { role: "Marketers", desc: "Review competitor content, analyze industry talks, and turn video insights into written notes faster." },
            { role: "Founders", desc: "Catch up on startup interviews, investor talks, and conference sessions without watching every minute." },
            { role: "Creators", desc: "Repurpose YouTube content into written formats, pull key moments, and build summaries from long-form videos." },
            { role: "Busy viewers", desc: "Decide what's worth watching, skip to the parts that matter, and get the main idea in under a minute." },
          ].map(({ role, desc }) => (
            <div key={role} className="surface p-4 rounded-xl">
              <p className="text-white font-semibold text-sm mb-1">{role}</p>
              <p className="text-zinc-600 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-bold text-white mb-5">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {[
            {
              q: "Can I get a transcript from any YouTube video?",
              a: "YouSum works with any public YouTube video that has captions or subtitles enabled. Most popular videos have auto-generated captions, so this covers the majority of content on the platform.",
            },
            {
              q: "Does YouSum work without captions?",
              a: "No. YouSum relies on YouTube's caption data to generate a transcript. Videos without captions or subtitles cannot be processed. If a video does not have captions, YouSum will let you know.",
            },
            {
              q: "How accurate is the AI summary?",
              a: "The summary is generated from the transcript, so accuracy depends on caption quality. For videos with clean captions, the summary is highly accurate. Auto-generated captions on fast or accented speech may produce minor errors.",
            },
            {
              q: "Can I summarize long YouTube videos?",
              a: "Yes. YouSum handles long-form content including full lectures, podcasts, and interviews. The transcript is processed up to a set character limit, covering most typical video lengths.",
            },
            {
              q: "Is YouSum free to use?",
              a: "Yes. YouSum is completely free. No account, login, or payment required.",
            },
            {
              q: "What kind of videos work best with YouSum?",
              a: "Educational videos, lectures, interviews, TED talks, business podcasts, product reviews, and tutorials work best. Any video where the spoken content is the main value is a good fit for YouSum.",
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <p className="text-white text-sm font-semibold mb-1">{q}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="surface p-8 rounded-xl text-center">
        <p className="text-white font-bold text-lg mb-2">Ready to try it?</p>
        <p className="text-zinc-500 text-sm mb-5">Paste a YouTube link and get your transcript and summary in seconds.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white transition hover:brightness-110"
          style={{ background: "linear-gradient(135deg,#f43f5e,#f97316)" }}
        >
          Start summarizing videos in seconds →
        </a>
      </div>

      {/* Internal links */}
      <section>
        <h2 className="text-base font-bold text-white mb-3">Related</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Home", href: "/" },
            { label: "YouTube Transcript Tool", href: "/" },
            { label: "AI Video Summary Tool", href: "/" },
            { label: "YouTube Timestamps Viewer", href: "/" },
            { label: "Video Notes Tool", href: "/" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-xs text-zinc-500 hover:text-rose-400 transition border border-white/10 px-3 py-1.5 rounded-lg hover:border-rose-500/30"
            >
              {label}
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
