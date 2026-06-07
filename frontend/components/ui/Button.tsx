import Link from "next/link";
import { cn } from "@/lib/cn";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "dark";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  ghost:   "btn-ghost",
  dark:    "btn-dark",
};

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };

export function Button({
  variant = "primary",
  className,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(variants[variant], className)} {...props} />;
}

export function LinkButton({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: CommonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href} className={cn(variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
