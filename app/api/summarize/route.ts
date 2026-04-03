import { NextRequest, NextResponse } from "next/server";
import { fetchTranscript, transcriptToText } from "@/lib/transcript";
import { generateSummary } from "@/lib/openai";

export async function POST(req: NextRequest) {
  const { videoId, title } = await req.json();
  if (!videoId) return NextResponse.json({ error: "Missing videoId" }, { status: 400 });

  // 1. Fetch transcript
  let transcriptItems;
  try {
    transcriptItems = await fetchTranscript(videoId);
  } catch {
    return NextResponse.json({ error: "Transcript not available for this video. Captions may be disabled." }, { status: 422 });
  }

  const transcriptText = transcriptToText(transcriptItems);

  // 2. Generate AI summary
  try {
    const result = await generateSummary(title, transcriptText);
    return NextResponse.json({ ...result, transcript: transcriptItems.slice(0, 200) });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "AI summary failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
