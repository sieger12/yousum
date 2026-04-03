import { Metadata } from "next";
import { fetchVideoMeta } from "@/lib/youtube";
import SummaryClient from "./SummaryClient";

type Props = { params: Promise<{ locale: string; videoId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, videoId } = await params;
  const isKo = locale === "ko";
  try {
    const meta = await fetchVideoMeta(videoId);
    return {
      title: isKo
        ? `${meta.title} 자막 & 요약 | YouSum`
        : `${meta.title} Transcript & Summary | YouSum`,
      description: isKo
        ? `"${meta.title}"의 AI 요약, 전체 자막, 타임스탬프, FAQ를 YouSum에서 무료로 확인하세요.`
        : `Read the AI-generated summary, full transcript, key timestamps, and FAQs for "${meta.title}" — free on YouSum.`,
      alternates: {
        canonical: `/${locale}/summary/${videoId}`,
        languages: {
          en: `/en/summary/${videoId}`,
          ko: `/ko/summary/${videoId}`,
        },
      },
      openGraph: {
        title: isKo ? `${meta.title} 자막 & 요약 | YouSum` : `${meta.title} Transcript & Summary | YouSum`,
        images: [meta.thumbnail],
      },
    };
  } catch {
    return {
      title: isKo ? "영상 자막 & 요약 | YouSum" : "Video Transcript & Summary | YouSum",
    };
  }
}

export default async function SummaryPage({ params }: Props) {
  const { locale, videoId } = await params;
  return <SummaryClient videoId={videoId} locale={locale} />;
}
