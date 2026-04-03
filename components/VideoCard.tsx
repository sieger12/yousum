import { VideoMeta } from "@/lib/youtube";

export default function VideoCard({ meta }: { meta: VideoMeta }) {
  return (
    <div className="surface p-5 flex gap-5 items-start rounded-xl">
      <a
        href={`https://youtube.com/watch?v=${meta.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0"
      >
        <img
          src={meta.thumbnail}
          alt={meta.title}
          className="w-36 rounded-lg object-cover"
        />
      </a>
      <div className="min-w-0">
        <h1 className="text-white font-bold text-base leading-snug">{meta.title}</h1>
        <p className="text-zinc-500 text-sm mt-1">{meta.channel}</p>
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-zinc-600">
          <span>▶ {meta.viewCount} views</span>
          <span>♥ {meta.likeCount} likes</span>
          <span>⏱ {meta.duration}</span>
          <span>📅 {meta.publishedAt}</span>
        </div>
        {meta.description && (
          <p className="text-zinc-600 text-xs mt-2 line-clamp-2">{meta.description}</p>
        )}
      </div>
    </div>
  );
}
