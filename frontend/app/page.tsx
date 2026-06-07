import type { Metadata } from "next";
import { site } from "@/lib/site";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: `${site.name} — Hôtel boutique à Rabat`,
  description:
    "AZ Hôtel des Arts — vingt-quatre chambres finies à la main au cœur de Rabat, cuisine marocaine et internationale, équipe 24h/24. Réservez en direct.",
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Hôtel boutique à Rabat`,
    description:
      "Vingt-quatre chambres finies à la main au cœur de Rabat. Réservez en direct, économisez 15 %.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: site.name }],
  },
  alternates: { canonical: site.url },
};

export default function HomePage() {
  return <HomeClient />;
}
