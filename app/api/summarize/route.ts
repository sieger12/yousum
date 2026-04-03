import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SummarySchema = z.object({
  summary: z.string().describe("3-5 sentence summary of the video"),
  keyPoints: z.array(z.string()).describe("5-7 key takeaways as bullet points"),
  timestamps: z.array(
    z.object({
      time: z.string().describe("Timestamp in MM:SS format"),
      label: z.string().describe("Short description of this moment"),
    })
  ).describe("4-6 important moments from the video"),
});

export async function POST(req: NextRequest) {
  const { videoId, title } = await req.json();
  if (!videoId) return NextResponse.json({ error: "Missing videoId" }, { status: 400 });

  // 1. Fetch transcript
  let transcriptItems: { text: string; offset: number }[] = [];
  let transcriptText = "";
  try {
    const raw = await YoutubeTranscript.fetchTranscript(videoId);
    transcriptItems = raw.map(r => ({ text: r.text, offset: Math.floor(r.offset / 1000) }));
    transcriptText = raw.map(r => r.text).join(" ").slice(0, 12000);
  } catch {
    return NextResponse.json({ error: "Transcript not available for this video." }, { status: 422 });
  }

  // 2. Generate structured summary with AI SDK
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: SummarySchema,
    prompt: `Summarize this YouTube video titled "${title}".\n\nTranscript:\n${transcriptText}`,
  });

  return NextResponse.json({
    summary: object.summary,
    keyPoints: object.keyPoints,
    timestamps: object.timestamps,
    transcript: transcriptItems.slice(0, 200),
  });
}
