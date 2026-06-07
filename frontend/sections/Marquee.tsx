"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

// Actual files in `/public/images/home/marquee/` — 01.png … 10.png.
const photos = Array.from({ length: 10 }, (_, i) =>
  `/images/home/marquee/${String(i + 1).padStart(2, "0")}.png`,
);

export function Marquee() {
  const { t } = useT();
  return (
    <section id="discover" className="bg-snow py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mb-10 md:mb-12 text-center">
        <motion.span
          className="subtitle"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          {t.marquee.eyebrow}
        </motion.span>
        <motion.h2
          className="section-title mt-5 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
        >
          {t.marquee.title1}<br/>
          <em>{t.marquee.title2}</em>
        </motion.h2>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-3 sm:gap-4 md:gap-6 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...photos, ...photos].map((src, i) => (
            <div
              key={i}
              className="relative shrink-0 w-[200px] sm:w-[280px] md:w-[360px] aspect-[3/4] overflow-hidden bg-bone"
            >
              <Image
                src={src}
                alt=""
                fill
                loading="eager"
                quality={72}
                className="object-cover"
                sizes="(max-width: 640px) 200px, (max-width: 768px) 280px, 360px"
              />
            </div>
          ))}
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-snow to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-snow to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
