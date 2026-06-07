import type { Metadata } from "next";
import { site } from "@/lib/site";
import { GalleryClient } from "./GalleryClient";

export const metadata: Metadata = {
  title: "Galerie photo",
  description:
    "Les chambres, le restaurant The Atelier, le lobby et la ville qui nous entoure — photographiés aux heures que nous préférons.",
  openGraph: {
    type: "website",
    url: `${site.url}/gallery`,
    siteName: site.name,
    title: `Galerie photo · ${site.name}`,
    description:
      "Les chambres, le restaurant, le lobby et la ville — en lumière naturelle.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: site.name }],
  },
  alternates: { canonical: `${site.url}/gallery` },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
