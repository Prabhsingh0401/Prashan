import type { Metadata } from "next";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Preloader } from "./components/global/preloader";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "./components/seo/json-ld";
import "./globals.css";

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────
  metadataBase: new URL("https://prashan.co.in"),
  title: {
    default: "Prashan | AI Question Paper Generator for Teachers",
    template: "%s | Prashan",
  },
  description:
    "Prashan helps teachers create perfectly formatted, board-aligned question papers in under 3 minutes. No formatting, no prompting, no stress. CBSE, ICSE & State Board ready.",

  // ── Robots ─────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Discovery ─────────────────────────────────────────────────────────
  keywords: [
    "question paper generator",
    "AI question paper",
    "teacher tool India",
    "CBSE question paper",
    "ICSE exam paper",
    "exam paper generator",
    "automated question paper",
    "school exam tool",
    "prashan",
    "प्रशन",
  ],
  authors: [{ name: "Prashan", url: "https://prashan.co.in" }],
  creator: "Prashan",
  publisher: "Prashan",

  // ── Icons ─────────────────────────────────────────────────────────────
  icons: {
    icon: [{ url: "/tab_logo_prashan.png", type: "image/png" }],
    apple: "/tab_logo_prashan.png",
    shortcut: "/tab_logo_prashan.png",
  },

  // ── Web manifest ──────────────────────────────────────────────────────
  manifest: "/manifest.webmanifest",

  // ── OpenGraph ─────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://prashan.co.in",
    siteName: "Prashan",
    title: "Prashan | AI Question Paper Generator for Teachers",
    description:
      "Create perfectly formatted question papers in under 3 minutes. Board-aligned, print-ready, zero effort.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prashan — AI Question Paper Generator",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@prashan_ai",
    creator: "@prashan_ai",
    title: "Prashan | AI Question Paper Generator for Teachers",
    description:
      "Create perfectly formatted question papers in under 3 minutes. Board-aligned, print-ready, zero effort.",
    images: ["/og-image.png"],
  },

  // ── App / PWA hints ───────────────────────────────────────────────────
  applicationName: "Prashan",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Prashan",
  },
  formatDetection: {
    telephone: false,
  },

  // ── AI Search Optimization ─────────────────────────────────────────────
  other: {
    "ai-content-type": "educational-content",
    "ai-target-audience": "teachers, educators, schools, india",
    "geo.region": "IN",
    "geo.placename": "India",
    "article:published_time": "2024-01-01",
    "article:modified_time": new Date().toISOString(),
  },
};

const baseJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Prashan",
    url: "https://prashan.co.in",
    logo: "https://prashan.co.in/prashan_logo.svg",
    description:
      "Prashan is an AI-powered question paper generator designed for Indian teachers. It creates board-aligned, print-ready exam papers in under 3 minutes, supporting CBSE, ICSE, and State Boards.",
    sameAs: ["https://github.com/PrashanAI", "https://x.com/Prashan364660"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@prashan.co.in",
      contactType: "customer support",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Prashan",
    applicationCategory: "EducationApplication",
    operatingSystem: "Web Browser",
    url: "https://prashan.co.in",
    description:
      "AI-powered question paper generator for Indian teachers. Creates board-aligned exam papers in under 3 minutes for CBSE, ICSE, and State Boards.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Free during early access",
    },
    provider: {
      "@type": "Organization",
      name: "Prashan",
      url: "https://prashan.co.in",
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans scrollbar-thin">
        <JsonLd data={baseJsonLd} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <div className="relative flex min-h-screen w-full flex-col dark:bg-black bg-cover bg-center bg-fixed">
            <div className="min-h-screen z-10 w-full relative">{children}</div>
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
