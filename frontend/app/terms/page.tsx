import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";
import { JsonLd } from "../components/seo/json-ld";
import { FileText, Sparkles, UserCheck, Key, Award, AlertTriangle, Brain, Copyright, Shield, AlertCircle, RefreshCw, Trash2, Scale, Edit, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | Prashan - Platform Usage Terms",
  description:
    "Read the terms and conditions for using Prashan's AI question paper generator. Learn about user responsibilities, generated content ownership, and platform usage guidelines.",
  keywords: [
    "Prashan terms of service",
    "platform terms and conditions",
    "question paper generator terms",
    "user agreement India",
    "service terms education",
  ],
  alternates: {
    canonical: "https://prashan.co.in/terms",
  },
  openGraph: {
    title: "Terms and Conditions | Prashan",
    description:
      "Terms and conditions for using Prashan's AI-powered question paper generator. Understand your rights and responsibilities as a user.",
    url: "https://prashan.co.in/terms",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prashan — Terms and Conditions",
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://prashan.co.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Terms and Conditions",
      item: "https://prashan.co.in/terms",
    },
  ],
};

const legalDocumentJsonLd = {
  "@context": "https://schema.org",
  "@type": "Legislation",
  name: "Prashan Terms and Conditions",
  url: "https://prashan.co.in/terms",
  description:
    "Terms and conditions governing the use of Prashan's AI question paper generation platform for Indian educators.",
  jurisdiction: {
    "@type": "Country",
    name: "India",
  },
};

const terms = [
  {
    icon: FileText,
    title: "1. Agreement",
    content: "By using Prashan, you agree to be bound by these Terms. Discontinue use if you disagree.",
  },
  {
    icon: Sparkles,
    title: "2. Service Description",
    content: "AI-powered platform for generating board-aligned question papers for CBSE, ICSE, and State Boards.",
  },
  {
    icon: UserCheck,
    title: "3. Eligibility",
    content: "Must be 18+ with legal capacity. Must be a teacher, educator, or authorized institutional representative.",
  },
  {
    icon: Key,
    title: "4. Account Registration",
    content: "Provide accurate info, keep credentials secure, notify us of unauthorized access immediately.",
  },
  {
    icon: Award,
    title: "5. Use License",
    content: "Limited non-exclusive license for educational use. No copying, reverse engineering, or unauthorized access.",
  },
  {
    icon: AlertTriangle,
    title: "6. User Responsibilities",
    content: "Comply with laws, don't damage the platform, respect IP rights of Prashan and third parties.",
  },
  {
    icon: Brain,
    title: "7. Generated Content",
    content: "AI-generated content may have errors. You must verify accuracy and legal compliance before use.",
  },
  {
    icon: Copyright,
    title: "8. Intellectual Property",
    content: "Prashan owns all platform IP. You retain ownership of content you submit.",
  },
  {
    icon: Shield,
    title: "9. Disclaimer",
    content: "Service provided 'as is'. No warranties for accuracy, uninterrupted operation, or fitness for purpose.",
  },
  {
    icon: AlertCircle,
    title: "10. Limitation of Liability",
    content: "Max liability limited to amounts paid in past 12 months. Not liable for indirect or consequential damages.",
  },
  {
    icon: FileText,
    title: "11. Privacy & Data",
    content: "Your data handled per our Privacy Policy. Review it to understand our practices.",
  },
  {
    icon: RefreshCw,
    title: "12. Modifications",
    content: "We may modify, suspend, or discontinue parts of the service at any time without notice.",
  },
  {
    icon: Trash2,
    title: "13. Termination",
    content: "We may terminate access for breach, illegal use, or harmful conduct. You can delete your account anytime.",
  },
  {
    icon: Scale,
    title: "14. Governing Law",
    content: "Governed by Indian law. Disputes subject to exclusive jurisdiction of Indian courts.",
  },
  {
    icon: Edit,
    title: "15. Changes to Terms",
    content: "We may update these Terms. Continued use after changes constitutes acceptance.",
  },
  {
    icon: Scale,
    title: "16. Severability",
    content: "If any provision is unenforceable, it will be limited to minimum extent necessary.",
  },
  {
    icon: Mail,
    title: "17. Contact Us",
    content: "Questions? Email us at theprashanai@gmail.com",
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd, legalDocumentJsonLd]} />
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-start">
        <div className="flex-1 w-full min-h-[90vh] items-start justify-center px-4 sm:px-8 lg:px-16 pt-32 sm:pt-40 pb-20 relative z-10 overflow-hidden">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="mb-10">
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tighter text-foreground leading-[1.08]">
                Terms{" "}
                <span className="text-foreground/30 relative select-none">
                  <span className="line-through decoration-[3px] decoration-red-500/60 dark:decoration-red-400/60">
                    ignored.
                  </span>
                </span>
                <br className="hidden md:block" />
                <span className="block mt-2">Agreed.</span>
              </h1>
              <p className="mt-4 text-lg text-foreground/50 font-medium">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {terms.map((term, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl p-6 flex flex-col gap-4 
                    bg-white/30 dark:bg-white/[0.04]
                    backdrop-blur-xl
                    border border-white/50 dark:border-white/10
                    shadow-[0px_1px_0.5px_rgba(0,0,0,0),0px_4.4px_2.2px_rgba(0,0,0,0.01),0px_11.7px_5.9px_rgba(0,0,0,0.02)]
                    dark:shadow-[0px_4.4px_2.2px_rgba(0,0,0,0.06),0px_11.7px_5.9px_rgba(0,0,0,0.10)]
                    hover:bg-white/40 dark:hover:bg-white/[0.06]
                    hover:border-white/60 dark:hover:border-white/15
                    transition-all duration-300
                    h-fit"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center
                      bg-white dark:bg-white/10
                      border border-black/8 dark:border-white/10
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_4px_rgba(0,0,0,0.06)]
                      text-foreground/60
                      group-hover:text-foreground/80 transition-colors"
                  >
                    <term.icon size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground tracking-tight mb-2">
                      {term.title}
                    </h3>
                    <p className="text-sm text-foreground/55 font-medium leading-relaxed">
                      {term.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-foreground/50">
                Questions?{" "}
                <Link
                  href="mailto:theprashanai@gmail.com"
                  className="text-foreground font-medium hover:underline"
                >
                  theprashanai@gmail.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}