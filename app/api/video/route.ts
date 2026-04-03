import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const videoId = req.nextUrl.searchParams.get("id");
  if (!videoId) return NextResponse.json({ error: "Missing video ID" }, { status: 400 });

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "YouTube API key not configured" }, { status: 500 });

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${apiKey}`
  );
  const data = await res.json();

  if (!data.items?.length) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  const item = data.items[0];
  const s = item.snippet;
  const stats = item.statistics;

  // Parse ISO 8601 duration
  const dur = item.contentDetails.duration;
  const match = dur.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const h = parseInt(match?.[1] || "0");
  const m = parseInt(match?.[2] || "0");
  const sec = parseInt(match?.[3] || "0");
  const duration = h > 0 ? `${h}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}` : `${m}:${String(sec).padStart(2,"0")}`;

  return NextResponse.json({
    videoId,
    title: s.title,
    channel: s.channelTitle,
    description: s.description?.slice(0, 500),
    thumbnail: s.thumbnails?.maxres?.url || s.thumbnails?.high?.url || s.thumbnails?.medium?.url,
    publishedAt: s.publishedAt?.slice(0, 10),
    viewCount: parseInt(stats?.viewCount || "0").toLocaleString(),
    likeCount: parseInt(stats?.likeCount || "0").toLocaleString(),
    duration,
  });
}
