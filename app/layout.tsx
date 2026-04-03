import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouSum – Free YouTube Video Summary & Transcript Tool",
  description: "Get instant AI-powered summaries, transcripts, and key timestamps for any YouTube video. Free, fast, no login required.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen flex flex-col bg-[#09090b]">
        <header className="border-b border-white/5 sticky top-0 z-40" style={{ background: 'rgba(9,9,11,0.92)', backdropFilter: 'blur(16px)' }}>
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-extrabold text-lg gradient-text">YouSum</a>
            <nav className="flex items-center gap-5 text-sm text-zinc-500">
              <a href="/" className="hover:text-rose-400 transition">Summarizer</a>
              <a href="/how-it-works" className="hover:text-rose-400 transition">How it works</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/5 py-6 text-center text-xs text-zinc-700">
          © 2026 YouSum · Not affiliated with YouTube or Google.
        </footer>
      </body>
    </html>
  );
}
