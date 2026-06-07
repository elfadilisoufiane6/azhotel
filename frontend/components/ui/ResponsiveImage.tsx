import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "alt"> & {
  /** Desktop image path (≥ 768 px viewport) */
  desktop: string;
  /** Mobile image path (< 768 px viewport) */
  mobile: string;
  alt: string;
};

/**
 * Renders both desktop and mobile images at once, but only one is visible
 * on each viewport. Both go through Next/Image optimisation so the right
 * AVIF/WebP variant is served — only the visible one is actually downloaded
 * thanks to `display: none` + the browser's lazy heuristics combined with
 * the explicit `loading`/`fetchPriority` we set.
 */
export function ResponsiveImage({ desktop, mobile, alt, className = "", ...rest }: Props) {
  return (
    <>
      {/* Mobile (< md) */}
      <Image
        src={mobile}
        alt={alt}
        {...rest}
        className={`md:hidden ${className}`}
        sizes="(max-width: 767px) 100vw, 1px"
      />
      {/* Desktop (≥ md) */}
      <Image
        src={desktop}
        alt={alt}
        {...rest}
        className={`hidden md:block ${className}`}
        sizes="(min-width: 768px) 100vw, 1px"
      />
    </>
  );
}
