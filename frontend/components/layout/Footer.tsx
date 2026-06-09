"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

export function Footer() {
  const { t } = useT();
  const year = new Date().getFullYear();
  const nav = [
    { href: "/rooms",   label: t.nav.rooms },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/booking", label: t.nav.booking },
  ];

  return (
    <footer className="bg-brand-900 text-snow">
      <div className="container py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* Brand slot — wordmark + tagline placeholder */}
          <div className="lg:col-span-5">
            <span className="block font-display text-xl tracking-[0.05em]" style={{ fontWeight: 600 }}>
              {/* Drop your wordmark / SVG logo here */}
            </span>
          </div>

          <nav className="lg:col-span-3 flex flex-col gap-3">
            <span className="subtitle-light text-xs">{t.footer.explore}</span>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base text-snow/85 hover:text-brand-200 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact slot — fill phone / email / socials when you have them */}
          <div className="lg:col-span-4" />
        </div>

        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-snow/10 text-[10px] md:text-[11px] text-snow/45 smallcaps tracking-[0.28em] md:tracking-[0.32em]">
          <p>© {year}</p>
        </div>
      </div>
    </footer>
  );
}
