import { Metadata } from "next";
import { Hero } from "./components/home/hero";
import { Stats } from "./components/home/stats";
import { Features } from "./components/home/features";

export const metadata: Metadata = {
  title: "Prashan | Stop Wasting Your Time",
  description:
    "Prashan builds board-aligned question papers in under 3 minutes. Select your class, subject & chapters — AI does the rest. CBSE, ICSE & State Board. Free early access.",
  alternates: {
    canonical: "https://prashan.ai",
  },
  openGraph: {
    title: "Prashan | AI Question Paper Generator for Teachers",
    description:
      "Build perfectly formatted question papers in under 3 minutes. Board-aligned, print-ready, no formatting needed.",
    url: "https://prashan.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prashan — AI Question Paper Generator for Indian Teachers",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Hero />
      <Stats />
      <Features />
    </main>
  );
}
