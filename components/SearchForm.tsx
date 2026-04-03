"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { extractVideoId } from "@/lib/utils";

const EXAMPLES = [
  { label: "TED Talk", url: "https://www.youtube.com/watch?v=arj7oStGLkU" },
  { label: "Y Combinator", url: "https://www.youtube.com/watch?v=0lJKucu6HJc" },
];

export default function SearchForm() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = (value: string) => {
    const id = extractVideoId(value.trim());
    if (!id) { setError("Please enter a valid YouTube URL or video ID."); return; }
    setError("");
    router.push(`/summary/${id}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={e => { e.preventDefault(); submit(input); }}>
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
            style={{ background: "linear-gradient(135deg, #f43f5e, #f97316)" }}
          >
            Summarize
          </button>
        </div>
        {error && <p className="text-rose-400 text-xs mt-2 pl-1">{error}</p>}
      </form>

      <div className="flex items-center gap-3 mt-3 pl-1">
        <span className="text-zinc-600 text-xs">Try:</span>
        {EXAMPLES.map(ex => (
          <button
            key={ex.label}
            onClick={() => submit(ex.url)}
            className="text-xs text-zinc-500 hover:text-rose-400 transition underline underline-offset-2"
          >
            {ex.label}
          </button>
        ))}
      </div>
      <p className="text-zinc-700 text-xs mt-2 pl-1">Works best with videos that have captions enabled.</p>
    </div>
  );
}
