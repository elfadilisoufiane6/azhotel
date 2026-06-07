"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { RevenueChart } from "@/charts/RevenueChart";
import { StatusPie }    from "@/charts/StatusPie";
import { BookingsTable } from "@/tables/BookingsTable";
import { TrendingUp, BedDouble, CalendarCheck, Users } from "lucide-react";

type Overview = {
  bookingsByStatus: { status: string; n: number }[];
  revenueByMonth:   { month: string; revenue: number }[];
  occupancy:        { total: number; occupied: number; pct: number };
  recentBookings:   Parameters<typeof BookingsTable>[0]["rows"];
};

export default function DashboardPage() {
  const { data, error, isLoading } = useSWR<Overview>("/dashboard/overview", fetcher);

  if (isLoading) return <div className="text-zinc-500">Loading overview…</div>;
  if (error || !data) {
    return (
      <EmptyState
        title="Cannot reach the API"
        body="The admin dashboard is wired to the backend at NEXT_PUBLIC_API_URL. Start the backend with `npm run dev` and reload."
      />
    );
  }

  const monthRevenue = data.revenueByMonth.at(-1)?.revenue ?? 0;
  const totalBookings = data.bookingsByStatus.reduce((s, r) => s + r.n, 0);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-midnight-800">Overview</h1>
          <p className="text-sm text-zinc-500 mt-1">Real-time view across reservations, revenue, and occupancy.</p>
        </div>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Revenue this month"  value={`${Math.round(Number(monthRevenue)).toLocaleString()} MAD`} icon={<TrendingUp className="size-4" />} />
        <Stat label="Total bookings"      value={totalBookings.toString()}                                  icon={<CalendarCheck className="size-4" />} />
        <Stat label="Occupancy today"     value={`${Math.round(data.occupancy.pct)}%`}                      icon={<BedDouble className="size-4" />} />
        <Stat label="Active rooms"        value={data.occupancy.total.toString()}                           icon={<Users className="size-4" />} />
      </section>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><RevenueChart data={data.revenueByMonth} /></div>
        <StatusPie data={data.bookingsByStatus} />
      </section>

      <section>
        <h2 className="font-display text-2xl text-midnight-800 mb-4">Recent bookings</h2>
        <BookingsTable rows={data.recentBookings} />
      </section>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="stat">
      <div className="flex items-center justify-between">
        <span className="stat-label">{label}</span>
        <span className="text-gold-500">{icon}</span>
      </div>
      <span className="stat-value">{value}</span>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="card card-pad text-center max-w-xl mx-auto mt-10">
      <h2 className="font-display text-2xl text-midnight-800">{title}</h2>
      <p className="mt-2 text-zinc-600 text-sm">{body}</p>
    </div>
  );
}
