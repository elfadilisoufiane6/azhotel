"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BedDouble, Maximize, Users, ArrowRight } from "lucide-react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { formatCurrency } from "@/lib/format";
import { rooms } from "@/lib/content/rooms";
import { useT } from "@/lib/i18n";

export default function RoomsPage() {
  const { t } = useT();
  return (
    <>
      {/* Hero — rooms image */}
      <section className="relative h-[58vh] min-h-[380px] md:h-[70vh] md:min-h-[480px] overflow-hidden">
        <ResponsiveImage
          desktop="/images/pages/rooms/hero.jpg"
          mobile="/images/pages/rooms/mobile.jpg"
          alt=""
          fill priority
          fetchPriority="high"
          quality={80}
          className="object-cover md:animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/30 to-brand-900/55" />
        <div className="absolute inset-x-0 bottom-0 container pb-10 pt-24 md:pb-14 md:pt-32 text-snow">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="subtitle-light"
          >
            {t.rooms.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-snow max-w-4xl"
            style={{ fontWeight: 700, fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: 0.98, letterSpacing: "-0.035em" }}
          >
            {t.rooms.title1}<br />
            <em className="text-brand-200" style={{ fontFamily: "var(--font-editorial)", fontWeight: 400 }}>{t.rooms.title2}</em>
          </motion.h1>
        </div>
      </section>

      <section className="section bg-snow">
        <div className="container">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lede max-w-3xl mb-12 md:mb-20"
          >
            {t.rooms.lede}
          </motion.p>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {rooms.map((room, i) => (
              <motion.article
                key={room.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col bg-snow border border-brand-100 shadow-card md:hover:shadow-luxe md:hover:-translate-y-1 transition-shadow duration-300"
              >
                <Link href={`/rooms/${room.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-bone">
                  <Image
                    src={room.images[0].url}
                    alt={room.images[0].alt}
                    fill
                    loading="lazy"
                    quality={70}
                    className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-4 left-4">
                    <span className="pill bg-snow/95 backdrop-blur-md">{room.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-brand-900/85 backdrop-blur-md text-snow px-3 py-1.5 text-[10px] smallcaps tracking-[0.28em]">
                    {t.common.from} {formatCurrency(room.basePrice, room.currency)}
                  </div>
                </Link>

                <div className="flex flex-col flex-1 p-6 md:p-7">
                  <Link href={`/rooms/${room.slug}`}>
                    <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight" style={{ fontWeight: 500, letterSpacing: "-0.015em" }}>
                      {room.name}
                    </h3>
                  </Link>
                  <p className="mt-1 text-[12px] italic text-brand-500/80" style={{ fontFamily: "var(--font-editorial)" }}>
                    {room.view}
                  </p>

                  <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-ink/65 smallcaps tracking-[0.22em] border-y border-brand-100 py-3">
                    <li className="flex items-center gap-1.5"><Maximize  className="size-3.5 text-brand-500" /> {room.size} m²</li>
                    <li className="flex items-center gap-1.5"><BedDouble className="size-3.5 text-brand-500" /> {room.beds}</li>
                    <li className="flex items-center gap-1.5"><Users     className="size-3.5 text-brand-500" /> {t.common.upTo} {room.maxGuests}</li>
                  </ul>

                  <p className="mt-5 text-sm text-ink/70 leading-relaxed line-clamp-2">
                    {room.shortDescription}
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-4 pt-5 border-t border-brand-100">
                    <div>
                      <div className="text-[10px] smallcaps tracking-[0.28em] text-ink/50">{t.common.from}</div>
                      <div className="mt-0.5 font-display text-2xl text-ink leading-none" style={{ fontWeight: 600 }}>
                        {formatCurrency(room.basePrice, room.currency)}
                        <span className="ml-1.5 text-[11px] font-sans text-ink/55 smallcaps tracking-[0.22em]" style={{ fontWeight: 500 }}>
                          {t.common.perNight}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="hidden sm:inline-flex items-center gap-2 text-[10.5px] font-semibold smallcaps tracking-[0.28em] text-ink/75 hover:text-brand-500 border-b border-brand-200 hover:border-brand-500 pb-1 transition-colors"
                      >
                        {t.common.discover}
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                      <Link
                        href={`/booking?room=${room.slug}`}
                        className="inline-flex items-center gap-2 bg-brand-500 text-snow px-4 py-3 text-[10.5px] font-semibold smallcaps tracking-[0.28em] hover:bg-brand-600 hover:shadow-luxe transition-all"
                      >
                        {t.nav.bookNow}
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
