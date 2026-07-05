import type { MetadataRoute } from "next";

const SITE_URL = "https://www.yerbasdelabuena.com.ar";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/cuenta"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
