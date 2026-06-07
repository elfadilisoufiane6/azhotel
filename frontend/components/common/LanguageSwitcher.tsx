"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Check } from "lucide-react";
import { useT, LOCALES, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { locale, setLocale } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const current = LOCALES.find((l) => l.code === locale)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors smallcaps tracking-[0.32em]",
          variant === "dark" ? "text-snow hover:text-brand-200" : "text-ink hover:text-brand-500",
        )}
        aria-label="Change language"
        aria-expanded={open}
      >
        <Image src={current.flag} alt={current.code} width={22} height={16} className="rounded-[2px] shadow-sm" />
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <ul className={cn(
          "absolute right-0 top-full mt-2 min-w-[180px] py-2 shadow-luxe z-50",
          "bg-snow border border-brand-100",
        )}>
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                onClick={() => {
                  setLocale(l.code as Locale);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-pearl transition-colors",
                  locale === l.code ? "text-brand-700 font-medium" : "text-ink/85",
                )}
              >
                <Image src={l.flag} alt={l.code} width={24} height={16} className="rounded-[2px] shadow-sm" />
                <span className="flex-1 text-left">{l.label}</span>
                {locale === l.code && <Check className="size-3.5 text-brand-500" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
