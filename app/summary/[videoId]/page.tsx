"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import VideoCard from "@/components/VideoCard";
import SummaryBlocks from "@/components/SummaryBlocks";
import { VideoMeta } from "@/lib/youtube";
import { SummaryResult } from "@/lib/openai";
import { TranscriptItem } from "@/lib/transcript";

type SummaryData = SummaryResult & { transcript: TranscriptItem[] };

function Spinner({ label }: { label: string }) {
  return (
    <div className="surface p-8 rounded-xl flex flex-col items-center gap-3">
      <div className="w-7 h-7 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
      <p className="text-zinc-500 text-sm">{label}</p>
    </div>
  );
}

export default function SummaryPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const [meta, setMeta] = useState<VideoMeta | null>(null);
  const [data, setData] = useState<SummaryData | null>(null);
  const [metaErr, setMetaErr] = useState("");
  const [summaryErr, setSummaryErr] = useState("");
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    fetch(`/api/video?id=${videoId}`)
      .then(r => r.json())
      .then(async d => {
        if (d.error) { setMetaErr(d.error); setLoadingMeta(false); setLoadingSummary(false); return; }
        setMeta(d);
        setLoadingMeta(false);

        const res = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId, title: d.title }),
        });
        const s = await res.json();
        if (s.error) { setSummaryErr(s.error); } else { setData(s); }
        setLoadingSummary(false);
      })
      .catch(() => { setMetaErr("Failed to load video."); setLoadingMeta(false); setLoadingSummary(false); });
  }, [videoId]);

  if (loadingMeta) return <div className="max-w-3xl mx-auto px-4 py-12"><Spinner label="Fetching video info..." /></div>;

  if (metaErr) return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <p className="text-rose-400 font-semibold mb-4">{metaErr}</p>
      <a href="/" className="text-sm text-zinc-500 hover:text-white transition">← Try another video</a>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-5">
      {meta && <VideoCard meta={meta} />}

      {loadingSummary ? (
        <Spinner label="Generating AI summary... this may take a few seconds" />
      ) : summaryErr ? (
        <div className="surface p-6 rounded-xl">
          <p className="text-rose-400 text-sm font-semibold mb-1">Could not generate summary</p>
          <p className="text-zinc-500 text-sm">{summaryErr}</p>
          {summaryErr.includes("Transcript") && (
            <p className="text-zinc-600 text-xs mt-2">Try a video with captions/subtitles enabled.</p>
          )}
        </div>
      ) : data && (
        <SummaryBlocks data={data} transcript={data.transcript} videoId={videoId} />
      )}

      <a href="/" className="inline-block text-xs text-zinc-600 hover:text-white transition pt-2">
        ← Summarize another video
      </a>
    </div>
  );
}
