"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { locales } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  en: "English", ko: "한국어", af: "Afrikaans", ar: "العربية", az: "Azərbaycan",
  bn: "বাংলা", cs: "Čeština", da: "Dansk", de: "Deutsch", el: "Ελληνικά",
  es: "Español", fa: "فارسی", fr: "Français", hi: "हिन्दी", hu: "Magyar",
  id: "Indonesia", it: "Italiano", ja: "日本語", ms: "Melayu", nl: "Nederlands",
  no: "Norsk", pl: "Polski", pt: "Português", ro: "Română", ru: "Русский",
  sk: "Slovenčina", sl: "Slovenščina", sv: "Svenska", sw: "Kiswahili",
  ta: "தமிழ்", te: "తెలుగు", th: "ไทย", tr: "Türkçe", uk: "Українська",
  ur: "اردو", vi: "Tiếng Việt", "zh-CN": "中文(简体)", "zh-TW": "中文(繁體)",
  is: "Íslenska", eu: "Euskara",
};

export default function LocaleSwitcher({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function switchLocale(next: string) {
    // Replace the current locale prefix in the pathname
    const segments = pathname.split("/");
    segments[1] = next;
    window.location.href = segments.join("/");
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition border border-white/10 px-3 py-1.5 rounded-lg hover:border-white/20"
      >
        <span>🌐</span>
        <span className="font-medium">{LABELS[locale] ?? locale.toUpperCase()}</span>
        <span className="text-zinc-600">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 max-h-72 overflow-y-auto rounded-xl border border-white/10 z-50 shadow-xl" style={{ background: "rgba(18,18,20,0.98)" }}>
          {locales.map(l => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`w-full text-left px-4 py-2 text-sm transition hover:bg-white/5 ${l === locale ? "text-rose-400 font-semibold" : "text-zinc-400"}`}
            >
              {LABELS[l] ?? l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
