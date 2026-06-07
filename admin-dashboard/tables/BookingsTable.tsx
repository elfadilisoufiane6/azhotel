"use client";

import Link from "next/link";

type Row = {
  id: string;
  reference: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  status: string;
  check_in: string;
  check_out: string;
  total_amount: number;
  currency: string;
  room_name: string;
};

const statusColor: Record<string, string> = {
  pending:      "bg-amber-100 text-amber-800",
  confirmed:    "bg-emerald-100 text-emerald-800",
  checked_in:   "bg-sky-100 text-sky-800",
  checked_out:  "bg-zinc-100 text-zinc-700",
  cancelled:    "bg-rose-100 text-rose-700",
  no_show:      "bg-rose-100 text-rose-700",
};

export function BookingsTable({ rows }: { rows: Row[] }) {
  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-zinc-600">
          <tr>
            {["Reference", "Guest", "Room", "Dates", "Total", "Status"].map((h) => (
              <th key={h} className="text-left px-4 py-3 font-medium text-xs uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-zinc-50/50 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-gold-500">
                <Link href={`/bookings/${r.reference}`}>{r.reference}</Link>
              </td>
              <td className="px-4 py-3">
                <div className="font-medium">{r.guest_first_name} {r.guest_last_name}</div>
                <div className="text-xs text-zinc-500">{r.guest_email}</div>
              </td>
              <td className="px-4 py-3 text-zinc-700">{r.room_name}</td>
              <td className="px-4 py-3 text-zinc-700">{r.check_in} → {r.check_out}</td>
              <td className="px-4 py-3 font-medium">{Number(r.total_amount).toLocaleString()} {r.currency}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 text-[11px] uppercase tracking-widest rounded ${statusColor[r.status] ?? "bg-zinc-100"}`}>
                  {r.status.replace("_", " ")}
                </span>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={6} className="text-center py-10 text-zinc-500">No bookings yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
