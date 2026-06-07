"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";

type Room = {
  id: string;
  slug: string;
  name: string;
  category: string;
  base_price: number;
  currency: string;
  size: number;
  max_guests: number;
};

export default function RoomsAdminPage() {
  const { data, isLoading } = useSWR<Room[]>("/rooms", fetcher);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-midnight-800">Rooms</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage room inventory, pricing, and rate plans.</p>
        </div>
        <button className="btn-primary">Add room</button>
      </header>

      {isLoading ? (
        <p className="text-zinc-500">Loading…</p>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr>
                {["Name", "Category", "Beds", "Capacity", "Base price"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-xs uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {(data ?? []).map((r) => (
                <tr key={r.id} className="hover:bg-zinc-50/50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-zinc-500 font-mono">{r.slug}</div>
                  </td>
                  <td className="px-4 py-3 capitalize">{r.category}</td>
                  <td className="px-4 py-3">{r.size} m²</td>
                  <td className="px-4 py-3">up to {r.max_guests}</td>
                  <td className="px-4 py-3 font-medium">{Number(r.base_price).toLocaleString()} {r.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
