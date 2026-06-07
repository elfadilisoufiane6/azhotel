import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { rooms } from "@/lib/content/rooms";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const routes = ["", "/rooms", "/gallery", "/booking"];
  const now = new Date();
  return [
    ...routes.map((r) => ({
      url: `${base}${r}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1.0 : 0.8,
    })),
    ...rooms.map((r) => ({
      url: `${base}/rooms/${r.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
