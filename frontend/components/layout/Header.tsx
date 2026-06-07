"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
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

        {/* Mobile burger — plain icon, colour follows context */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher variant={transparent ? "dark" : "light"} />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "size-11 flex items-center justify-center -mr-2 transition-colors",
              open ? "text-ink" : transparent ? "text-snow" : "text-ink",
            )}
          >
            {open ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — page names dominantes, dividers fins, active indicator */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 top-20 z-40 bg-snow overflow-y-auto"
          >
            <nav className="container pt-10 pb-12 flex flex-col">
              <ul>
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(i === 0 && "border-t border-brand-100", "border-b border-brand-100")}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-6 transition-colors",
                        item.active ? "text-brand-500" : "text-ink hover:text-brand-500",
                      )}
                    >
                      <span
                        className="font-display text-4xl sm:text-5xl"
                        style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
                      >
                        {item.label}
                      </span>
                      {item.active && (
                        <span className="size-2 rounded-full bg-brand-500" aria-hidden />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-10 flex flex-col items-stretch gap-5"
              >
                <Link
                  href="/booking"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  {t.common.checkAvail}
                </Link>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="flex items-center justify-center gap-3 text-ink/75 hover:text-brand-500 transition-colors text-sm"
                >
                  <Phone className="size-4 text-brand-500" />
                  {site.phone}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
