"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function extractVideoId(input: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractVideoId(input.trim());
    if (!id) { setError("Please enter a valid YouTube URL or video ID."); return; }
    setError("");
    router.push(`/youtube-summary/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      {/* Hero */}
      <div className="text-center mb-10 max-w-2xl">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-rose-500 mb-4">Free AI Tool</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          YouTube Video Summary<br />
          <span className="gradient-text">in Seconds</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Paste any YouTube URL and get an AI-powered summary, transcript, and key timestamps instantly. No login required.
        </p>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="flex gap-2">
          <div className="surface flex flex-1 items-center px-4 py-3 rounded-xl">
            <input
              type="text"
              value={input}
              onChange={e => { setInput(e.target.value); setError(""); }}
              placeholder="Paste YouTube URL here..."
              className="w-full bg-transparent outline-none text-white placeholder-zinc-600 text-sm"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl font-bold text-white text-sm transition hover:brightness-110 active:scale-95 whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #f43f5e, #f97316)' }}
          >
            Summarize
          </button>
        </div>
        {error && <p className="text-rose-400 text-xs mt-2 pl-1">{error}</p>}
      </form>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14 max-w-2xl w-full">
        {[
          { icon: "✦", title: "AI Summary", desc: "Key points extracted and summarized by GPT in seconds." },
          { icon: "◈", title: "Full Transcript", desc: "Read the complete video transcript with timestamps." },
          { icon: "⊕", title: "Timestamp Notes", desc: "Jump to the most important moments instantly." },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="surface p-5 rounded-xl">
            <span className="text-rose-500 text-lg">{icon}</span>
            <p className="font-semibold text-white mt-2 mb-1">{title}</p>
            <p className="text-zinc-500 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
