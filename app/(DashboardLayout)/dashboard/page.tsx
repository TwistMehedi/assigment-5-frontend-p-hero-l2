"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const user = useSelector((state: any) => state?.auth?.user);
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") {
        router.replace("/dashboard/admin");
      } else if (user.role === "CREATOR") {
        router.replace("/dashboard/provider");
      } else {
        router.replace("/dashboard/user");
      }
    } else {
      router.replace("/login");
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
    </div>
  );
}
