"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
      className="bg-[var(--background)] px-6 text-center"
    >
      <div className="mb-8 p-6 bg-red-500/10 rounded-[2.5rem] border border-red-500/20 relative">
        <AlertTriangle size={60} className="text-red-500" strokeWidth={1.5} />
        <div className="absolute -inset-1 blur-xl bg-red-500/10 -z-10"></div>
      </div>

      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-[var(--foreground)]">
        Something went <span className="text-red-500">wrong</span>
      </h1>

      <p className="max-w-md text-sm font-medium opacity-50 mb-10 leading-relaxed uppercase tracking-wide text-[var(--foreground)]">
        {error.message ||
          "An unexpected error occurred while processing your request. Please try again or return home."}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 bg-[var(--primary)] text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--primary)]/20"
        >
          <RefreshCw size={16} /> Try Again
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 bg-[var(--muted)] px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest border border-[var(--border)] hover:bg-white hover:text-black transition-all text-[var(--foreground)]"
        >
          <Home size={16} /> Go Home
        </Link>
      </div>

      {error.digest && (
        <span className="mt-12 text-[8px] font-mono opacity-20 uppercase tracking-widest text-[var(--foreground)]">
          Error ID: {error.digest}
        </span>
      )}
    </div>
  );
}
