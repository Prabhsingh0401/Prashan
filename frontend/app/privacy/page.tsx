import { Metadata } from "next";
import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";
import { JsonLd } from "../components/seo/json-ld";

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

export default function PrivacyPolicyPage() {
  return (
    <>
      <head>
        <JsonLd data={[breadcrumbJsonLd, legalServiceJsonLd]} />
      </head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-start">
        <div className="flex-1 flex min-h-[90vh] w-full items-start justify-center px-4 sm:px-8 lg:px-16 pt-32 sm:pt-40 pb-20 relative z-10 overflow-hidden">
          
          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-start relative z-10">
            
            {/* Left Column: Title (sticky on desktop) */}
            <div className="md:col-span-5 flex flex-col justify-start md:sticky md:top-40">
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[6rem] font-bold tracking-tighter text-foreground leading-[1.08] pr-4">
                Privacy <span className="text-foreground/30 relative select-none">
                  <span className="line-through decoration-[3px] decoration-red-500/60 dark:decoration-red-400/60">matters.</span>
                </span>
                <br className="hidden md:block" />
                <span className="block mt-2">Policy.</span>
              </h1>
              <p className="mt-6 text-lg text-foreground/50 font-medium">
                Last updated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>

            {/* Right Column: Content */}
            <div className="md:col-span-7 flex flex-col space-y-8 md:space-y-10 text-lg sm:text-xl text-foreground/75 font-medium leading-relaxed max-w-3xl">
              
              <div>
                <strong className="text-foreground text-2xl block mb-4">1. Information We Collect</strong>
                <p className="mb-4">
                  We collect personal information that you voluntarily provide to us when you register via Google Authentication, express an interest in obtaining information about us, or otherwise contact us. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Information:</strong> Your name, email address, and authentication data from Google Sign-In</li>
                  <li><strong>Usage Data:</strong> Information about how you access and use our platform</li>
                  <li><strong>Generated Content:</strong> Question paper configurations and preferences you create</li>
                </ul>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">2. How We Use Your Information</strong>
                <p className="mb-4">
                  We use the information collected solely for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Managing your account and providing platform access</li>
                  <li>Facilitating the creation of high-quality question papers</li>
                  <li>Ensuring the security and integrity of our platform</li>
                  <li>Communicating updates, features, and support information</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-foreground">We strictly do not sell, rent, or lease your personal information to third parties.</strong>
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">3. Data Security & Google API Compliance</strong>
                <p className="mb-4">
                  Prashan's use and transfer to any other app of information received from Google APIs accurately adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-foreground border-b border-foreground/30 hover:border-foreground transition-colors" target="_blank" rel="noreferrer">Google API Services User Data Policy</a>, specifically including the Limited Use requirements.
                </p>
                <p>
                  We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your data from unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">4. Data Retention</strong>
                <p>
                  We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time through the settings panel or by contacting our support team.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">5. Your Rights</strong>
                <p className="mb-4">
                  Under applicable data protection laws, you have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data ("Right to be Forgotten")</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Object:</strong> Object to certain processing of your personal information</li>
                </ul>
                <p className="mt-4">
                  You can exercise these rights by deleting your account from the settings panel or by contacting our privacy team at <a href="mailto:privacy@prashan.co.in" className="text-foreground border-b border-foreground/30 hover:border-foreground transition-colors">privacy@prashan.co.in</a>.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">6. Cookies & Tracking</strong>
                <p>
                  We use essential cookies and similar technologies to maintain session state, authenticate users, and ensure platform functionality. We do not use advertising cookies or third-party tracking for marketing purposes.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">7. Third-Party Services</strong>
                <p className="mb-4">
                  Prashan uses the following third-party services:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Firebase (Google):</strong> Authentication and cloud services</li>
                  <li><strong>Vercel:</strong> Hosting and analytics</li>
                  <li><strong>AI Services:</strong> Question paper generation (processed securely)</li>
                </ul>
                <p className="mt-4">
                  These services have their own privacy policies, and we encourage you to review them.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">8. Children's Privacy</strong>
                <p>
                  Prashan is intended for use by teachers and educational professionals. Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">9. International Data Transfers</strong>
                <p>
                  Your information may be transferred to and processed in countries other than India. When we transfer data internationally, we ensure appropriate safeguards are in place in compliance with applicable data protection laws.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">10. Changes to This Policy</strong>
                <p>
                  We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a revised "Last updated" date.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">11. Contact Us</strong>
                <p className="mb-4">
                  If you have questions, comments, or concerns about this privacy policy or our data practices, please contact us:
                </p>
                <p>
                  <strong>Email:</strong> <a href="mailto:privacy@prashan.co.in" className="text-foreground border-b border-foreground/30 hover:border-foreground transition-colors">privacy@prashan.co.in</a>
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
