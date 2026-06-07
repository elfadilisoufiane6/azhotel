"use client";

import useSWR from "swr";
import Image from "next/image";
import { fetcher } from "@/lib/api";
import { Upload, Trash2 } from "lucide-react";

type Gallery = { id: string; url: string; alt: string; category: string; width: number; height: number };

export default function GalleryAdminPage() {
  const { data } = useSWR<Gallery[]>("/gallery", fetcher);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-midnight-800">Media library</h1>
          <p className="text-sm text-zinc-500 mt-1">All photography used across the public site.</p>
        </div>
        <button className="btn-primary"><Upload className="size-4" /> Upload</button>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {(data ?? []).map((g) => (
          <div key={g.id} className="group relative aspect-[4/3] overflow-hidden rounded card">
            <Image src={g.url} alt={g.alt} fill className="object-cover" sizes="240px" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end justify-between p-2 opacity-0 group-hover:opacity-100">
              <span className="text-xs text-white">{g.category}</span>
              <button aria-label="Delete" className="size-8 rounded-full bg-white/90 text-rose-600 flex items-center justify-center">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
