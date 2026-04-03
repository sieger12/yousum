import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4">

      {/* Hero */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-rose-500 mb-4">
          Free AI Tool
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          Free YouTube Transcript &amp;<br />
          <span className="gradient-text">AI Video Summary Tool</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-10">
          Paste a YouTube URL to get a full transcript, concise AI summary, key timestamps, notes, and FAQs in seconds.
        </p>

        <SearchForm />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14 w-full">
          {[
            { icon: "✦", title: "3-Line Summary", desc: "Get the core message of any video without watching it." },
            { icon: "◈", title: "Key Points + FAQ", desc: "Extracted insights, beginner explanation, and action checklist." },
            { icon: "⊕", title: "Full Transcript", desc: "Read with timestamps — click any line to jump in the video." },
          ].map(({ icon, title, desc }) => (
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
          <h2 className="text-xl font-bold text-white mb-3">What is a YouTube transcript tool?</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            A YouTube transcript tool helps you turn spoken video content into readable text. Instead of replaying a long video, you can scan the transcript, jump to specific timestamps, and find the exact section you need. This is useful for students, researchers, marketers, founders, and anyone who wants faster access to information inside YouTube videos. A good transcript tool should be simple, fast, and accurate, especially for videos with captions enabled.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">How YouSum summarizes YouTube videos</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            YouSum takes a YouTube URL, extracts the available transcript, and turns it into a concise summary with key points, timestamps, and FAQs. This makes long-form videos easier to review and helps users understand the core message without watching every minute. Whether you are learning from a lecture, podcast, interview, or tutorial, YouSum is designed to turn video content into readable notes in seconds.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">When to use a YouTube video summary</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            A YouTube video summary is useful when you want to save time, compare multiple videos quickly, or revisit a long discussion without starting from the beginning. It works well for lectures, TED talks, startup interviews, educational explainers, product reviews, and business podcasts. Instead of manually taking notes, users can get a structured overview, core takeaways, and important moments instantly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Why transcripts and timestamps matter</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Transcripts and timestamps make video content searchable. They help users find exact answers, quote specific moments, and review important sections without scrubbing through the entire video. For educational and research-focused use cases, timestamped transcripts are often more practical than watching the same content repeatedly. With a summary on top, the viewing experience becomes much faster and more focused.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-white mb-5">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: "Can I get a transcript from any YouTube video?", a: "YouSum works with any public YouTube video that has captions or subtitles enabled. Most popular videos have auto-generated captions available." },
              { q: "Does YouSum work without captions?", a: "No — YouSum relies on YouTube's caption data to generate a transcript. Videos without captions cannot be summarized." },
              { q: "Can I summarize long educational videos?", a: "Yes. YouSum handles long-form content like lectures, full podcasts, and interviews. The transcript is trimmed to the most relevant sections for the AI summary." },
              { q: "Is YouSum free to use?", a: "Yes, YouSum is completely free. No login required." },
            ].map(({ q, a }) => (
              <div key={q}>
                <p className="text-white text-sm font-semibold mb-1">{q}</p>
                <p className="text-zinc-500 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Tools</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "YouTube transcript tool", href: "/" },
              { label: "AI video summary tool", href: "/" },
              { label: "YouTube timestamps viewer", href: "/" },
              { label: "YouTube notes generator", href: "/" },
              { label: "Summarize educational videos", href: "/" },
              { label: "Summarize podcast videos", href: "/" },
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
    </div>
  );
}
