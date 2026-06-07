"use client";

import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-16 px-6 border-b border-zinc-200 bg-white flex items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
        <input
          placeholder="Search bookings, guests, rooms…"
          className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:border-gold-400"
        />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button className="size-9 rounded-md hover:bg-zinc-100 flex items-center justify-center text-zinc-600">
          <Bell className="size-4" />
        </button>
        <div className="size-9 rounded-full bg-midnight-800 text-white flex items-center justify-center text-xs font-medium">
          AZ
        </div>
      </div>
    </header>
  );
}
