"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const colors = ["#C9A14A", "#0A2540", "#76A099", "#D17B7B", "#A1A8B6", "#8C6FA3"];

export function StatusPie({ data }: { data: { status: string; n: number }[] }) {
  return (
    <div className="card card-pad">
      <h3 className="font-display text-xl text-midnight-800">Bookings by status</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie dataKey="n" data={data} nameKey="status" innerRadius={64} outerRadius={96} paddingAngle={2}>
              {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
