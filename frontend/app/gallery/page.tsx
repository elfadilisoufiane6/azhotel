"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import "yet-another-react-lightbox/styles.css";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { galleryImages, type GalleryCategory } from "@/lib/content/gallery";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/cn";

// Lightbox JS only loaded when needed (≈40 KB saved on initial bundle)
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

const CATEGORIES: ("all" | GalleryCategory)[] = ["all", "rooms", "restaurant", "lobby", "exterior", "city"];

export default function GalleryPage() {
  const { t } = useT();
  const [filter, setFilter] = useState<"all" | GalleryCategory>("all");
  const [index, setIndex] = useState(-1);

  const items = useMemo(() => {
    return filter === "all" ? galleryImages : galleryImages.filter((g) => g.category === filter);
  }, [filter]);

  const slides = items.map((g) => ({ src: g.url, alt: g.alt }));

  return (
    <>
      {/* Hero */}
      <section className="relative h-[58vh] min-h-[380px] md:h-[70vh] md:min-h-[480px] overflow-hidden">
        <ResponsiveImage
          desktop="/images/pages/gallery/hero.jpg"
          mobile="/images/pages/gallery/mobile.jpg"
          alt=""
          fill priority
          fetchPriority="high"
          quality={80}
          className="object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/30 to-brand-900/50" />
        <div className="absolute inset-x-0 bottom-0 container pb-10 pt-24 md:pb-14 md:pt-32 text-snow">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="subtitle-light"
          >
            {t.gallery.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-snow max-w-4xl"
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
            }}
          >
            {t.gallery.title1}<br />
            <em className="text-brand-200" style={{ fontFamily: "var(--font-editorial)", fontWeight: 400 }}>
              {t.gallery.title2}
            </em>
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
            className="lede max-w-3xl mb-10 md:mb-14"
          >
            {t.gallery.lede}
          </motion.p>

          <nav className="flex flex-wrap gap-2 mb-8 md:mb-12">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "px-3.5 py-2 md:px-5 text-[10px] md:text-[11px] font-semibold transition-colors border smallcaps tracking-[0.28em] md:tracking-[0.32em]",
                  filter === c
                    ? "bg-brand-500 text-snow border-brand-500"
                    : "border-brand-100 text-ink hover:border-brand-500 hover:text-brand-500",
                )}
              >
                {(t.gallery.filters as Record<string, string>)[c] ?? c}
              </button>
            ))}
          </nav>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {items.map((g, i) => (
              <motion.button
                key={g.id}
                onClick={() => setIndex(i)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 12) * 0.04 }}
                className={cn(
                  "group relative overflow-hidden bg-bone",
                  g.span === "tall"
                    ? "row-span-2 aspect-[3/4]"
                    : g.span === "wide"
                    ? "col-span-2 aspect-[16/10]"
                    : "aspect-square",
                )}
              >
                <Image
                  src={g.url}
                  alt={g.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {index >= 0 && (
        <Lightbox open index={index} close={() => setIndex(-1)} slides={slides} />
      )}
    </>
  );
}
