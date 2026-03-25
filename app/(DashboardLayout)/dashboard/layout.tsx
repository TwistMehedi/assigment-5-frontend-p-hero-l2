"use client";

import "../../globals.css";
import CustomSidebar from "@/components/CustomSidebar";
import { ModeToggle } from "@/components/Navbar/ModeToggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSelector } from "react-redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: any) => state?.auth.user) || null;

  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={0}>
        <div className="flex min-h-screen w-full bg-[var(--background)]">
          <CustomSidebar />

          <SidebarInset className="flex-1 flex flex-col min-w-0 bg-[var(--background)]">
            <header className="flex h-16 shrink-0 items-center px-4 md:px-8 border-b bg-[var(--card)] shadow-sm justify-between sticky top-0 z-10 border-[var(--border)]">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="md:hidden p-2 hover:bg-[var(--muted)] rounded-md" />

                <span className="hidden md:inline-flex text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)] bg-[var(--muted)] px-3 py-1 rounded-full border border-[var(--border)]">
                  {user?.role} Portal
                </span>
              </div>

              <div className="flex items-center gap-4">
                <ModeToggle />
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black text-[var(--foreground)] uppercase tracking-tight">
                    {user?.name}
                  </p>
                  <p className="text-[9px] font-bold text-[var(--primary)] uppercase leading-none">
                    Verified {user?.role}
                  </p>
                </div>
              </div>
            </header>

            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  );
}
