import { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "./components/global/navbar";
import Footer from "./components/global/footer";
import { Hero } from "./components/home/hero";
import { LazySection } from "./components/common/LazySection";
import { JsonLd } from "./components/seo/json-ld";

const Stats = dynamic(() => import("./components/home/stats").then((m) => m.Stats));
const Features = dynamic(() => import("./components/home/features").then((m) => m.Features));
const FAQ = dynamic(() => import("./components/home/faq").then((m) => m.FAQ));

export const metadata: Metadata = {
  title: "Prashan | AI Question Paper Generator for Indian Teachers",
  description:
    "Prashan is an AI-powered question paper generator that helps Indian teachers create board-aligned, professionally formatted exam papers in under 3 minutes. Supports CBSE, ICSE, and State Boards. Free early access.",
  keywords: [
    "AI question paper generator",
    "automatic exam paper maker",
    "CBSE question paper generator",
    "ICSE exam paper creator",
    "teacher exam tool India",
    "school paper generator",
    "board exam paper maker",
    "question paper software",
    "automated test paper",
    "Prashan exam generator",
  ],
  alternates: {
    canonical: "https://prashan.co.in",
  },
  openGraph: {
    title: "Prashan | AI Question Paper Generator for Teachers",
    description:
      "Build perfectly formatted question papers in under 3 minutes. Board-aligned, print-ready, no formatting needed. Free for Indian teachers.",
    url: "https://prashan.co.in",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prashan — AI Question Paper Generator for Indian Teachers",
      },
    ],
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Prashan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prashan is an AI-powered question paper generator for Indian teachers. Create board-aligned, professionally formatted exam papers in under 3 minutes for CBSE, ICSE, and State Boards.",
      },
    },
    {
      "@type": "Question",
      name: "Which boards are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prashan supports CBSE, ICSE, and all major State Boards. Questions are automatically mapped to specific board curricula for classes 1-12.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generate a complete, formatted question paper in under 3 minutes — from selecting chapters to final export.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, free during early access. No credit card required. Start creating question papers at no cost.",
      },
    },
    {
      "@type": "Question",
      name: "What formats can I export?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Export as print-ready PDF or editable Word document. All formatting is handled automatically.",
      },
    },
  ],
};

// HowTo JSON-LD Schema
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create a Question Paper with Prashan",
  description:
    "Create a board-aligned, professionally formatted question paper in under 3 minutes using Prashan's AI-powered generator.",
  step: [
    {
      "@type": "HowToStep",
      name: "Select Class, Subject & Chapters",
      position: 1,
      text: "Choose your class (e.g., Class X), select the subject (e.g., Mathematics), and pick the chapters you want to include in the exam. Prashan supports all classes from 1 to 12.",
    },
    {
      "@type": "HowToStep",
      name: "Configure Question Types & Weightage",
      position: 2,
      text: "Set up question types (MCQ, Short Answer, Long Answer), specify the number of questions for each type, and define marks per question. Total marks are calculated automatically.",
    },
    {
      "@type": "HowToStep",
      name: "Set Up Paper Header",
      position: 3,
      text: "Add your school name, exam name, class, subject, and time/duration. Customize the paper branding to match your institution's format with school logo support.",
    },
    {
      "@type": "HowToStep",
      name: "Let AI Generate & Format",
      position: 4,
      text: "Prashan's AI generates questions scoped to your selected board and chapters. Questions are automatically formatted with proper spacing, numbering, and sections using LaTeX.",
    },
    {
      "@type": "HowToStep",
      name: "Review & Edit",
      position: 5,
      text: "Review all generated questions in the live editor. Make any adjustments needed before finalizing the paper. All edits are reflected instantly.",
    },
    {
      "@type": "HowToStep",
      name: "Export Paper",
      position: 6,
      text: "Export your question paper as a print-ready PDF or editable Word document with one click. Files are formatted for professional printing.",
    },
  ],
  totalTime: "PT3M",
};

export default function Home() {
  return (
    <>
      <head>
        <JsonLd data={[faqJsonLd, howToJsonLd]} />
      </head>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <div className="flex-1">
          <Hero />
          <LazySection>
            <Stats />
          </LazySection>
          <LazySection delay={100}>
            <Features />
          </LazySection>
          <LazySection delay={200}>
            <FAQ />
          </LazySection>
        </div>
      </main>
      <Footer />
    </>
  );
}
