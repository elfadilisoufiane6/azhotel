"use client";

import Link from "next/link";
import { ChevronDown, Star } from "lucide-react";
import { motion } from "framer-motion";
import { SplitText, FadeUp } from "@/components/ui/SplitText";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { useT } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Hero() {
  const { t } = useT();
  return (
    <section className="relative min-h-[78svh] md:min-h-[100svh] w-full overflow-hidden text-snow">
      <div className="absolute inset-0">
        <ResponsiveImage
          desktop="/images/home/hero/main.png"
          mobile="/images/home/hero/mobile.png"
          alt=""
          fill priority
          fetchPriority="high"
          quality={80}
          className="object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/55 via-brand-900/30 to-brand-900/85" />
      </div>

      <div className="relative container flex flex-col justify-between min-h-[78svh] md:min-h-[100svh] pt-28 md:pt-32 pb-8 md:pb-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-3 subtitle-light">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 28 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="block h-px bg-brand-200/70"
            />
            {t.hero.eyebrow}
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 28 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="block h-px bg-brand-200/70"
            />
          </span>
        </motion.div>

        <div className="my-auto py-6 md:py-10 max-w-4xl mx-auto text-center">
          <h1 className="font-display text-snow"
              style={{
                fontWeight: 500,
                fontSize: "clamp(2.5rem, 7.5vw, 6.25rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
              }}
          >
            <SplitText key={t.hero.title1} lines={[t.hero.title1, t.hero.title2]} accentLine={1} />
          </h1>

          <FadeUp delay={1.4} className="mt-7 md:mt-9 max-w-xl mx-auto">
            <p className="text-snow/85 text-base md:text-lg leading-relaxed">{t.hero.body}</p>
          </FadeUp>

          <FadeUp delay={1.65} className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Link href="/booking" className="btn-primary">{t.common.checkAvail}</Link>
            <Link href="/rooms"   className="btn-outline-light">{t.nav.rooms}</Link>
          </FadeUp>
        </div>

        <FadeUp delay={2}>
          <div className="flex items-center justify-between gap-4 text-snow/80 text-[10px] md:text-xs border-t border-snow/15 pt-5 md:pt-6">
            <span className="flex items-center gap-2 smallcaps tracking-[0.22em] md:tracking-[0.32em]">
              <Star className="size-3 md:size-3.5 fill-brand-200 text-brand-200 shrink-0" />
              <span className="whitespace-nowrap">{site.rating.score} / 10</span>
              <span className="hidden sm:inline text-snow/55">·</span>
              <span className="hidden sm:inline whitespace-nowrap">{site.rating.count.toLocaleString()} {t.common.reviewsCount}</span>
            </span>
            <span className="hidden md:inline smallcaps tracking-[0.32em]">{t.hero.trust}</span>
            <a href="#discover" className="flex items-center gap-2 hover:text-brand-200 transition-colors smallcaps tracking-[0.22em] md:tracking-[0.32em] shrink-0">
              {t.common.discover}
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                <ChevronDown className="size-3.5 md:size-4" />
              </motion.span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
