"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BedDouble, CalendarCheck, Users, Star,
  Newspaper, Images, Settings, LogOut,
} from "lucide-react";

const items = [
  { href: "/",          label: "Overview",     icon: LayoutDashboard },
  { href: "/bookings",  label: "Bookings",     icon: CalendarCheck },
  { href: "/rooms",     label: "Rooms",        icon: BedDouble },
  { href: "/users",     label: "Customers",    icon: Users },
  { href: "/reviews",   label: "Reviews",      icon: Star },
  { href: "/blog",      label: "Blog",         icon: Newspaper },
  { href: "/gallery",   label: "Media",        icon: Images },
  { href: "/settings",  label: "Settings",     icon: Settings },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-midnight-900 text-white">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <span className="font-display text-xl">AZ <span className="text-gold-400">Admin</span></span>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {items.map((it) => {
          const Icon = it.icon;
          const active = path === it.href || (it.href !== "/" && path.startsWith(it.href));
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition ${
                active ? "bg-white/10 text-gold-400" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="size-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <Link href="/login" className="m-3 flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded">
        <LogOut className="size-4" /> Sign out
      </Link>
    </aside>
  );
}
