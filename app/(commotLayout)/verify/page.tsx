"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader2, Mail, ShieldCheck } from "lucide-react";
import { useVerifyEmailMutation } from "@/redux/api/auth.api";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [email, setEmail] = useState<string>("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();



  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value);
  if (errors.email) setErrors({});
};

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData("text").slice(0, 8).split("");
    if (data.length === 8) {
      setOtp(data);
      inputRefs.current[7]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (!email) {
    toast.error("Please enter your email address");
    return;
  }

    if (otpString.length < 8) {
      toast.error("Please enter the full 8-digit code");
      return;
    }

    try {
      const result = await verifyEmail({ email, otp: otpString }).unwrap();
      toast.success(result?.message || "Email verified successfully!");
      router.push("/login");
    } catch (err: any) {
      console.log(err);
      toast.error(err.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-2xl text-center"
      >
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10 mb-6">
          <ShieldCheck size={32} className="text-[var(--primary)]" />
        </div>

        <h2 className="text-2xl font-black uppercase tracking-tight">
          Verify Account
        </h2>
        <p className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-widest mt-2 mb-8">
          Enter the 8-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                size={18}
              />
              <input
                type="email"
                name="email"
                className={`w-full bg-[var(--muted)] border ${errors.email ? "border-red-500" : "border-[var(--border)]"} rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all font-medium`}
                placeholder="mehedi@example.com"
                onChange={handleEmailChange}
              />
            </div>
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1 overflow-hidden"
                >
                  <AlertCircle size={12} /> {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  if (el !== null) {
                    inputRefs.current[index] = el;
                  }
                }}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 text-center text-lg font-bold bg-[var(--muted)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-all"
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full bg-[var(--primary)] cursor-pointer text-white font-black py-4 rounded-xl uppercase text-[11px] tracking-widest shadow-lg flex items-center justify-center gap-2 dark:text-black"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" /> <p>Verifying</p>
              </>
            ) : (
              "Verify & Activate"
            )}
          </motion.button>
        </form>

        <p className="mt-6 text-[10px] text-[var(--muted-foreground)] uppercase font-bold tracking-widest">
          Didn't receive the code?{" "}
          <button className="text-[var(--primary)] cursor-pointer hover:underline ml-1">
            Resend
          </button>
        </p>
      </motion.div>
    </div>
  );
}
