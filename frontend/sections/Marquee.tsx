"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";

// Actual files in `/public/images/home/marquee/` — 01.jpg … 10.jpg.
const photos = Array.from({ length: 10 }, (_, i) =>
  `/images/home/marquee/${String(i + 1).padStart(2, "0")}.jpg`,
);

export function Marquee() {
  const { t } = useT();
  return (
    <section id="discover" className="bg-snow py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mb-10 md:mb-12 text-center">
        <span className="inline-flex items-center gap-3 subtitle reveal">
          <span className="block h-px w-7 bg-brand-500/40" />
          {t.marquee.eyebrow}
          <span className="block h-px w-7 bg-brand-500/40" />
        </span>
        <h2 className="section-title mt-5 max-w-2xl mx-auto reveal" style={{ transitionDelay: "120ms" }}>
          {t.marquee.title1}<br />
          <em>{t.marquee.title2}</em>
        </h2>
      </div>

      <div className="relative">
        {/* CSS keyframe-driven marquee: GPU compositor, doesn't trigger React
            re-renders, respects prefers-reduced-motion. Far smoother than the
            framer-motion x-animation we had before. */}
        <div className="marquee-track flex gap-3 sm:gap-4 md:gap-6">
          {[...photos, ...photos].map((src, i) => (
            <div
              key={i}
              className="group relative shrink-0 w-[200px] sm:w-[280px] md:w-[360px] aspect-[3/4] overflow-hidden bg-bone"
            >
              <Image
                src={src}
                alt=""
                fill
                loading="eager"
                quality={68}
                className="object-cover md:transition-transform md:duration-[1500ms] md:ease-out md:group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 200px, (max-width: 768px) 280px, 360px"
              />
              <div className="absolute inset-0 bg-brand-900/0 md:group-hover:bg-brand-900/15 transition-colors duration-700" />
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-snow to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-snow to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
