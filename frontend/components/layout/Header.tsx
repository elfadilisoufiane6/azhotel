"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, Instagram, MapPin, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

export function Header() {
  const path = usePathname();
  const isHome = path === "/";
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nav = [
    { href: "/rooms",   label: t.nav.rooms,   active: path.startsWith("/rooms") },
    { href: "/gallery", label: t.nav.gallery, active: path.startsWith("/gallery") },
    { href: "/booking", label: t.nav.booking, active: path.startsWith("/booking") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        transparent ? "bg-transparent" : "bg-snow/85 backdrop-blur-xl border-b border-brand-100/80 shadow-sm",
      )}
    >
      {/* Utility strip — phone + flags, fades on scroll */}
      <div
        className={cn(
          "border-b border-snow/15 text-snow text-xs transition-all duration-500 overflow-hidden smallcaps tracking-[0.32em]",
          transparent ? "max-h-10 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container h-10 flex items-center justify-between">
          <a href={`tel:${site.phoneTel}`} className="flex items-center gap-2 hover:text-brand-200 transition-colors">
            <Phone className="size-3" />
            {site.phone}
          </a>
          <div className="hidden sm:flex items-center gap-2 text-snow/70">
            <span>{t.common.weSpeak}</span>
            {site.languages.map((l) => (
              <Image key={l.code} src={l.flag} alt={l.code} width={20} height={14} className="rounded-[2px] shadow-sm" />
            ))}
          </div>
        </div>
      </div>

      <div className="container flex items-center justify-between h-20 lg:h-24">
        {/* Logo */}
        <Link href="/" aria-label="AZ Hôtel des Arts" className="flex items-center gap-3 shrink-0">
          <Image
            src="/brand/logo.svg"
            alt={site.name}
            width={200}
            height={56}
            priority
            className={cn(
              "h-9 lg:h-11 w-auto transition-[filter] duration-500",
              transparent ? "brightness-0 invert" : ""
            )}
          />
        </Link>

        {/* Centre nav */}
        <nav className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-[12px] font-semibold transition-colors duration-300 smallcaps",
                transparent ? "text-snow/90 hover:text-brand-200" : "text-ink hover:text-brand-500",
                item.active && (transparent ? "text-brand-200" : "text-brand-500"),
              )}
              style={{ letterSpacing: "0.32em" }}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-px w-5 transition-opacity duration-500",
                  item.active ? "opacity-100 bg-brand-500" : "opacity-0",
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Right — language switcher + CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <LanguageSwitcher variant={transparent ? "dark" : "light"} />
          <Link
            href="/booking"
            className={cn(
              "ml-2 text-[11px] font-semibold px-7 py-3 transition-all duration-300 smallcaps",
              transparent
                ? "border border-snow/60 text-snow hover:bg-snow hover:text-brand-700"
                : "bg-brand-500 text-snow hover:bg-brand-600 shadow-soft",
            )}
            style={{ letterSpacing: "0.32em" }}
          >
            {t.nav.bookNow}
          </Link>
        </div>

        {/* Mobile burger */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher variant={transparent ? "dark" : "light"} />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "p-2 transition-colors",
              open ? "text-snow" : transparent ? "text-snow" : "text-ink",
            )}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — branded, editorial */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:hidden fixed inset-0 top-20 z-40 bg-gradient-to-b from-brand-900 via-brand-800 to-brand-900 text-snow overflow-y-auto"
          >
            {/* Subtle texture/glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                background:
                  "radial-gradient(60% 50% at 20% 0%, #B8CBE8 0%, transparent 60%), radial-gradient(50% 40% at 100% 100%, #5C82C7 0%, transparent 60%)",
              }}
            />

            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative container py-10 flex flex-col min-h-[calc(100vh-5rem)]"
            >
              {/* Eyebrow */}
              <motion.span
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="inline-flex items-center gap-3 subtitle-light text-[10px]"
              >
                <span className="block h-px w-7 bg-brand-200/70" />
                {t.hero.eyebrow}
              </motion.span>

              {/* Nav list — numbered, editorial */}
              <ul className="mt-10 space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.18 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-snow/10"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group flex items-baseline justify-between gap-4 py-5 transition-colors",
                        item.active ? "text-brand-200" : "text-snow hover:text-brand-200",
                      )}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-[10px] smallcaps tracking-[0.32em] text-brand-200/70 mt-1">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="font-display text-4xl sm:text-5xl"
                          style={{ fontWeight: 500, letterSpacing: "-0.02em" }}
                        >
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "size-5 transition-all opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                          item.active && "text-brand-200 opacity-100",
                        )}
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Primary CTA */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-10"
              >
                <Link
                  href="/booking"
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between w-full bg-brand-200 text-brand-900 px-6 py-5 hover:bg-snow transition-colors"
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[10px] smallcaps tracking-[0.32em] text-brand-900/65">
                      {t.common.from} {site.rating.score}/10 · {site.rating.count.toLocaleString()}
                    </span>
                    <span className="font-display text-2xl" style={{ fontWeight: 600 }}>
                      {t.common.checkAvail}
                    </span>
                  </span>
                  <ArrowUpRight className="size-6 transition-transform group-hover:rotate-12" />
                </Link>
              </motion.div>

              {/* Contact rail */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-8 grid grid-cols-2 gap-3"
              >
                <a
                  href={`tel:${site.phoneTel}`}
                  className="flex items-center gap-3 border border-snow/15 px-4 py-3 hover:border-brand-200 hover:bg-brand-700/40 transition-colors"
                >
                  <Phone className="size-4 text-brand-200 shrink-0" />
                  <span className="flex flex-col leading-tight">
                    <span className="text-[9px] smallcaps tracking-[0.28em] text-snow/55">{t.common.phone}</span>
                    <span className="text-[13px] font-medium truncate">{site.phone}</span>
                  </span>
                </a>
                <a
                  href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-snow/15 px-4 py-3 hover:border-brand-200 hover:bg-brand-700/40 transition-colors"
                >
                  <MessageCircle className="size-4 text-brand-200 shrink-0" />
                  <span className="flex flex-col leading-tight">
                    <span className="text-[9px] smallcaps tracking-[0.28em] text-snow/55">WhatsApp</span>
                    <span className="text-[13px] font-medium">{t.common.discover}</span>
                  </span>
                </a>
              </motion.div>

              {/* Footer — address + social */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-auto pt-10"
              >
                <div className="flex items-start gap-3 text-snow/65 text-xs leading-relaxed">
                  <MapPin className="size-4 text-brand-200 shrink-0 mt-0.5" />
                  <span>
                    {site.address.street} · {site.address.city}<br />
                    {site.address.country}
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-snow/10 pt-5">
                  <span className="text-[10px] smallcaps tracking-[0.32em] text-snow/45">
                    {t.common.weSpeak}
                  </span>
                  <div className="flex items-center gap-2">
                    {site.languages.map((l) => (
                      <Image
                        key={l.code}
                        src={l.flag}
                        alt={l.code}
                        width={20}
                        height={14}
                        className="rounded-[2px] opacity-80"
                      />
                    ))}
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="ml-3 size-8 border border-snow/20 hover:border-brand-200 hover:text-brand-200 flex items-center justify-center transition-colors"
                    >
                      <Instagram className="size-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
