"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { formatCurrency } from "@/lib/format";
import { rooms } from "@/lib/content/rooms";

const minPrice = Math.min(...rooms.map((r) => r.basePrice));
const currency = rooms[0]?.currency ?? "MAD";

export function MobileBookingBar() {
  const { t } = useT();
  const path = usePathname();
  // Only surface on the rooms listing + each room detail page — that's the
  // moment the user is comparing rates and most likely to act.
  if (!path?.startsWith("/rooms")) return null;

  return (
    <div
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-snow border-t border-brand-100 shadow-[0_-12px_30px_-12px_rgba(20,41,80,0.18)]"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="container flex items-center justify-between gap-4 py-3">
        <div className="min-w-0 leading-tight">
          <div className="text-[9px] smallcaps tracking-[0.28em] text-ink/55">{t.common.from}</div>
          <div className="font-display text-lg text-ink truncate" style={{ fontWeight: 700 }}>
            {formatCurrency(minPrice, currency)}{" "}
            <span className="text-[10px] smallcaps tracking-[0.22em] text-ink/55 font-sans">{t.common.perNight}</span>
          </div>
        </div>
        <Link
          href="/booking"
          className="shrink-0 inline-flex items-center gap-2 bg-brand-500 text-snow px-5 py-3 text-[11px] font-semibold smallcaps tracking-[0.28em] hover:bg-brand-600 transition-colors"
        >
          {t.nav.bookNow}
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
