"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment, type ReactNode } from "react";

const container: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.25 },
  },
};

const word: Variants = {
  hidden: { y: "115%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.25, ease: [0.19, 1, 0.22, 1] },
  },
};

/**
 * Cinematic word-by-word reveal — each word slides up from a clipped mask.
 * Used for hero/headline animation. Pass an array of strings to render each
 * on its own line; pass `accent` to italicize the second line.
 */
export function SplitText({
  lines,
  accentLine,
  className = "",
}: {
  lines: string[];
  accentLine?: number;
  className?: string;
}) {
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((w, wi) => (
            <Fragment key={`${li}-${wi}`}>
              <span className="word-mask" aria-hidden>
                <motion.span
                  variants={word}
                  className={li === accentLine ? "italic text-brand-200" : ""}
                  style={li === accentLine ? { fontFamily: "var(--font-editorial)", fontWeight: 400 } : undefined}
                >
                  {w}
                </motion.span>
              </span>{" "}
            </Fragment>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
