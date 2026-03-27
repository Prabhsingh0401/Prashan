import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";
import { JsonLd } from "../components/seo/json-ld";
import { Shield, Lock, Eye, Database, Cookie, Globe, Users, Building2, Bell, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Prashan - How We Protect Your Data",
  description:
    "Prashan's privacy policy explains how we collect, use, and protect your personal information. We use Google Authentication for secure sign-in and never sell your data to third parties.",
  keywords: [
    "Prashan privacy policy",
    "data protection policy",
    "user privacy India",
    "Google authentication privacy",
    "educational data protection",
  ],
  alternates: {
    canonical: "https://prashan.co.in/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Prashan",
    description:
      "Learn how Prashan protects your privacy. Our policy covers data collection, Google Authentication, and your rights regarding personal information.",
    url: "https://prashan.co.in/privacy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prashan — Privacy Policy",
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
      name: "Privacy Policy",
      item: "https://prashan.co.in/privacy",
    },
  ],
};

const legalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Prashan Privacy Policy",
  url: "https://prashan.co.in/privacy",
  description:
    "Privacy policy for Prashan AI-powered question paper generator. Information about data collection, usage, security, and user rights.",
  jurisdiction: {
    "@type": "Country",
    name: "India",
  },
};

const policies = [
  {
    icon: Database,
    title: "1. Information We Collect",
    content: "We collect account data from Google Sign-In, usage information, and your question paper configurations.",
  },
  {
    icon: Shield,
    title: "2. How We Use Your Information",
    content: "Used solely for account management, question paper creation, security, and communication. We never sell your data.",
  },
  {
    icon: Lock,
    title: "3. Data Security",
    content: "Google API compliant. Industry-standard encryption and regular security audits protect your data.",
  },
  {
    icon: Eye,
    title: "4. Your Rights",
    content: "Access, correction, deletion, portability, and objection rights. Contact theprashanai@gmail.com to exercise.",
  },
  {
    icon: Cookie,
    title: "5. Cookies & Tracking",
    content: "Essential cookies only for session and authentication. No advertising cookies or marketing tracking.",
  },
  {
    icon: Globe,
    title: "6. Third-Party Services",
    content: "Firebase (Google), Vercel hosting, and secure AI services. Each has their own privacy policies.",
  },
  {
    icon: Users,
    title: "7. Children's Privacy",
    content: "Service for teachers 18+. We don't knowingly collect data from children.",
  },
  {
    icon: Building2,
    title: "8. International Transfers",
    content: "Data may transfer across countries with appropriate safeguards per applicable laws.",
  },
  {
    icon: Bell,
    title: "9. Policy Updates",
    content: "We may update this policy periodically. Check the 'Last updated' date for changes.",
  },
  {
    icon: Mail,
    title: "10. Contact Us",
    content: "Questions? Reach us at theprashanai@gmail.com or visit prashan.co.in",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd, legalServiceJsonLd]} />
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-start">
        <div className="flex-1 w-full min-h-[90vh] items-start justify-center px-4 sm:px-8 lg:px-16 pt-32 sm:pt-40 pb-20 relative z-10 overflow-hidden">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="mb-10">
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tighter text-foreground leading-[1.08]">
                Privacy{" "}
                <span className="text-foreground/30 relative select-none">
                  <span className="line-through decoration-[3px] decoration-red-500/60 dark:decoration-red-400/60">
                    matters.
                  </span>
                </span>
                <br className="hidden md:block" />
                <span className="block mt-2">Policy.</span>
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
              {policies.map((policy, index) => (
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
                    <policy.icon size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground tracking-tight mb-2">
                      {policy.title}
                    </h3>
                    <p className="text-sm text-foreground/55 font-medium leading-relaxed">
                      {policy.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-foreground/50">
                For detailed information, contact{" "}
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