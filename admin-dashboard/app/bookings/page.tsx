"use client";

import useSWR from "swr";
import { useState } from "react";
import { fetcher } from "@/lib/api";
import { BookingsTable } from "@/tables/BookingsTable";

const statuses = ["all", "pending", "confirmed", "checked_in", "checked_out", "cancelled"];

export default function BookingsPage() {
  const [status, setStatus] = useState("all");
  const key = status === "all" ? "/bookings" : `/bookings?status=${status}`;
  const { data, isLoading } = useSWR<Parameters<typeof BookingsTable>[0]["rows"]>(key, fetcher);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-midnight-800">Reservations</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage every booking — change status, add notes, contact guests.</p>
        </div>
        <button className="btn-primary">New reservation</button>
      </header>

      <nav className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1.5 text-xs uppercase tracking-widest rounded-md border ${
              status === s
                ? "bg-midnight-800 text-white border-midnight-800"
                : "border-zinc-200 text-zinc-600 hover:border-gold-400 hover:text-gold-500"
            }`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </nav>

      {isLoading ? (
        <p className="text-zinc-500">Loading bookings…</p>
      ) : (
        <BookingsTable rows={data ?? []} />
      )}
    </div>
  );
}
