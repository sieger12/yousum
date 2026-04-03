import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouSum – Free YouTube Transcript & Video Summary Tool",
  description: "Get a free YouTube transcript and AI video summary in seconds. Generate key takeaways, timestamps, notes, FAQs, and action points from any YouTube video with captions.",
  metadataBase: new URL("https://yousum.io"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "YouSum – Free YouTube Transcript & Video Summary Tool",
    description: "Get a free YouTube transcript and AI video summary in seconds.",
    url: "https://yousum.io",
    siteName: "YouSum",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen flex flex-col bg-[#09090b]">
        {children}
      </body>
    </html>
  );
}
