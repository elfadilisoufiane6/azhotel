"use client";

import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export function RevenueChart({ data }: { data: { month: string; revenue: number }[] }) {
  return (
    <div className="card card-pad">
      <h3 className="font-display text-xl text-midnight-800">Revenue · last 12 months</h3>
      <p className="text-xs text-zinc-500 mt-1">All confirmed and completed bookings.</p>

      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -10 }}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#C9A14A" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#C9A14A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eee" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #eee", fontSize: 12 }} />
            <Area dataKey="revenue" stroke="#C9A14A" strokeWidth={2} fill="url(#rev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
