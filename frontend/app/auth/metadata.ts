import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In / Sign Up | Prashan",
  description:
    "Create your Prashan account or sign in to access AI-powered question paper generation for CBSE, ICSE, and State Board.",
  alternates: {
    canonical: "https://prashan.co.in/auth",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Sign In / Sign Up | Prashan",
    description:
      "Create your Prashan account or sign in to access AI-powered question paper generation.",
    url: "https://prashan.co.in/auth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prashan — Sign In or Sign Up",
      },
    ],
  },
};
