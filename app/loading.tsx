"use client";

import { Loader2 } from "lucide-react";

const Loading = () => {
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
      className="bg-[var(--background)] gap-4"
    >
      <div className="relative flex items-center justify-center">
        <Loader2
          className="animate-spin text-[var(--primary)]"
          size={48}
          strokeWidth={1}
        />
        <div className="absolute inset-0 blur-2xl bg-[var(--primary)]/20 rounded-full animate-pulse"></div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 animate-pulse">
          Loading Content....
        </p>
        <div className="h-[2px] w-12 bg-[var(--primary)] mt-2 rounded-full overflow-hidden">
          <div className="h-full bg-white w-full -translate-x-full animate-[loading-bar_1.5s_infinite]"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
