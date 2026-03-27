import type { Metadata } from "next";

const BASE_URL = "https://prashan.co.in";

// Organization Schema - Establishes brand authority
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Prashan",
  url: BASE_URL,
  logo: `${BASE_URL}/prashan_logo.svg`,
  description:
    "Prashan is an AI-powered question paper generator designed for Indian teachers. It creates board-aligned, print-ready exam papers in under 3 minutes, supporting CBSE, ICSE, and State Boards.",
  sameAs: [
    "https://github.com/PrashanAI",
    "https://x.com/Prashan364660",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@prashan.co.in",
    contactType: "customer support",
  },
};

// Software Application Schema - For AI and search engines
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Prashan",
  applicationCategory: "EducationApplication",
  operatingSystem: "Web Browser",
  url: BASE_URL,
  description:
    "AI-powered question paper generator for Indian teachers. Creates board-aligned exam papers in under 3 minutes for CBSE, ICSE, and State Boards.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Free during early access",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  provider: {
    "@type": "Organization",
    name: "Prashan",
    url: BASE_URL,
  },
};

// FAQ Schema - High-value for AI citations
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Prashan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prashan is an AI-powered question paper generator designed specifically for Indian teachers. It creates board-aligned, professionally formatted exam papers in under 3 minutes, supporting CBSE, ICSE, and State Boards.",
      },
    },
    {
      "@type": "Question",
      name: "How does Prashan generate question papers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Teachers select their class, subject, and chapters. They configure question types, counts, and weightage. Prashan's AI then generates questions scoped to the selected curriculum and formats them automatically using LaTeX for professional print-ready output.",
      },
    },
    {
      "@type": "Question",
      name: "Which educational boards does Prashan support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prashan supports all major Indian educational boards including CBSE (Central Board of Secondary Education), ICSE (Indian Certificate of Secondary Education), and all State Boards. Questions are automatically mapped to specific board curricula and difficulty levels.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to create a question paper with Prashan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prashan generates a complete, formatted question paper in under 3 minutes. This includes selecting class/subject/chapters, configuring question types and marks, setting up the paper header, and AI generation with automatic LaTeX formatting.",
      },
    },
    {
      "@type": "Question",
      name: "What file formats can I export from Prashan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prashan allows teachers to export question papers as print-ready PDF or editable Word documents. The AI handles all formatting automatically, ensuring correct spacing, numbering, and sections for professional print output.",
      },
    },
    {
      "@type": "Question",
      name: "Is Prashan free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prashan is currently free during early access. Teachers can join the waitlist to get early access. No credit card is required, and users can unsubscribe anytime.",
      },
    },
    {
      "@type": "Question",
      name: "What question types does Prashan support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prashan supports multiple question types including MCQ (Multiple Choice Questions), Short Answer questions, Long Answer questions, and custom types. Teachers can configure the count and marks for each type to match their exam requirements.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate are Prashan's AI-generated questions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prashan uses advanced AI models trained on Indian educational curricula to generate accurate, board-aligned questions. Questions are automatically scoped to specific chapters, difficulty levels, and marking schemes. Teachers can review and edit all generated content before exporting.",
      },
    },
  ],
};

// BreadcrumbList Schema for navigation context
const breadcrumbSchema = (path: string, title: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: title,
      item: `${BASE_URL}${path}`,
    },
  ],
});

// HowTo Schema for step-by-step process
const howToSchema = {
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
      text: "Choose your class (e.g., Class X), select the subject (e.g., Mathematics), and pick the chapters you want to include in the exam.",
    },
    {
      "@type": "HowToStep",
      name: "Configure Question Types & Weightage",
      position: 2,
      text: "Set up question types (MCQ, Short Answer, Long Answer), specify the number of questions for each type, and define marks per question.",
    },
    {
      "@type": "HowToStep",
      name: "Set Up Paper Header",
      position: 3,
      text: "Add your school name, exam name, class, subject, and time/duration. Customize the paper branding to match your institution's format.",
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
      text: "Review all generated questions in the live editor. Make any adjustments needed before finalizing the paper.",
    },
    {
      "@type": "HowToStep",
      name: "Export Paper",
      position: 6,
      text: "Export your question paper as a print-ready PDF or editable Word document with one click.",
    },
  ],
  totalTime: "PT3M",
};

// Service Schema
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Question Paper Generation",
  description:
    "Automated question paper generation service for Indian schools. Creates CBSE, ICSE, and State Board aligned exam papers with professional formatting.",
  provider: {
    "@type": "Organization",
    name: "Prashan",
    url: BASE_URL,
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  serviceType: "Education Technology",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

export const jsonLdSchemas = {
  organization: organizationSchema,
  software: softwareSchema,
  faq: faqSchema,
  howTo: howToSchema,
  service: serviceSchema,
  breadcrumb: breadcrumbSchema,
};

export function generateJsonLd(schemaType: keyof typeof jsonLdSchemas, path?: string, title?: string) {
  const schemas = {
    organization: () => jsonLdSchemas.organization,
    software: () => jsonLdSchemas.software,
    faq: () => jsonLdSchemas.faq,
    howTo: () => jsonLdSchemas.howTo,
    service: () => jsonLdSchemas.service,
    breadcrumb: () =>
      jsonLdSchemas.breadcrumb(path || "/", title || "Page"),
  };

  return schemas[schemaType]();
}

export function generateAllJsonLd(schemaTypes: (keyof typeof jsonLdSchemas)[]) {
  return schemaTypes.map((type) => {
    if (type === "breadcrumb") {
      return jsonLdSchemas.breadcrumb("/", "Home");
    }
    return jsonLdSchemas[type];
  });
}
