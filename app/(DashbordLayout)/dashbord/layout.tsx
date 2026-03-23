import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  admin: React.ReactNode;
  provider: React.ReactNode;
  user: React.ReactNode;
}

export default async function DashboardLayout({
  children,
  admin,
  provider,
  user,
}: DashboardLayoutProps) {
  // এখানে আপনার Auth লজিক আসবে (Better Auth বা JWT থেকে রোল নিবেন)
  // আমি উদাহরণের জন্য একটি ডামি রোল ধরছি
  const session = {
    user: {
      role: "admin", // এটি "admin", "provider", বা "user" হতে পারে
    },
  };

  const role = session?.user?.role;

  // রোল অনুযায়ী সঠিক স্লট রিটার্ন করা
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      {/* কমন সাইডবার বা নেভবার এখানে থাকতে পারে */}
      <div className="flex">
        <aside className="w-64 border-r min-h-screen p-6 hidden md:block">
          <h2 className="font-bold text-xl text-primary">Dashboard</h2>
        </aside>

        <main className="flex-1 p-8">
          {role === "admin" && admin}
          {role === "provider" && provider}
          {role === "user" && user}

          {children}
        </main>
      </div>
    </div>
  );
}
