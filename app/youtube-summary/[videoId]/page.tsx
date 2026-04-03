"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type VideoMeta = {
  videoId: string; title: string; channel: string;
  thumbnail: string; publishedAt: string;
  viewCount: string; likeCount: string; duration: string;
};

type SummaryData = {
  summary: string;
  keyPoints: string[];
  timestamps: { time: string; label: string }[];
  transcript: { text: string; offset: number }[];
};

function formatOffset(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function SummaryPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const [meta, setMeta] = useState<VideoMeta | null>(null);
  const [data, setData] = useState<SummaryData | null>(null);
  const [metaError, setMetaError] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    // Fetch metadata
    fetch(`/api/video?id=${videoId}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) { setMetaError(d.error); setLoadingMeta(false); return; }
        setMeta(d);
        setLoadingMeta(false);
        // Fetch summary after meta is ready
        return fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId, title: d.title }),
        });
      })
      .then(r => r?.json())
      .then(d => {
        if (!d) return;
        if (d.error) { setSummaryError(d.error); setLoadingSummary(false); return; }
        setData(d);
        setLoadingSummary(false);
      })
      .catch(() => { setSummaryError("Something went wrong."); setLoadingSummary(false); });
  }, [videoId]);

  if (loadingMeta) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-zinc-500 text-sm">Fetching video info...</p>
      </div>
    </div>
  );

  if (metaError) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-rose-400 font-semibold">{metaError}</p>
      <a href="/" className="mt-4 inline-block text-sm text-zinc-500 hover:text-white transition">← Try another video</a>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

      {/* Video card */}
      {meta && (
        <div className="surface p-5 flex gap-5 items-start">
          <a href={`https://youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
            <img src={meta.thumbnail} alt={meta.title} className="w-40 rounded-lg object-cover" />
          </a>
          <div className="min-w-0">
            <h1 className="text-white font-bold text-base leading-snug line-clamp-3">{meta.title}</h1>
            <p className="text-zinc-500 text-sm mt-1">{meta.channel}</p>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-zinc-600">
              <span>▶ {meta.viewCount} views</span>
              <span>♥ {meta.likeCount} likes</span>
              <span>⏱ {meta.duration}</span>
              <span>📅 {meta.publishedAt}</span>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {loadingSummary ? (
        <div className="surface p-6 space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
            <span className="text-zinc-500 text-sm">Generating AI summary...</span>
          </div>
          {[80, 60, 72].map(w => (
            <div key={w} className="h-3 rounded bg-white/5 animate-pulse" style={{ width: `${w}%` }} />
          ))}
        </div>
      ) : summaryError ? (
        <div className="surface p-5">
          <p className="text-rose-400 text-sm">{summaryError}</p>
        </div>
      ) : data && (
        <>
          {/* Summary block */}
          <div className="surface p-6">
            <h2 className="text-white font-bold mb-3 flex items-center gap-2">
              <span className="gradient-text">✦</span> Summary
            </h2>
            <p className="text-zinc-400 leading-relaxed text-sm">{data.summary}</p>
          </div>

          {/* Key points */}
          <div className="surface p-6">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="gradient-text">◈</span> Key Points
            </h2>
            <ul className="space-y-2">
              {data.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                  <span className="mt-0.5 w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg,#f43f5e,#f97316)' }}>{i + 1}</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          {/* Timestamps */}
          {data.timestamps.length > 0 && (
            <div className="surface p-6">
              <h2 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="gradient-text">⊕</span> Key Moments
              </h2>
              <div className="space-y-2">
                {data.timestamps.map((ts, i) => (
                  <a
                    key={i}
                    href={`https://youtube.com/watch?v=${videoId}&t=${ts.time.replace(":", "m")}s`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm group hover:bg-white/3 rounded-lg px-2 py-1.5 transition"
                  >
                    <span className="font-mono text-rose-500 text-xs w-12 flex-shrink-0">{ts.time}</span>
                    <span className="text-zinc-400 group-hover:text-white transition">{ts.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Transcript toggle */}
          <div className="surface p-6">
            <button
              onClick={() => setShowTranscript(v => !v)}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-white font-bold text-sm">Full Transcript</span>
              <span className="text-zinc-500 text-xs">{showTranscript ? "Hide ▲" : "Show ▼"}</span>
            </button>
            {showTranscript && (
              <div className="mt-4 max-h-80 overflow-y-auto space-y-1 pr-2">
                {data.transcript.map((item, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <a
                      href={`https://youtube.com/watch?v=${videoId}&t=${item.offset}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-rose-500/70 flex-shrink-0 hover:text-rose-400 transition w-10"
                    >
                      {formatOffset(item.offset)}
                    </a>
                    <span className="text-zinc-500">{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <a href="/" className="inline-block text-xs text-zinc-600 hover:text-white transition">← Summarize another video</a>
    </div>
  );
}
