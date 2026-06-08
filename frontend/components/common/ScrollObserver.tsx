"use client";

import { useEffect } from "react";

/**
 * Single global IntersectionObserver that lights up any element with
 * className `reveal` once it scrolls into view. Far cheaper than 30
 * framer-motion `whileInView` instances — same Aman/Cheval Blanc feel.
 *
 * Usage in JSX:
 *   <div className="reveal">…</div>
 *   <div className="reveal" style={{ transitionDelay: "120ms" }}>…</div>
 */
export function ScrollObserver() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    // Respect users on prefers-reduced-motion — reveal everything instantly.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    const targets = document.querySelectorAll(".reveal:not(.is-visible)");
    targets.forEach((el) => io.observe(el));

    // Late-mounting client components: re-scan once after hydration settles.
    const t = setTimeout(() => {
      document
        .querySelectorAll(".reveal:not(.is-visible)")
        .forEach((el) => io.observe(el));
    }, 200);

    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);

  return null;
}
