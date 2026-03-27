import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow AI search bots for citation indexing
        userAgent: [
          "GPTBot",           // ChatGPT
          "ChatGPT-User",     // ChatGPT
          "PerplexityBot",    // Perplexity
          "ClaudeBot",        // Claude
          "anthropic-ai",     // Claude
          "Google-Extended",  // Google AI Overviews (Gemini)
          "Googlebot",        // Google
          "*",               // All others
        ],
        allow: "/",
        disallow: ["/dashboard", "/api/"],
      },
    ],
    sitemap: "https://prashan.co.in/sitemap.xml",
  };
}
