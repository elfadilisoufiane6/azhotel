"use client";

import { CheckCircle2 } from "lucide-react";
import { BookingForm } from "@/components/booking/BookingForm";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SplitText } from "@/components/ui/SplitText";
import { useT } from "@/lib/i18n";

export function HomeBooking() {
  const { t } = useT();

  return (
    <section id="booking">
      {/* ── Image hero — ken-burns + decorative eyebrow + word reveal ── */}
      <div className="relative h-[58vh] min-h-[380px] md:h-[70vh] md:min-h-[480px] overflow-hidden">
        <ResponsiveImage
          desktop="/images/home/booking/main.jpg"
          mobile="/images/home/booking/mobile.jpg"
          alt=""
          fill loading="lazy"
          className="object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/35 to-brand-900/55" />

        <div className="absolute inset-x-0 bottom-0 container pb-10 md:pb-14 pt-24 md:pt-32 text-snow">
          <span className="inline-flex items-center gap-3 subtitle-light animate-fade-up">
            <span className="block h-px w-7 bg-brand-200/70" />
            {t.booking.eyebrow}
          </span>
          <h2
            className="mt-4 md:mt-5 font-display text-snow text-balance max-w-4xl"
            style={{
              fontWeight: 700,
              fontSize: "clamp(1.9rem, 6vw, 5.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            <SplitText key={`${t.booking.title1}-${t.booking.title2}`} lines={[t.booking.title1, t.booking.title2]} accentLine={1} />
          </h2>
        </div>
      </div>

      {/* ── Booking form sits on white, just below the hero ── */}
      <div className="bg-snow">
        <div className="container py-10 md:py-16 lg:py-20">
          <p className="text-ink/75 text-[14px] md:text-base max-w-2xl mx-auto text-center leading-relaxed animate-fade-up">
            {t.booking.lede}
          </p>

          <div
            className="mt-8 md:mt-10 max-w-5xl mx-auto bg-snow border border-brand-100 shadow-luxe animate-fade-up"
            style={{ animationDelay: "150ms" }}
          >
            <BookingForm variant="inline" />
          </div>

          {/* Reassurances */}
          <ul className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 md:gap-y-10 border-t border-brand-100 pt-10 md:pt-12">
            {t.booking.reassure.map((r, i) => (
              <li
                key={r.title}
                className="animate-fade-up"
                style={{ animationDelay: `${300 + i * 80}ms` }}
              >
                <CheckCircle2 className="size-5 text-brand-500" />
                <p className="mt-4 font-display text-xl text-ink" style={{ fontWeight: 600 }}>
                  {r.title}
                </p>
                <p className="mt-1 text-sm text-ink/70 leading-relaxed">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
