"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { Star } from "lucide-react";

type Review = {
  id: string;
  name: string;
  country: string;
  score: number;
  title: string;
  body: string;
  createdAt: string;
};

export default function ReviewsPage() {
  const { data, isLoading } = useSWR<Review[]>("/reviews", fetcher);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-midnight-800">Reviews</h1>
        <p className="text-sm text-zinc-500 mt-1">Moderate guest reviews — publish, reply, or remove.</p>
      </header>

      {isLoading ? (
        <p className="text-zinc-500">Loading…</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {(data ?? []).map((r) => (
            <article key={r.id} className="card card-pad">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-zinc-500">{r.country}</p>
                </div>
                <div className="flex items-center gap-1 text-gold-500">
                  <Star className="size-3.5 fill-current" />
                  <span className="text-sm font-medium">{r.score?.toFixed?.(1) ?? r.score}</span>
                </div>
              </div>
              {r.title && <h3 className="mt-3 font-display text-lg">{r.title}</h3>}
              <p className="mt-2 text-sm text-zinc-700">{r.body}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  <button className="btn-ghost text-xs">Reply</button>
                  <button className="btn-ghost text-xs">Remove</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
