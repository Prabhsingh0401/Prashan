import { Metadata } from "next";
import { Hero } from "./components/home/hero";

export const metadata: Metadata = {
  title: "Prashan | The Ultimate Paper Generator",
  description: "Pro-level formatting and intelligent curriculum mapping. Designed radically for teachers who want their time back.",
  openGraph: {
    title: "Prashan | The Ultimate Paper Generator",
    description: "Pro-level formatting and intelligent curriculum mapping. Designed radically for teachers who want their time back.",
    url: "https://prashan.ai",
    siteName: "Prashan",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prashan UI Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashan | The Ultimate Paper Generator",
    description: "Pro-level formatting and intelligent curriculum mapping. Designed radically for teachers who want their time back.",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Hero />
    </main>
  );
}
