import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="text-center mb-10 max-w-2xl">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-rose-500 mb-4">
          Free AI Tool
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          YouTube Video Summary<br />
          <span className="gradient-text">in Seconds</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Paste any YouTube URL and get an AI-powered summary, full transcript, key timestamps, and FAQ — instantly. No login required.
        </p>
      </div>

      <SearchForm />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14 max-w-2xl w-full">
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
  );
}
