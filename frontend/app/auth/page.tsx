"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Mail, Lock, Loader2, KeyRound, Check, X } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/firebase";
import { signup, login, verifyOtp } from "../../services/authService";
import { checkUserAllowed } from "../../services/allowedUsers";
import { Toast } from "../components/ui/toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Password validation checks
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate password for sign-up
    if (!isOtpMode && !isLogin && !isPasswordValid) {
      setToastType("error");
      setToastMessage("Please ensure all password requirements are met");
      setShowToast(true);
      setIsSubmitting(false);
      return;
    }

    try {
      if (isOtpMode) {
        const isAllowed = await checkUserAllowed(email);
        if (!isAllowed) {
          setToastType("error");
          setToastMessage("Access denied. You need permission to use Prashan.");
          setShowToast(true);
          setIsSubmitting(false);
          return;
        }
        const res = await verifyOtp({ email, otp });
        if (res.token) localStorage.setItem("token", res.token);
        setToastType("success");
        setToastMessage("Account verified and signed in!");
        setShowToast(true);
        setTimeout(() => router.push("/dashboard"), 1500);
      } else if (isLogin) {
        const isAllowed = await checkUserAllowed(email);
        if (!isAllowed) {
          setToastType("error");
          setToastMessage("Access denied. You need permission to use Prashan.");
          setShowToast(true);
          setIsSubmitting(false);
          return;
        }
        const res = await login({ email, password });
        if (res.token) localStorage.setItem("token", res.token);
        setToastType("success");
        setToastMessage("Welcome back!");
        setShowToast(true);
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        await signup({ name, email, password });
        setToastType("success");
        setToastMessage("OTP sent to your email!");
        setShowToast(true);
        setIsOtpMode(true);
      }
    } catch (error: any) {
      setToastType("error");
      setToastMessage(error.message || "An error occurred");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      const result = await signInWithPopup(auth, googleProvider);
      
      const userEmail = result.user.email;
      if (!userEmail) {
        throw new Error("No email found");
      }

      const isAllowed = await checkUserAllowed(userEmail);
      if (!isAllowed) {
        await auth.signOut();
        setToastType("error");
        setToastMessage("Access denied. You need permission to use Prashan.");
        setShowToast(true);
        setIsSubmitting(false);
        return;
      }
      
      const token = await result.user.getIdToken();
      if (token) localStorage.setItem("token", token);
      
      setToastType("success");
      setToastMessage("User logged in successfully");
      setShowToast(true);
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setToastType("error");
      setToastMessage("Failed to sign in with Google");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
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
          preload="metadata"
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

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 dark:bg-black">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center text-foreground/50 hover:text-foreground transition-colors mb-6 text-sm font-medium"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              {isOtpMode ? "Verify your email" : isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-foreground/50 mt-1 text-sm">
              {isOtpMode
                ? "We sent a 6-digit code to your email."
                : isLogin
                  ? "Enter your details to access your account"
                  : "Get started with Prashan for free"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {isOtpMode ? (
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-foreground/70 mb-1"
                >
                  6-Digit OTP
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    className="w-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 pl-10 text-foreground placeholder:text-foreground/30 outline-none focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 transition-all text-sm tracking-widest font-mono"
                    required
                  />
                </div>
              </div>
            ) : (
              <>
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground/70 mb-1"
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
                        className="w-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 pl-10 text-foreground placeholder:text-foreground/30 outline-none focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 transition-all text-sm"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground/70 mb-1"
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
                      className="w-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 pl-10 text-foreground placeholder:text-foreground/30 outline-none focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 transition-all text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground/70 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative mb-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      placeholder="••••••••"
                      className={`w-full bg-white/50 dark:bg-white/5 border ${!isLogin && password && !isPasswordValid ? 'border-red-500/50' : 'border-black/10 dark:border-white/10'} rounded-xl px-4 py-2.5 pl-10 text-foreground placeholder:text-foreground/30 outline-none focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 transition-all text-sm`}
                      required
                    />
                  </div>

                  {!isLogin && (isPasswordFocused || (password.length > 0 && !isPasswordValid)) && (
                    <div className="absolute top-full left-0 mt-2 w-full z-50 p-3.5 bg-white/95 dark:bg-black/95 backdrop-blur-md rounded-xl border border-black/10 dark:border-white/10 shadow-md pointer-events-none transition-all duration-200 animate-in fade-in slide-in-from-top-1">
                      <p className="text-xs font-semibold text-foreground/80 mb-2.5">Password must contain:</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex items-center justify-center rounded-full w-4 h-4 ${hasMinLength ? 'bg-green-500/20' : 'bg-foreground/5'}`}>
                            {hasMinLength ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-foreground/30" />}
                          </div>
                          <span className={`text-xs font-medium ${hasMinLength ? 'text-green-500' : 'text-foreground/60'}`}>At least 8 characters</span>
                        </div>
                        
                        <div className="flex items-center gap-2.5">
                          <div className={`flex items-center justify-center rounded-full w-4 h-4 ${hasUpperCase ? 'bg-green-500/20' : 'bg-foreground/5'}`}>
                            {hasUpperCase ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-foreground/30" />}
                          </div>
                          <span className={`text-xs font-medium ${hasUpperCase ? 'text-green-500' : 'text-foreground/60'}`}>One uppercase letter</span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className={`flex items-center justify-center rounded-full w-4 h-4 ${hasLowerCase ? 'bg-green-500/20' : 'bg-foreground/5'}`}>
                            {hasLowerCase ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-foreground/30" />}
                          </div>
                          <span className={`text-xs font-medium ${hasLowerCase ? 'text-green-500' : 'text-foreground/60'}`}>One lowercase letter</span>
                        </div>
                        
                        <div className="flex items-center gap-2.5">
                          <div className={`flex items-center justify-center rounded-full w-4 h-4 ${hasNumber ? 'bg-green-500/20' : 'bg-foreground/5'}`}>
                            {hasNumber ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-foreground/30" />}
                          </div>
                          <span className={`text-xs font-medium ${hasNumber ? 'text-green-500' : 'text-foreground/60'}`}>One number</span>
                        </div>
                        
                        <div className="flex items-center gap-2.5">
                          <div className={`flex items-center justify-center rounded-full w-4 h-4 ${hasSpecialChar ? 'bg-green-500/20' : 'bg-foreground/5'}`}>
                            {hasSpecialChar ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-foreground/30" />}
                          </div>
                          <span className={`text-xs font-medium ${hasSpecialChar ? 'text-green-500' : 'text-foreground/60'}`}>One special character</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {isLogin && !isOtpMode && (
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
              className="w-full btn-glass btn-glass-primary !py-2.5 !text-sm font-bold"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  Please wait... <Loader2 className="h-4 w-4 animate-spin" />
                </span>
              ) : (
                <span>{isOtpMode ? "Verify & Sign in" : isLogin ? "Sign in" : "Create account"}</span>
              )}
            </button>

            {!isOtpMode && (
              <>
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
                  <span className="text-xs text-foreground/40 font-medium">or</span>
                  <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full btn-glass btn-glass-icon !py-2.5 !text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </>
            )}
          </form>

          {!isOtpMode && (
            <div className="mt-4 text-center">
              <p className="text-sm text-foreground/50">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-foreground font-medium hover:underline transition-all font-bold"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          )}

          {isOtpMode && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsOtpMode(false)}
                className="text-xs text-foreground/50 hover:text-foreground transition-all"
              >
                ← Back to sign up
              </button>
            </div>
          )}

          <p className="mt-4 text-center text-xs text-foreground/30">
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
      
      <Toast 
        title={toastType === "success" ? "Welcome back!" : "Authentication Failed"}
        message={toastMessage} 
        type={toastType} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </main>
  );
}
