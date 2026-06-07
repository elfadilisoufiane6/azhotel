import type { Metadata } from "next";
import { site } from "@/lib/site";
import { BookingClient } from "./BookingClient";

export const metadata: Metadata = {
  title: "Réserver votre séjour",
  description:
    "Réservez en direct sur AZ Hôtel des Arts — meilleur tarif garanti, annulation gratuite, petit-déjeuner pour deux inclus. Équipe réception 24h/24.",
  openGraph: {
    type: "website",
    url: `${site.url}/booking`,
    siteName: site.name,
    title: `Réserver · ${site.name}`,
    description:
      "Meilleur tarif garanti, annulation gratuite, petit-déjeuner inclus.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: site.name }],
  },
  alternates: { canonical: `${site.url}/booking` },
};

export default function BookingPage() {
  return <BookingClient />;
}
