"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { BookingForm } from "@/components/booking/BookingForm";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { useT } from "@/lib/i18n";

export function HomeBooking() {
  const { t } = useT();

  return (
    <section id="booking" className="relative overflow-hidden">
      <ResponsiveImage
        desktop="/images/home/booking/main.jpg"
        mobile="/images/home/booking/mobile.jpg"
        alt=""
        fill loading="lazy" quality={70}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-900/92" />

      <div className="relative container py-16 md:py-24 lg:py-32 text-snow">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-end mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <span className="subtitle-light">{t.booking.eyebrow}</span>
            <h2
              className="mt-5 font-display text-snow text-balance"
              style={{
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
              }}
            >
              {t.booking.title1}{" "}
              <em className="text-brand-200" style={{ fontFamily: "var(--font-editorial)", fontWeight: 400 }}>
                {t.booking.title2}
              </em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <p className="text-snow/80 max-w-md leading-relaxed">{t.booking.lede}</p>
          </motion.div>
        </div>

        {/* Booking form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="bg-snow p-3 lg:p-2 shadow-luxe"
        >
          <BookingForm variant="inline" />
        </motion.div>

        {/* Reassurances */}
        <ul className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 md:gap-y-10 border-t border-snow/15 pt-10 md:pt-12">
          {t.booking.reassure.map((r, i) => (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.08 }}
            >
              <CheckCircle2 className="size-5 text-brand-200" />
              <p className="mt-4 font-display text-xl text-snow" style={{ fontWeight: 600 }}>
                {r.title}
              </p>
              <p className="mt-1 text-sm text-snow/70 leading-relaxed">{r.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
