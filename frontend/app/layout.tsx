import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope, DM_Serif_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookingBar } from "@/components/common/MobileBookingBar";
import { ScrollObserver } from "@/components/common/ScrollObserver";
import { StructuredData } from "@/components/common/StructuredData";
import { I18nProvider } from "@/lib/i18n";
import { site } from "@/lib/site";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  // 3 weights × 2 styles = 6 font files. We only render headings at 400/500/700.
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const editorial = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  // Drop the rare weights (200, 300, 800) — body text only uses 400/500/600/700.
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Boutique Luxury Hotel in Rabat`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/og-image.svg"] },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)",  color: "#0A1934" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${editorial.variable} ${sans.variable}`}>
      <body>
        <I18nProvider>
          <StructuredData />
          <ScrollObserver />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileBookingBar />
        </I18nProvider>
      </body>
    </html>
  );
}
