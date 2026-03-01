import type { Metadata } from "next";
import Navbar from "./components/global/navbar";
import Footer from "./components/global/footer";
import { ThemeProvider } from "./components/theme/theme-provider";
import { AuroraBackground } from "./components/global/background";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prashan | Question Paper Generator",
  description: "Formatted question paper generation made for teachers",
  icons: {
    icon: "/prashan_logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuroraBackground>
            <Navbar />
            <div className="min-h-screen z-10 w-full relative">
              {children}
            </div>
            <Footer />
          </AuroraBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
