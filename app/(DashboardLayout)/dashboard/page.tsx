"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const user = useSelector((state: any) => state?.auth?.user);
  const isRehydrated = useSelector((state: any) => state?._persist?.rehydrated);
  const router = useRouter();

  console.log("user after", user);
  React.useEffect(() => {
    if (!isRehydrated) return;

    if (user && user.role) {
      if (user?.role === "ADMIN") {
        router.replace("/dashboard/admin");
      } else if (user?.role === "CREATOR") {
        router.replace("/dashboard/provider");
      } else {
        router.replace("/dashboard/user");
      }
    } else {
      router.replace("/login");
    }
  }, [user, isRehydrated, router]);

  console.log("user before useEffect", user);
  return (
    <div className="h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
          Syncing Session...
        </p>
      </div>
    </div>
  );
}
