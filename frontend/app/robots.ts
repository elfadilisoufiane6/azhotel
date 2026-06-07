import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*",                allow: "/",      disallow: ["/api/", "/auth/", "/account/"] },
      { userAgent: "GPTBot",           disallow: "/" },
      { userAgent: "CCBot",            disallow: "/" },
      { userAgent: "Google-Extended",  disallow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
