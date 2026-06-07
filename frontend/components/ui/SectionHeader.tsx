import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignCls =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  return (
    <Reveal>
      <div className={cn("max-w-3xl flex flex-col gap-5", alignCls, className)}>
        {eyebrow && (
          <span className={align === "center" ? "eyebrow" : "eyebrow-left"}>
            {eyebrow}
          </span>
        )}
        <h2 className="section-title text-balance">{title}</h2>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </Reveal>
  );
}
