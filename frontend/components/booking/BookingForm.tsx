"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Users, BedDouble, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "hero" | "inline" | "compact";

function today(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

export function BookingForm({ variant = "hero" }: { variant?: Variant }) {
  const router = useRouter();
  const [checkIn,  setCheckIn]  = useState(today(1));
  const [checkOut, setCheckOut] = useState(today(2));
  const [adults,   setAdults]   = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms,    setRooms]    = useState(1);

  const minCheckOut = useMemo(() => {
    const d = new Date(checkIn);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, [checkIn]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({
      checkIn, checkOut,
      adults: String(adults),
      children: String(children),
      rooms: String(rooms),
    });
    router.push(`/booking?${q.toString()}`);
  }

  const wrap = cn(
    "w-full",
    variant === "hero"    && "bg-snow shadow-luxe p-3 lg:p-2",
    variant === "inline"  && "bg-snow border border-brand-100 p-3",
    variant === "compact" && "bg-brand-900 text-snow p-4",
  );

  return (
    <form onSubmit={submit} className={wrap}>
      <div className="grid gap-2 lg:grid-cols-[1.2fr,1.2fr,1.4fr,1fr,auto] lg:items-stretch">
        <Field label="Check-in" icon={<CalendarDays className="size-3.5" />} variant={variant}>
          <input type="date" min={today()} value={checkIn}
                 onChange={(e) => setCheckIn(e.target.value)}
                 className={inputCls(variant)} />
        </Field>

        <Field label="Check-out" icon={<CalendarDays className="size-3.5" />} variant={variant}>
          <input type="date" min={minCheckOut} value={checkOut}
                 onChange={(e) => setCheckOut(e.target.value)}
                 className={inputCls(variant)} />
        </Field>

        <Field label="Guests" icon={<Users className="size-3.5" />} variant={variant}>
          <div className="flex items-center gap-2">
            <Stepper label="Adults"   value={adults}   set={setAdults}   min={1} max={6} variant={variant} />
            <Stepper label="Children" value={children} set={setChildren} min={0} max={4} variant={variant} />
          </div>
        </Field>

        <Field label="Rooms" icon={<BedDouble className="size-3.5" />} variant={variant}>
          <Stepper label="" value={rooms} set={setRooms} min={1} max={4} variant={variant} />
        </Field>

        <button type="submit" className="btn-primary justify-center whitespace-nowrap lg:h-full">
          Check availability
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </form>
  );
}

function Field({
  label, icon, children, variant,
}: { label: string; icon: React.ReactNode; children: React.ReactNode; variant: Variant }) {
  const labelColor = variant === "compact" ? "text-brand-200" : "text-ink/65";
  const wrap = variant === "compact" ? "border border-snow/15" : "border border-brand-100 bg-snow";
  return (
    <label className={cn("flex flex-col gap-0.5 px-3 py-2 lg:px-4 lg:py-2.5", wrap)}>
      <span className={cn("flex items-center gap-2 text-[10px] smallcaps tracking-[0.28em] lg:tracking-[0.32em]", labelColor)}>
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function inputCls(variant: Variant) {
  return cn(
    "bg-transparent text-sm font-medium focus:outline-none w-full",
    variant === "compact" ? "text-snow" : "text-ink"
  );
}

function Stepper({
  label, value, set, min, max, variant,
}: {
  label: string;
  value: number;
  set: (n: number) => void;
  min: number;
  max: number;
  variant: Variant;
}) {
  const txt = variant === "compact" ? "text-snow" : "text-ink";
  return (
    <div className={cn("flex items-center gap-2 text-sm", txt)}>
      {label && <span className="opacity-70 text-[12px]">{label}</span>}
      <button type="button" onClick={() => set(Math.max(min, value - 1))}
              className="size-6 border border-current/30 hover:border-brand-500 hover:text-brand-500 transition-colors text-xs"
              aria-label={`Decrease ${label || "value"}`}>−</button>
      <span className="w-5 text-center font-medium tabular-nums">{value}</span>
      <button type="button" onClick={() => set(Math.min(max, value + 1))}
              className="size-6 border border-current/30 hover:border-brand-500 hover:text-brand-500 transition-colors text-xs"
              aria-label={`Increase ${label || "value"}`}>+</button>
    </div>
  );
}
