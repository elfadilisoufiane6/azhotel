"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, BedDouble, Users, Maximize, ArrowLeft } from "lucide-react";
import { FadeUp } from "@/components/ui/SplitText";
import { useT } from "@/lib/i18n";
import { formatCurrency } from "@/lib/format";
import type { Room } from "@/types";

export function RoomDetail({ room }: { room: Room }) {
  const { t } = useT();
  return (
    <article>
      <section className="relative h-[62vh] min-h-[420px] md:h-[85vh] md:min-h-[560px]">
        <Image src={room.images[0].url} alt={room.images[0].alt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 container pb-10 md:pb-14 text-snow">
          <Link href="/rooms" className="inline-flex items-center gap-2 text-[10.5px] smallcaps tracking-[0.28em] md:tracking-[0.32em] text-snow/75 hover:text-brand-200 transition-colors mb-6 md:mb-8">
            <ArrowLeft className="size-3.5" />
            {t.common.seeAll}
          </Link>
          <p className="subtitle-light text-xs capitalize">{room.category}</p>
          <h1 className="mt-3 font-display text-snow max-w-3xl"
              style={{ fontWeight: 700, fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: 0.98, letterSpacing: "-0.035em" }}
          >
            {room.name}
          </h1>
        </div>
      </section>

      <section className="section-tight bg-snow">
        <div className="container grid lg:grid-cols-12 gap-10 md:gap-14">
          <div className="lg:col-span-7">
            <FadeUp>
              <p className="lede max-w-[60ch] text-lg">{room.description}</p>
            </FadeUp>

            <div className="mt-10 md:mt-12 grid grid-cols-3 gap-4 md:gap-8 border-y border-brand-100 py-6 md:py-8">
              <Stat icon={<Maximize  className="size-4" />} label={t.common.size}   value={`${room.size} m²`} />
              <Stat icon={<BedDouble className="size-4" />} label={t.common.beds}   value={room.beds} />
              <Stat icon={<Users     className="size-4" />} label={t.common.guests} value={`${t.common.upTo} ${room.maxGuests}`} />
            </div>

            <h2 className="mt-12 md:mt-16 font-display text-2xl md:text-3xl text-ink" style={{ fontWeight: 700 }}>{t.common.inTheRoom}</h2>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {room.amenities.map((a) => (
                <li key={a.id} className="flex items-start gap-3 text-ink/85 text-sm">
                  <Check className="size-4 text-brand-500 mt-0.5 shrink-0" />
                  <span>{a.name}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 md:mt-16 font-display text-2xl md:text-3xl text-ink" style={{ fontWeight: 700 }}>{t.common.photographs}</h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {room.images.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden bg-bone">
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <div className="bg-bone p-6 md:p-8">
              <p className="subtitle text-xs">{t.common.from}</p>
              <p className="mt-1 font-display text-3xl md:text-4xl text-ink" style={{ fontWeight: 700 }}>
                {formatCurrency(room.basePrice, room.currency)}
                <span className="text-base text-ink/60 ml-2">{t.common.perNight}</span>
              </p>

              <div className="mt-8 space-y-3">
                {room.rateOptions.map((r) => (
                  <div key={r.id} className="border border-brand-100 p-4 bg-snow">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-ink">{r.name}</p>
                      <p className="font-display text-lg text-ink whitespace-nowrap" style={{ fontWeight: 700 }}>{formatCurrency(r.price)}</p>
                    </div>
                    <p className="mt-1 text-xs text-ink/60">{r.description}</p>
                  </div>
                ))}
              </div>

              <Link href={`/booking?room=${room.slug}`} className="btn-primary w-full justify-center mt-6">
                {t.common.reserveNow}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-brand-500">{icon}</span>
      <span className="subtitle text-[10px]">{label}</span>
      <span className="font-display text-xl text-ink" style={{ fontWeight: 700 }}>{value}</span>
    </div>
  );
}
