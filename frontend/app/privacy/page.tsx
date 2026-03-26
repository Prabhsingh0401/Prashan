import { Metadata } from "next";
import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Prashan",
  description: "Privacy Policy and data handling practices for Prashan.",
  alternates: {
    canonical: "https://prashan.co.in/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Prashan",
    description: "Privacy Policy and data handling practices for Prashan.",
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

export default function PrivacyPolicyPage() {
  return (
    <>
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
                <p>
                  We collect personal information that you voluntarily provide to us when you register via Google Authentication, express an interest in obtaining information about us, or otherwise contact us. This includes your name, email address, and minimal authentication data necessary to run the platform.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">2. How We Use Your Information</strong>
                <p>
                  We use the information collected solely to manage your account, facilitate the creation of high-quality question papers, and ensure the security of our platform. We strictly do not sell, rent, or lease your personal information to third parties.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">3. Data Security & Google API</strong>
                <p>
                  Prashan's use and transfer to any other app of information received from Google APIs accurately adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-foreground border-b border-foreground/30 hover:border-foreground transition-colors" target="_blank" rel="noreferrer">Google API Services User Data Policy</a>, specifically including the Limited Use requirements.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">4. Your Rights</strong>
                <p>
                  You have the right to request access to, correction of, or deletion of your personal data at any point. You can delete your account and associated data directly from the settings panel or by contacting our support team.
                </p>
              </div>

              <div>
                <strong className="text-foreground text-2xl block mb-4">5. Contact Us</strong>
                <p>
                  If you have questions or comments about this notice, you may email our privacy team directly at <a href="mailto:support@prashan.co.in" className="text-foreground border-b border-foreground/30 hover:border-foreground transition-colors">support@prashan.co.in</a>.
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
