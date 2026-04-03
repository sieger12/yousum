import { NextRequest, NextResponse } from "next/server";
import { fetchVideoMeta } from "@/lib/youtube";

export async function GET(req: NextRequest) {
  const videoId = req.nextUrl.searchParams.get("id");
  if (!videoId) return NextResponse.json({ error: "Missing video ID" }, { status: 400 });

  try {
    const meta = await fetchVideoMeta(videoId);
    return NextResponse.json(meta);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to fetch video";
    return NextResponse.json({ error: msg }, { status: 404 });
  }
}
