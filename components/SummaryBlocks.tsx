"use client";
import { useState } from "react";
import { SummaryResult } from "@/lib/openai";
import { TranscriptItem } from "@/lib/transcript";
import { formatSeconds } from "@/lib/utils";

type Props = {
  data: SummaryResult;
  transcript: TranscriptItem[];
  videoId: string;
};

export default function SummaryBlocks({ data, transcript, videoId }: Props) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className="space-y-5">

      {/* 3-line summary */}
      <div className="surface p-6 rounded-xl">
        <h2 className="text-white font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
          <span className="gradient-text">✦</span> Summary
        </h2>
        <ul className="space-y-2">
          {data.summary.map((s, i) => (
            <li key={i} className="text-zinc-400 text-sm leading-relaxed flex gap-2">
              <span className="text-zinc-600 flex-shrink-0">{i + 1}.</span> {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Key points */}
      <div className="surface p-6 rounded-xl">
        <h2 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
          <span className="gradient-text">◈</span> Key Points
        </h2>
        <ul className="space-y-2">
          {data.keyPoints.map((pt, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
              <span
                className="mt-0.5 w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full text-white text-xs font-bold"
                style={{ background: "linear-gradient(135deg,#f43f5e,#f97316)" }}
              >
                {i + 1}
              </span>
              {pt}
            </li>
          ))}
        </ul>
      </div>

      {/* Beginner explanation */}
      <div className="surface p-6 rounded-xl border-l-2 border-rose-500/40">
        <h2 className="text-white font-bold mb-2 text-sm uppercase tracking-wide">💡 Simple Explanation</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{data.beginnerExplanation}</p>
      </div>

      {/* Action checklist */}
      <div className="surface p-6 rounded-xl">
        <h2 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
          <span className="gradient-text">⊕</span> Action Checklist
        </h2>
        <ul className="space-y-2">
          {data.actionChecklist.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
              <span className="text-rose-500 mt-0.5">☐</span> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Timestamps */}
      {data.timestamps.length > 0 && (
        <div className="surface p-6 rounded-xl">
          <h2 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">🕐 Key Moments</h2>
          <div className="space-y-1">
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

      {/* FAQ */}
      <div className="surface p-6 rounded-xl">
        <h2 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">❓ FAQ</h2>
        <div className="space-y-4">
          {data.faq.map((item, i) => (
            <div key={i}>
              <p className="text-white text-sm font-semibold mb-1">{item.q}</p>
              <p className="text-zinc-500 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transcript */}
      <div className="surface p-6 rounded-xl">
        <button
          onClick={() => setShowTranscript(v => !v)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-white font-bold text-sm uppercase tracking-wide">📄 Full Transcript</span>
          <span className="text-zinc-500 text-xs">{showTranscript ? "Hide ▲" : "Show ▼"}</span>
        </button>
        {showTranscript && (
          <div className="mt-4 max-h-80 overflow-y-auto space-y-1 pr-2">
            {transcript.map((item, i) => (
              <div key={i} className="flex gap-3 text-xs">
                <a
                  href={`https://youtube.com/watch?v=${videoId}&t=${item.offset}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-rose-500/60 flex-shrink-0 hover:text-rose-400 transition w-10"
                >
                  {formatSeconds(item.offset)}
                </a>
                <span className="text-zinc-600">{item.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
