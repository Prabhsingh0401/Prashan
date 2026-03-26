import { Metadata } from "next";
import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";

export const metadata: Metadata = {
  title: "Terms and Conditions | Prashan",
  description: "Terms and Conditions of use for the Prashan platform.",
  alternates: {
    canonical: "https://prashan.co.in/terms",
  },
  openGraph: {
    title: "Terms and Conditions | Prashan",
    description: "Terms and Conditions of use for the Prashan platform.",
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

export default function TermsPage() {
  return (
    <>
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
                <p>
                  By accessing or using Prashan, you agree to be strictly bound by these Terms of Service. If you disagree with any part of the terms, you must discontinue use of the Service immediately.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">2. Use License</strong>
                <p>
                  Prashan grants you a limited, non-exclusive, non-transferable license to access and use the platform. You may not copy, modify, distribute, sell, or lease any underlying software, algorithms, or proprietary logic unless explicitly permitted.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">3. User Responsibilities</strong>
                <p>
                  You are responsible for safeguarding your account authentication credentials. You agree that you will not use the platform in any manner that could damage, disable, overburden, or impair the service or interfere with any other party's usage.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">4. Generated Content</strong>
                <p>
                  Our Service allows you to dynamically generate educational resources. You retain full responsibility for verifying the legal compliance, accuracy, and appropriate use of any outputs generated using Prashan within your specific educational context.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">5. Disclaimer & Accuracy</strong>
                <p>
                  The materials appearing on Prashan are provided on an 'as is' basis. We make no warranties, expressed or implied, regarding the absolute accuracy of the AI-generated outputs. Revisions may occur dynamically as models are updated.
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
