import type { Metadata } from "next";
import Navbar from "./components/global/navbar";
import Footer from "./components/global/footer";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Preloader } from "./components/global/preloader";
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

  // ── Canonical & robots ────────────────────────────────────────────────
  alternates: {
    canonical: "/",
  },
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
    icon: [
      { url: "/prashan_logo.svg", type: "image/svg+xml" },
    ],
    apple: "/prashan_logo.svg",
    shortcut: "/prashan_logo.svg",
  },

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <div className="relative flex min-h-screen w-full flex-col dark:bg-[url('/backgroundGradientDark.svg')] bg-cover bg-center bg-fixed dark:after:absolute dark:after:inset-0 dark:after:bg-black/60 after:pointer-events-none">
            <Navbar />
            <div className="min-h-screen z-10 w-full relative">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
