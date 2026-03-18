"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Mail, Lock, Loader2 } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
  };

  return (
    <main className="flex min-h-screen w-full relative">
      <div className="hidden lg:flex lg:w-1/2 bg-foreground relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/LoginScreenVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Create question papers
            <br />
            in minutes, not hours.
          </h2>
          <p className="text-white/70 text-lg max-w-md">
            Join thousands of teachers who save hours every week with AI-powered
            paper generation.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 dark:bg-black">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center text-foreground/50 hover:text-foreground transition-colors mb-8 text-sm font-medium"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-foreground/50 mt-2 text-sm">
              {isLogin
                ? "Enter your details to access your account"
                : "Get started with Prashan for free"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground/70 mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 pl-10 text-foreground placeholder:text-foreground/30 outline-none focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 transition-all"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground/70 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@school.edu"
                  className="w-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 pl-10 text-foreground placeholder:text-foreground/30 outline-none focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground/70 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 pl-10 text-foreground placeholder:text-foreground/30 outline-none focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 transition-all"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <Link
                  href="/auth"
                  className="text-xs text-foreground/50 hover:text-foreground transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-glass btn-glass-primary !py-3 !text-base mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  Please wait... <Loader2 className="h-4 w-4 animate-spin" />
                </span>
              ) : (
                <span>{isLogin ? "Sign in" : "Create account"}</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-foreground/50">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-foreground font-medium hover:underline transition-all"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-foreground/30">
            By continuing, you agree to Prashan's{" "}
            <Link
              href="/auth"
              className="hover:text-foreground/50 transition-colors"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/auth"
              className="hover:text-foreground/50 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
