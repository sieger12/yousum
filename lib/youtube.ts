import { parseIsoDuration } from "./utils";

export type VideoMeta = {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  duration: string;
  description: string;
};

export async function fetchVideoMeta(videoId: string): Promise<VideoMeta> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error("YOUTUBE_API_KEY not configured");

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${key}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  const data = await res.json();

  if (!data.items?.length) throw new Error("Video not found or unavailable");

  const item = data.items[0];
  const s = item.snippet;
  const stats = item.statistics;

  return {
    videoId,
    title: s.title,
    channel: s.channelTitle,
    thumbnail:
      s.thumbnails?.maxres?.url ||
      s.thumbnails?.high?.url ||
      s.thumbnails?.medium?.url,
    publishedAt: s.publishedAt?.slice(0, 10),
    viewCount: parseInt(stats?.viewCount || "0").toLocaleString(),
    likeCount: parseInt(stats?.likeCount || "0").toLocaleString(),
    duration: parseIsoDuration(item.contentDetails.duration),
    description: s.description?.slice(0, 400) || "",
  };
}
