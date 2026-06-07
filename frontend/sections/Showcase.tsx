"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

/**
 * Full-bleed cinematic showcase. Image + parallax + short title overlay.
 * Each Showcase has its own desktop image AND mobile image.
 */
export function Showcase({
  id,
  desktop,
  mobile,
  eyebrow,
  title1,
  title2,
  body,
  href,
  cta,
  align = "left",
  variant = "dark",
}: {
  id: string;
  desktop: string;
  mobile: string;
  eyebrow: string;
  title1: string;
  title2: string;
  body: string;
  href: string;
  cta: string;
  align?: "left" | "right";
  variant?: "dark" | "light";
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id={id} ref={ref} className="relative min-h-[72svh] md:min-h-[100svh] overflow-hidden bg-brand-900">
      <motion.div style={{ y: imageY }} className="absolute inset-[-10%]">
        <ResponsiveImage
          desktop={desktop}
          mobile={mobile}
          alt=""
          fill loading="lazy" quality={75}
          className="object-cover"
        />
      </motion.div>
      <div className={`absolute inset-0 ${variant === "dark" ? "bg-brand-900/55" : "bg-brand-900/30"}`} />

      <div className="relative container min-h-[72svh] md:min-h-[100svh] flex items-center py-20 md:py-32">
        <div className={`max-w-2xl ${align === "right" ? "md:ml-auto md:text-right" : ""}`}>
          <motion.span
            className={`inline-flex items-center gap-3 subtitle-light ${align === "right" ? "md:flex-row-reverse" : ""}`}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <motion.span
              initial={{ width: 0 }} whileInView={{ width: 28 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block h-px bg-brand-200/70"
            />
            {eyebrow}
          </motion.span>

          <motion.h2
            className="mt-5 md:mt-6 font-display text-snow"
            style={{
              fontWeight: 500,
              fontSize: "clamp(2.25rem, 7vw, 5.75rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
            }}
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          >
            {title1}
            <br />
            <em className="text-brand-200" style={{ fontFamily: "var(--font-editorial)", fontWeight: 400 }}>
              {title2}
            </em>
          </motion.h2>

          <motion.p
            className="mt-5 md:mt-8 max-w-md text-snow/85 leading-relaxed text-[15px] md:text-base"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
          >
            {body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.45 }}
            className={`mt-8 md:mt-10 inline-flex ${align === "right" ? "md:ml-auto" : ""}`}
          >
            <Link href={href}
                  className="group inline-flex items-center gap-3 text-snow border-b border-brand-200/60 pb-1 smallcaps tracking-[0.32em] text-[11px] md:text-sm hover:text-brand-200 hover:border-brand-200 transition-colors">
              {cta}
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-12" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
