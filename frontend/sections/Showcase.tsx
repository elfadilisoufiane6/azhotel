import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

/**
 * Full-bleed cinematic showcase. Each Showcase has its own desktop & mobile image.
 * No framer-motion: text reveal is pure `.animate-fade-up` CSS with staggered
 * delays, so the section is server-renderable and costs zero JS at runtime.
 */
export function Showcase({
  id,
  desktop,
  mobile,
  eyebrow,
  title1,
  title2,
  body,
  href,
  cta,
  align = "left",
  variant = "dark",
}: {
  id: string;
  desktop: string;
  mobile: string;
  eyebrow: string;
  title1: string;
  title2: string;
  body: string;
  href: string;
  cta: string;
  align?: "left" | "right";
  variant?: "dark" | "light";
}) {
  return (
    <section id={id} className="relative min-h-[72svh] md:min-h-[100svh] overflow-hidden bg-brand-900">
      <div className="absolute inset-0">
        <ResponsiveImage
          desktop={desktop}
          mobile={mobile}
          alt=""
          fill loading="lazy"
          className="object-cover"
        />
      </div>
      <div className={`absolute inset-0 ${variant === "dark" ? "bg-brand-900/55" : "bg-brand-900/30"}`} />

      <div className="relative container min-h-[72svh] md:min-h-[100svh] flex items-center py-20 md:py-32">
        <div className={`max-w-2xl ${align === "right" ? "md:ml-auto md:text-right" : ""}`}>
          <span
            className={`inline-flex items-center gap-3 subtitle-light animate-fade-up ${align === "right" ? "md:flex-row-reverse" : ""}`}
          >
            <span className="block h-px w-7 bg-brand-200/70" />
            {eyebrow}
          </span>

          <h2
            className="mt-5 md:mt-6 font-display text-snow animate-fade-up"
            style={{
              fontWeight: 500,
              fontSize: "clamp(2.25rem, 7vw, 5.75rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              animationDelay: "120ms",
            }}
          >
            {title1}
            <br />
            <em className="text-brand-200" style={{ fontFamily: "var(--font-editorial)", fontWeight: 400 }}>
              {title2}
            </em>
          </h2>

          <p
            className="mt-4 md:mt-8 max-w-md text-snow/85 leading-relaxed text-[13px] md:text-base animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            {body}
          </p>

          <div
            className={`mt-8 md:mt-10 inline-flex animate-fade-up ${align === "right" ? "md:ml-auto" : ""}`}
            style={{ animationDelay: "360ms" }}
          >
            <Link
              href={href}
              className="group inline-flex items-center gap-3 text-snow border-b border-brand-200/60 pb-1 smallcaps tracking-[0.32em] text-[11px] md:text-sm hover:text-brand-200 hover:border-brand-200 transition-colors"
            >
              {cta}
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-12" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
