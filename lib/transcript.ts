import { YoutubeTranscript } from "youtube-transcript";

export type TranscriptItem = { text: string; offset: number };

export async function fetchTranscript(videoId: string): Promise<TranscriptItem[]> {
  const raw = await YoutubeTranscript.fetchTranscript(videoId);
  return raw.map(r => ({ text: r.text, offset: Math.floor(r.offset / 1000) }));
}

export function transcriptToText(items: TranscriptItem[], maxChars = 12000): string {
  return items.map(i => i.text).join(" ").slice(0, maxChars);
}
