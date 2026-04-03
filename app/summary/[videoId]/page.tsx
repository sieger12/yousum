import { Metadata } from "next";
import { fetchVideoMeta } from "@/lib/youtube";
import SummaryClient from "./SummaryClient";

type Props = { params: Promise<{ videoId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { videoId } = await params;
  try {
    const meta = await fetchVideoMeta(videoId);
    return {
      title: `${meta.title} Transcript & Summary | YouSum`,
      description: `Read the AI-generated summary, full transcript, key timestamps, and FAQs for "${meta.title}" — free on YouSum.`,
      alternates: { canonical: `/summary/${videoId}` },
      openGraph: {
        title: `${meta.title} Transcript & Summary | YouSum`,
        description: `AI summary, transcript, and timestamps for "${meta.title}".`,
        images: [meta.thumbnail],
      },
    };
  } catch {
    return {
      title: "Video Transcript & Summary | YouSum",
      description: "AI-generated summary, transcript, and timestamps for YouTube videos.",
    };
  }
}

export default async function SummaryPage({ params }: Props) {
  const { videoId } = await params;
  return <SummaryClient videoId={videoId} />;
}
