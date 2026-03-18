import type { Metadata } from "next";
import { ThemeProvider } from "../components/theme/theme-provider";
import "../globals.css";

export const metadata: Metadata = {
  title: "Sign In | Prashan",
  description: "Sign in or create your Prashan account",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
