export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Paste a YouTube URL",
      desc: "Copy any YouTube video link and paste it into the search box on the home page. Works with any public video that has captions enabled.",
    },
    {
      step: "02",
      title: "We fetch the transcript",
      desc: "YouSum retrieves the full transcript from YouTube's caption data — no audio processing required. This means results are near-instant.",
    },
    {
      step: "03",
      title: "AI analyzes the content",
      desc: "Our AI reads the entire transcript and extracts a 3-line summary, key points, beginner explanation, action checklist, key timestamps, and FAQ.",
    },
    {
      step: "04",
      title: "Read, not watch",
      desc: "Get everything you need from the video in under 10 seconds. Click any timestamp to jump straight to that moment in the video.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-rose-500 mb-4">
          How it works
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
          From URL to summary{" "}
          <span className="gradient-text">in seconds</span>
        </h1>
        <p className="text-zinc-400 text-base">
          YouSum uses YouTube captions + AI to summarize any video instantly — no login, no waiting.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map(({ step, title, desc }) => (
          <div key={step} className="surface p-6 rounded-xl flex gap-5">
            <span className="gradient-text text-2xl font-extrabold flex-shrink-0 leading-none mt-0.5">
              {step}
            </span>
            <div>
              <p className="text-white font-semibold mb-1">{title}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white transition"
          style={{ background: "linear-gradient(135deg,#f43f5e,#f97316)" }}
        >
          Try it now →
        </a>
      </div>
    </div>
  );
}
