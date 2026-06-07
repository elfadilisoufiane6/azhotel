"use client";

import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/api";
import { Plus } from "lucide-react";

type Post = {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
};

export default function BlogAdminPage() {
  const { data } = useSWR<Post[]>("/blog", fetcher);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-midnight-800">Blog</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage The Journal — drafts, schedule, and categories.</p>
        </div>
        <Link href="/blog/new" className="btn-primary"><Plus className="size-4" /> New post</Link>
      </header>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-zinc-600">
            <tr>
              {["Title", "Category", "Author", "Published"].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-medium text-xs uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {(data ?? []).map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50/50">
                <td className="px-4 py-3">
                  <Link href={`/blog/${p.slug}`} className="font-medium text-midnight-800 hover:text-gold-500">{p.title}</Link>
                  <div className="text-xs text-zinc-500 font-mono">/{p.slug}</div>
                </td>
                <td className="px-4 py-3 text-zinc-700">{p.category}</td>
                <td className="px-4 py-3 text-zinc-700">{p.author}</td>
                <td className="px-4 py-3 text-zinc-700">{new Date(p.publishedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
