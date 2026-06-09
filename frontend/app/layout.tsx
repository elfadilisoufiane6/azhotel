import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope, DM_Serif_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookingBar } from "@/components/common/MobileBookingBar";
import { ScrollObserver } from "@/components/common/ScrollObserver";
import { I18nProvider } from "@/lib/i18n";
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

// Brand metadata cleared — fill these back when the new identity is in place.
export const metadata: Metadata = {
  title: { default: "", template: "%s" },
  description: "",
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  robots: { index: false, follow: false },
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
