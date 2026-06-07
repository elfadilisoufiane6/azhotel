/** @type {import('next').NextConfig} */
// Set NEXT_EXPORT=1 to build a static site (for Netlify / static hosts).
// Leave unset for local SSR dev (npm run dev) or VPS SSR (npm run start).
const isStaticExport = process.env.NEXT_EXPORT === "1";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  ...(isStaticExport ? { output: "export", trailingSlash: true } : {}),
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    // Static export can't run the Next image optimizer.
    unoptimized: isStaticExport,
    // Next will serve AVIF then WebP, falling back to JPEG
    formats: ["image/avif", "image/webp"],
    // Smaller device sizes = smaller served images on phones
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 192, 256, 384],
    // Cache optimized images for one year
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Long-lived caching for every static asset Next can't fingerprint itself.
        source: "/:path((?:images|brand|flags|fonts|videos|textures|icons).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
