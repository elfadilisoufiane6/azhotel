"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
    // requestAnimationFrame batches the scroll handler against the next paint —
    // cuts the cost of state updates while the user is dragging on a phone.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        transparent ? "bg-transparent" : "bg-snow border-b border-brand-100 shadow-sm",
      )}
    >
      <div className="container flex items-center justify-between h-20 lg:h-24">
        {/* Logo slot — bare wordmark placeholder until a new brand is added */}
        <Link
          href="/"
          aria-label="Home"
          className={cn(
            "flex items-center shrink-0 font-display text-lg tracking-[0.05em] transition-colors duration-300",
            transparent ? "text-snow" : "text-ink",
          )}
          style={{ fontWeight: 600 }}
        >
          {/* Drop your wordmark / SVG logo here */}
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

      {/* Mobile drawer — always in DOM, visibility toggled via classes.
          Pure CSS, no framer-motion. Guaranteed to render. */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          "lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-snow overflow-y-auto",
          "transition-[opacity,transform] duration-300 ease-out",
          open
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-2 pointer-events-none",
        )}
      >
        <nav className="container pt-10 pb-12 flex flex-col">
          <span className="inline-flex items-center gap-3 subtitle text-[10px] mb-8">
            <span className="block h-px w-6 bg-brand-500/40" />
            {t.hero.eyebrow}
          </span>

          <ul>
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={cn(i === 0 && "border-t border-brand-100", "border-b border-brand-100")}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-baseline gap-5 py-5 transition-colors group",
                    item.active ? "text-brand-500" : "text-ink hover:text-brand-500",
                  )}
                >
                  <span
                    className={cn(
                      "text-[10px] smallcaps tracking-[0.32em] tabular-nums shrink-0 transition-colors",
                      item.active ? "text-brand-500" : "text-ink/40 group-hover:text-brand-500",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-display text-2xl sm:text-3xl leading-[1.1]"
                    style={{ fontWeight: 500, letterSpacing: "-0.005em" }}
                  >
                    {item.label}
                  </span>
                  {item.active && (
                    <span
                      className="ml-auto mt-2 size-1.5 rounded-full bg-brand-500 shrink-0"
                      aria-hidden
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-stretch gap-4">
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center"
            >
              {t.common.checkAvail}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
