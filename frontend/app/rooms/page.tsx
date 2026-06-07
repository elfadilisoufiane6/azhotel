import type { Metadata } from "next";
import { site } from "@/lib/site";
import { RoomsClient } from "./RoomsClient";

export const metadata: Metadata = {
  title: "Chambres & Suites",
  description:
    "Vingt-quatre chambres finies à la main, parquet, marbre, blackout et amenities argan AZ — à partir de 883 MAD la nuit, petit-déjeuner inclus.",
  openGraph: {
    type: "website",
    url: `${site.url}/rooms`,
    siteName: site.name,
    title: `Chambres & Suites · ${site.name}`,
    description:
      "Vingt-quatre chambres finies à la main au cœur de Rabat. À partir de 883 MAD la nuit.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: site.name }],
  },
  alternates: { canonical: `${site.url}/rooms` },
};

export default function RoomsPage() {
  return <RoomsClient />;
}
