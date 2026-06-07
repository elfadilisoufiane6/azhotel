"use client";

import { useState } from "react";
import { api } from "@/lib/api";

type RoomDraft = {
  slug: string;
  name: string;
  category: "single" | "twin" | "double" | "suite";
  shortDescription: string;
  description: string;
  basePrice: number;
  sizeSqm: number;
  maxGuests: number;
  beds: string;
};

export function RoomForm({ initial }: { initial?: Partial<RoomDraft> }) {
  const [data, setData]    = useState<Partial<RoomDraft>>(initial ?? { category: "double", maxGuests: 2 });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await api("/rooms", { method: "POST", body: JSON.stringify(data) });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="card card-pad space-y-5 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" value={data.name} onChange={(v) => setData((d) => ({ ...d, name: v }))} />
        <Field label="Slug" value={data.slug} onChange={(v) => setData((d) => ({ ...d, slug: v }))} />
        <Field label="Beds" value={data.beds} onChange={(v) => setData((d) => ({ ...d, beds: v }))} />
        <Field label="Category" value={data.category}
               onChange={(v) => setData((d) => ({ ...d, category: v as RoomDraft["category"] }))} />
        <Field label="Base price (MAD)" type="number" value={data.basePrice}
               onChange={(v) => setData((d) => ({ ...d, basePrice: Number(v) }))} />
        <Field label="Size (m²)" type="number" value={data.sizeSqm}
               onChange={(v) => setData((d) => ({ ...d, sizeSqm: Number(v) }))} />
        <Field label="Max guests" type="number" value={data.maxGuests}
               onChange={(v) => setData((d) => ({ ...d, maxGuests: Number(v) }))} />
      </div>

      <TextArea label="Short description" value={data.shortDescription}
                onChange={(v) => setData((d) => ({ ...d, shortDescription: v }))} />
      <TextArea label="Long description" rows={6} value={data.description}
                onChange={(v) => setData((d) => ({ ...d, description: v }))} />

      <div className="flex items-center justify-between">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Saving…" : "Save room"}
        </button>
        {error && <span className="text-xs text-rose-600">{error}</span>}
      </div>
    </form>
  );
}

function Field({
  label, value, onChange, type = "text",
}: { label: string; value?: string | number; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-zinc-500">{label}</span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:border-gold-400"
      />
    </label>
  );
}

function TextArea({
  label, value, onChange, rows = 3,
}: { label: string; value?: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-zinc-500">{label}</span>
      <textarea
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:border-gold-400"
      />
    </label>
  );
}
