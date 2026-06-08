"use client";

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
        fill loading="lazy"
        className="object-cover"
      />
      {/* Stronger overlay so the body copy stays high-contrast against the photo */}
      <div className="absolute inset-0 bg-brand-900/97" />

      <div className="relative container py-16 md:py-24 lg:py-32 text-snow">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-end mb-10 md:mb-12">
          <div className="lg:col-span-7 animate-fade-up">
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
          </div>

          <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "150ms" }}>
            <p className="text-snow/95 max-w-md leading-relaxed">{t.booking.lede}</p>
          </div>
        </div>

        {/* Booking form */}
        <div className="bg-snow p-3 lg:p-2 shadow-luxe animate-fade-up" style={{ animationDelay: "300ms" }}>
          <BookingForm variant="inline" />
        </div>

        {/* Reassurances */}
        <ul className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 md:gap-y-10 border-t border-snow/15 pt-10 md:pt-12">
          {t.booking.reassure.map((r, i) => (
            <li
              key={r.title}
              className="animate-fade-up"
              style={{ animationDelay: `${400 + i * 80}ms` }}
            >
              <CheckCircle2 className="size-5 text-brand-200" />
              <p className="mt-4 font-display text-xl text-snow" style={{ fontWeight: 600 }}>
                {r.title}
              </p>
              <p className="mt-1 text-sm text-snow/90 leading-relaxed">{r.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
