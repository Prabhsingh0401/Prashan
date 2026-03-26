import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/terms", "/privacy"],
        disallow: ["/dashboard", "/api/"],
      },
    ],
    sitemap: "https://prashan.co.in/sitemap.xml",
    host: "https://prashan.co.in",
  };
}
