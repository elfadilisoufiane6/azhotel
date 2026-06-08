"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin, CheckCircle2, Clock } from "lucide-react";
import { BookingForm } from "@/components/booking/BookingForm";
import { FadeUp, SplitText } from "@/components/ui/SplitText";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { useT } from "@/lib/i18n";
import { site } from "@/lib/site";

export function BookingClient() {
  const { t } = useT();
  return (
    <>
      {/* Hero — ken-burns + decorative eyebrow + word reveal */}
      <section className="relative h-[58vh] min-h-[380px] md:h-[70vh] md:min-h-[480px] overflow-hidden">
        <ResponsiveImage
          desktop="/images/pages/booking/main.jpg"
          mobile="/images/pages/booking/mobile.jpg"
          alt=""
          fill priority
          fetchPriority="high"
          className="object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/45 to-brand-900/60" />
        <div className="absolute inset-x-0 bottom-0 container pb-10 pt-24 md:pb-14 md:pt-32 text-snow">
          <span className="inline-flex items-center gap-3 subtitle-light animate-fade-up">
            <span className="block h-px w-7 bg-brand-200/70" />
            {t.booking.eyebrow}
          </span>
          <h1
            className="mt-5 font-display text-snow max-w-4xl"
            style={{ fontWeight: 700, fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: 0.98, letterSpacing: "-0.035em" }}
          >
            <SplitText key={`${t.booking.title1}-${t.booking.title2}`} lines={[t.booking.title1, t.booking.title2]} accentLine={1} />
          </h1>
        </div>
      </section>

      {/* Booking form + reassurances */}
      <section className="section bg-snow">
        <div className="container">
          <FadeUp>
            <p className="lede max-w-3xl mb-8 md:mb-12">{t.booking.lede}</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="shadow-luxe border border-brand-100 bg-snow p-3">
              <BookingForm variant="inline" />
            </div>
          </FadeUp>

          <ul className="mt-14 md:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 md:gap-y-10">
            {t.booking.reassure.map((r, i) => (
              <motion.li
                key={r.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <CheckCircle2 className="size-5 text-brand-500" />
                <p className="mt-4 font-display text-xl text-ink" style={{ fontWeight: 600 }}>{r.title}</p>
                <p className="mt-1 text-sm text-ink/70 leading-relaxed">{r.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact + Languages — image background, content inside a snow card for max contrast */}
      <section className="relative overflow-hidden">
        <ResponsiveImage
          desktop="/images/pages/booking-contact/main.jpg"
          mobile="/images/pages/booking-contact/mobile.jpg"
          alt=""
          fill loading="lazy"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-900/60" />

        <div className="relative container py-16 md:py-24 lg:py-28">
          <div className="bg-snow shadow-luxe p-6 md:p-10 lg:p-14 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 md:gap-12">
              <FadeUp className="lg:col-span-7">
                <span className="subtitle">{site.phone}</span>
                <h3 className="mt-5 font-display text-ink"
                    style={{ fontWeight: 700, fontSize: "clamp(1.75rem, 3.8vw, 3.25rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
                >
                  {t.booking.contactTitle1}{" "}
                  <em className="text-brand-500" style={{ fontFamily: "var(--font-editorial)", fontWeight: 400 }}>{t.booking.contactTitle2}</em>
                </h3>

                <ul className="mt-8 md:mt-10 grid sm:grid-cols-2 gap-y-5 md:gap-y-6 gap-x-8 max-w-2xl">
                  <ContactItem icon={Phone}         label={t.common.phone}    value={site.phone}    href={`tel:${site.phoneTel}`} />
                  <ContactItem icon={MessageCircle} label="WhatsApp"          value={site.whatsapp} href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} />
                  <ContactItem icon={Mail}          label={t.common.email}    value={site.email}    href={`mailto:${site.email}`} />
                  <ContactItem icon={MapPin}        label={t.common.address}  value={`${site.address.street}, ${site.address.city}`} />
                </ul>
              </FadeUp>

              <FadeUp delay={0.15} className="lg:col-span-5 lg:border-l lg:border-brand-100 lg:pl-12">
                <span className="subtitle">{t.common.languagesSpoken}</span>
                <h3 className="mt-5 font-display text-ink"
                    style={{ fontWeight: 700, fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                  {t.booking.langTitle1}{" "}
                  <em className="text-brand-500" style={{ fontFamily: "var(--font-editorial)", fontWeight: 400 }}>{t.booking.langTitle2}</em>
                </h3>

                <ul className="mt-8 space-y-4">
                  {site.languages.map((l) => (
                    <li key={l.code} className="flex items-center gap-4 text-ink">
                      <Image src={l.flag} alt={l.code} width={36} height={24} className="rounded-sm shadow-sm" />
                      <span className="font-display text-xl" style={{ fontWeight: 500 }}>{l.label}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex items-center gap-3 text-ink/75 text-sm">
                  <Clock className="size-4 text-brand-500" />
                  <span>{t.booking.reception24}</span>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon, label, value, href,
}: { icon: typeof Phone; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span className="size-11 border border-brand-200 text-brand-500 flex items-center justify-center shrink-0 transition-colors group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-snow">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] smallcaps tracking-[0.28em] text-brand-500 font-semibold">{label}</p>
        <p className="mt-1 font-display text-lg text-ink break-words" style={{ fontWeight: 600 }}>{value}</p>
      </div>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="group flex items-center gap-4 hover:text-brand-500 transition-colors">{inner}</a>
      ) : (
        <div className="group flex items-center gap-4">{inner}</div>
      )}
    </li>
  );
}
