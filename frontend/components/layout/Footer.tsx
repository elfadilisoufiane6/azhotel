"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";
import { site } from "@/lib/site";
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
          <div className="lg:col-span-5">
            <Image src="/brand/logo.svg" alt={site.name} width={220} height={64} className="h-10 md:h-12 w-auto brightness-0 invert" />
            <p className="mt-5 md:mt-6 text-snow/65 text-sm max-w-sm leading-relaxed">{t.footer.description}</p>

            <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
              <span className="subtitle-light text-xs">{t.common.weSpeak}</span>
              {site.languages.map((l) => (
                <Image key={l.code} src={l.flag} alt={l.code} width={24} height={16} className="rounded-[2px] shadow-sm" />
              ))}
            </div>
          </div>

          <nav className="lg:col-span-3 flex flex-col gap-3">
            <span className="subtitle-light text-xs">{t.footer.explore}</span>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-base text-snow/85 hover:text-brand-200 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="lg:col-span-4">
            <span className="subtitle-light text-xs">{t.footer.reception}</span>
            <a href={`tel:${site.phoneTel}`} className="mt-3 flex items-center gap-3 font-display text-xl md:text-2xl text-snow hover:text-brand-200 transition-colors break-all" style={{ fontWeight: 700 }}>
              <Phone className="size-5 text-brand-200 shrink-0" />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="mt-2 flex items-center gap-3 text-sm text-snow/75 hover:text-brand-200 transition-colors break-all">
              <Mail className="size-4 text-brand-200 shrink-0" />
              {site.email}
            </a>

            <div className="mt-6 flex gap-3">
              <a aria-label="Instagram" href={site.social.instagram} className="size-10 border border-snow/20 hover:border-brand-200 hover:text-brand-200 flex items-center justify-center transition-colors">
                <Instagram className="size-4" />
              </a>
              <a aria-label="Facebook" href={site.social.facebook} className="size-10 border border-snow/20 hover:border-brand-200 hover:text-brand-200 flex items-center justify-center transition-colors">
                <Facebook className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-snow/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-3 text-[10px] md:text-[11px] text-snow/45 smallcaps tracking-[0.28em] md:tracking-[0.32em]">
          <p>© {year} {site.name}</p>
          <p>{site.address.street} · {site.address.city} · Morocco</p>
        </div>
      </div>
    </footer>
  );
}
