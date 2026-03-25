"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "@/redux/api/auth.api";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    try {
      const result = await forgotPassword({ email }).unwrap();
      setIsSubmitted(true);
      toast.success(result?.message);
      setTimeout(() => {
        router.push("/reset-password");
      }, 3000);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10 mb-4">
            <Mail size={32} className="text-[var(--primary)]" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--foreground)]">
            Forgot Password?
          </h2>
          <p className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-widest mt-2">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted-foreground)] ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-all text-sm"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full bg-[var(--primary)] cursor-pointer text-[var(--primary-foreground)] font-black py-4 rounded-xl uppercase text-[11px] tracking-widest shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <Send size={16} /> Reset Password
                </>
              )}
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="p-4 bg-[var(--muted)] rounded-xl border border-[var(--border)]">
              <p className="text-sm text-[var(--foreground)]">
                We've sent a password reset link to <br />
                <span className="font-bold text-[var(--primary)]">{email}</span>
              </p>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-[11px] uppercase font-bold tracking-widest text-[var(--primary)] hover:underline"
            >
              Didn't receive the email?
              <Link href="/forgot-password">Try again</Link>
            </button>
          </motion.div>
        )}

        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-[11px] uppercase font-bold tracking-widest text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
