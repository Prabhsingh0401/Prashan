import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  turbopack: {},

  // Faster TypeScript builds
  typescript: {
    ignoreBuildErrors: false,
  },

  // Reduce unnecessary source maps in production
  productionBrowserSourceMaps: false,

  // Experimental optimizations
  experimental: {
    optimizePackageImports: [
      "lodash",
      "lucide-react",
      "@heroicons/react",
      "date-fns",
    ],
  },

  // Webpack optimization
  webpack: (config, { dev }) => {
    // Disable expensive persistent cache if causing slowdown
    if (dev) {
      config.cache = {
        type: "memory",
      };
    }

    return config;
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,

    // Prevent excessive image processing in dev
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;