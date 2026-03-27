import { Metadata } from "next";
import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";
import { JsonLd } from "../components/seo/json-ld";

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

export default function TermsPage() {
  return (
    <>
      <head>
        <JsonLd data={[breadcrumbJsonLd, legalDocumentJsonLd]} />
      </head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-start">
        <div className="flex-1 flex min-h-[90vh] w-full items-start justify-center px-4 sm:px-8 lg:px-16 pt-32 sm:pt-40 pb-20 relative z-10 overflow-hidden">
          
          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-start relative z-10">
            
            {/* Left Column: Title (sticky on desktop) */}
            <div className="md:col-span-5 flex flex-col justify-start md:sticky md:top-40">
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[6rem] font-bold tracking-tighter text-foreground leading-[1.08] pr-4">
                Terms <span className="text-foreground/30 relative select-none">
                  <span className="line-through decoration-[3px] decoration-red-500/60 dark:decoration-red-400/60">ignored.</span>
                </span>
                <br className="hidden md:block" />
                <span className="block mt-2">Agreed.</span>
              </h1>
              <p className="mt-6 text-lg text-foreground/50 font-medium">
                Last updated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>

            {/* Right Column: Content */}
            <div className="md:col-span-7 flex flex-col space-y-8 md:space-y-10 text-lg sm:text-xl text-foreground/75 font-medium leading-relaxed max-w-3xl">
              
              <div>
                <strong className="text-foreground text-2xl block mb-4">1. Agreement to Terms</strong>
                <p className="mb-4">
                  By accessing or using Prashan ("the Service"), you agree to be strictly bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you must discontinue use of the Service immediately.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you and Prashan ("we," "us," or "our") governing your access to and use of our AI-powered question paper generation platform.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">2. Description of Service</strong>
                <p className="mb-4">
                  Prashan provides an AI-powered platform for generating educational question papers. Our Service allows teachers and educators to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create board-aligned question papers for CBSE, ICSE, and State Boards</li>
                  <li>Configure question types, counts, and marks distribution</li>
                  <li>Generate formatted exam papers using AI technology</li>
                  <li>Export papers in PDF or Word format</li>
                </ul>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">3. Eligibility</strong>
                <p className="mb-4">
                  You must meet the following requirements to use our Service:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be at least 18 years of age</li>
                  <li>Have the legal capacity to enter into binding agreements</li>
                  <li>Not be prohibited from using the Service under applicable laws</li>
                  <li>Be a teacher, educator, or authorized representative of an educational institution</li>
                </ul>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">4. User Account & Registration</strong>
                <p className="mb-4">
                  To access certain features of Prashan, you must create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Safeguard your account credentials and not share them with others</li>
                  <li>Notify us immediately of any unauthorized access or security breach</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">5. Use License</strong>
                <p className="mb-4">
                  Prashan grants you a limited, non-exclusive, non-transferable license to access and use the platform for its intended educational purposes.
                </p>
                <p className="mb-4">
                  <strong className="text-foreground">You may not:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Copy, modify, distribute, sell, or lease any underlying software, algorithms, or proprietary logic</li>
                  <li>Reverse engineer, decompile, or disassemble the Service</li>
                  <li>Remove any proprietary notices or labels</li>
                  <li>Use the Service for any illegal or unauthorized purpose</li>
                  <li>Attempt to gain unauthorized access to any part of the platform</li>
                </ul>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">6. User Responsibilities</strong>
                <p className="mb-4">
                  As a user of Prashan, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the Service in compliance with all applicable laws and regulations</li>
                  <li>Not use the platform in any manner that could damage, disable, overburden, or impair the Service</li>
                  <li>Not interfere with any other party's use and enjoyment of the Service</li>
                  <li>Not attempt to gain unauthorized access to any accounts, systems, or networks</li>
                  <li>Respect the intellectual property rights of Prashan and third parties</li>
                </ul>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">7. Generated Content</strong>
                <p className="mb-4">
                  Our Service generates educational content using artificial intelligence. Regarding this generated content:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Your Responsibility:</strong> You retain full responsibility for verifying the legal compliance, accuracy, and appropriate use of any outputs within your specific educational context</li>
                  <li><strong>Review Requirement:</strong> We strongly recommend reviewing all AI-generated questions before use in actual examinations</li>
                  <li><strong>Accuracy:</strong> AI-generated content may occasionally contain errors or inaccuracies; you must exercise professional judgment</li>
                  <li><strong>Board Alignment:</strong> While we strive for curriculum accuracy, you remain responsible for ensuring alignment with specific board requirements</li>
                </ul>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">8. Intellectual Property</strong>
                <p className="mb-4">
                  <strong>Prashan's Property:</strong> The Service, including but not limited to its design, features, algorithms, logos, trademarks, and underlying technology, are the exclusive property of Prashan and are protected by intellectual property laws.
                </p>
                <p>
                  <strong>Your Content:</strong> You retain ownership of any original content you submit to the platform. By using our Service, you grant us a limited license to use your content solely for the purpose of providing the Service to you.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">9. Disclaimer & Accuracy</strong>
                <p className="mb-4">
                  THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
                  <li>Absolute accuracy of AI-generated outputs</li>
                  <li>Uninterrupted or error-free operation of the Service</li>
                  <li>That the Service will meet your specific requirements</li>
                </ul>
                <p className="mt-4">
                  Revisions to AI models may occur dynamically, and outputs may change over time as models are updated and improved.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">10. Limitation of Liability</strong>
                <p className="mb-4">
                  To the maximum extent permitted by law, Prashan and its affiliates shall not be liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Loss of profits, revenue, data, or business opportunities</li>
                  <li>Any damages arising from reliance on AI-generated content</li>
                  <li>Any errors, inaccuracies, or omissions in generated question papers</li>
                </ul>
                <p className="mt-4">
                  Our total liability shall not exceed the amount you paid us (if any) in the twelve (12) months preceding the claim.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">11. Privacy & Data</strong>
                <p className="mb-4">
                  Your privacy is important to us. Please review our <a href="/privacy" className="text-foreground border-b border-foreground/30 hover:border-foreground transition-colors">Privacy Policy</a>, which explains how we collect, use, and protect your personal information.
                </p>
                <p>
                  By using our Service, you consent to our data practices as described in the Privacy Policy.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">12. Modifications to Service</strong>
                <p className="mb-4">
                  We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice, for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintenance, updates, or improvements</li>
                  <li>Security or compliance reasons</li>
                  <li>Changes in business needs or strategy</li>
                  <li>Legal or regulatory requirements</li>
                </ul>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">13. Termination</strong>
                <p className="mb-4">
                  We may terminate or suspend your access to the Service immediately, without prior notice, for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Breach of these Terms</li>
                  <li>Illegal or fraudulent use of the Service</li>
                  <li>Conduct that harms other users or Prashan</li>
                  <li>Extended periods of inactivity</li>
                </ul>
                <p className="mt-4">
                  You may also delete your account at any time through the settings panel or by contacting support.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">14. Governing Law</strong>
                <p className="mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts in India.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">15. Changes to Terms</strong>
                <p className="mb-4">
                  We may update these Terms from time to time. When we make material changes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We will post the updated Terms on this page</li>
                  <li>We will update the "Last updated" date</li>
                  <li>For significant changes, we will provide additional notice</li>
                  <li>Your continued use after changes constitutes acceptance of new Terms</li>
                </ul>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">16. Severability</strong>
                <p>
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">17. Contact Information</strong>
                <p className="mb-4">
                  If you have questions about these Terms, please contact us:
                </p>
                <p>
                  <strong>Email:</strong> <a href="mailto:legal@prashan.co.in" className="text-foreground border-b border-foreground/30 hover:border-foreground transition-colors">legal@prashan.co.in</a>
                </p>
                <p className="mt-2">
                  <strong>Website:</strong> <a href="https://prashan.co.in" className="text-foreground border-b border-foreground/30 hover:border-foreground transition-colors">https://prashan.co.in</a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
