"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  KeyRound,
  Loader2,
  CheckCircle2,
  AlertCircle,
  EyeOff,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/api/auth.api";
import { resetPasswordSchema } from "@/types/zod/auth/resetPassword.schema";
import Link from "next/link";

const ResetPassword = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [showCurrent, setShowCurrent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = resetPasswordSchema.safeParse(formData);

    if (!validation.success) {
      const formattedErrors: { [key: string]: string } = {};
      validation.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    try {
      const result = await resetPassword(validation.data).unwrap();
      toast.success(result?.message || "Password reset successful!");

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Reset failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-xl"
      >
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10 mb-4">
            <KeyRound size={28} className="text-[var(--primary)]" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--foreground)]">
            Set New Password
          </h2>
          <p className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-widest mt-2">
            Enter the OTP sent to your email and your new password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted-foreground)] ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? "text-red-500" : "text-[var(--muted-foreground)]"}`}
                size={16}
              />
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-[var(--background)] border rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 outline-none transition-all ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-[var(--border)] focus:ring-[var(--primary)]"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-red-500 flex items-center gap-1 ml-1 font-medium animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted-foreground)] ml-1">
              OTP Code
            </label>
            <div className="relative">
              <CheckCircle2
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${errors.otp ? "text-red-500" : "text-[var(--muted-foreground)]"}`}
                size={16}
              />
              <input
                type="text"
                name="otp"
                maxLength={8}
                placeholder="Enter 8-digit OTP"
                value={formData.otp}
                onChange={handleChange}
                className={`w-full bg-[var(--background)] border rounded-xl py-3 pl-10 pr-4 text-sm font-mono tracking-[0.3em] focus:ring-2 outline-none transition-all ${
                  errors.otp
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-[var(--border)] focus:ring-[var(--primary)]"
                }`}
              />
            </div>
            {errors.otp && (
              <p className="text-[10px] text-red-500 flex items-center gap-1 ml-1 font-medium animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={12} /> {errors.otp}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted-foreground)] ml-1">
              New Password
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? "text-red-500" : "text-[var(--muted-foreground)]"}`}
                size={16}
              />
              <input
                type={showCurrent ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-[var(--background)] border rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 outline-none transition-all ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-[var(--border)] focus:ring-[var(--primary)]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[10px] text-red-500 flex items-center gap-1 ml-1 font-medium animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            disabled={isLoading}
            type="submit"
            className={`w-full bg-[var(--primary)] text-[var(--primary-foreground)] font-black py-4 rounded-xl uppercase text-[11px] tracking-widest shadow-lg flex items-center justify-center gap-2 mt-4 transition-opacity ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Update Password"
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted-foreground)]">
            Didn't receive the password forgot OTP?{" "}
            <Link
              href="/forgot-password"
              className="text-[var(--primary)] hover:underline ml-1"
            >
              Try again
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
