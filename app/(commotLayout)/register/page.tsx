"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  PlayCircle,
  Loader2,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { registerSchema } from "@/types/zod/auth/zod.register";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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

    const validation = registerSchema.safeParse(formData);

    if (!validation.success) {
      const formattedErrors: { [key: string]: string } = {};
      validation.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setLoading(true);
    try {
      console.log("Validated Data:", validation.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-2xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)] mb-4 shadow-lg shadow-[var(--primary)]/30"
          >
            <PlayCircle size={32} className="text-white" fill="white" />
          </motion.div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-[var(--foreground)]">
            Movie<span className="text-[var(--primary)]"> Portal</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)] mt-2">
            Create Your Account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                size={18}
              />
              <input
                type="text"
                name="name"
                className={`w-full bg-[var(--muted)] border ${errors.name ? "border-red-500" : "border-[var(--border)]"} rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all font-medium`}
                placeholder="Ex: Mehedi Hasan"
                onChange={handleChange}
              />
            </div>
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1 overflow-hidden"
                >
                  <AlertCircle size={12} /> {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

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
                onChange={handleChange}
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

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                size={18}
              />
              <input
                type="password"
                name="password"
                className={`w-full bg-[var(--muted)] border ${errors.password ? "border-red-500" : "border-[var(--border)]"} rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all font-medium`}
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1 overflow-hidden"
                >
                  <AlertCircle size={12} /> {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
              Register As
            </label>
            <div className="relative">
              <UserCheck
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                size={18}
              />
              <select
                name="role"
                className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] appearance-none cursor-pointer font-black uppercase"
                onChange={handleChange}
              >
                <option value="CUSTOMER">Customer (Viewer)</option>
                <option value="PROVIDER">Provider (Content Creator)</option>
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase text-[11px] tracking-[0.2em] shadow-xl shadow-[var(--primary)]/20 mt-4 dark:text-black"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Complete Registration"
            )}
          </motion.button>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-[var(--muted-foreground)] font-black uppercase tracking-widest">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--primary)] hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[var(--border)]"></span>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
            <span className="bg-[var(--card)] px-4 text-[var(--muted-foreground)]">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: "var(--muted)" }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => console.log("Google Login Clicked")}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[var(--border)] bg-transparent py-3 text-sm font-bold text-[var(--foreground)] transition-all hover:shadow-md"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="uppercase text-[11px] tracking-widest font-black">
              Google
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
