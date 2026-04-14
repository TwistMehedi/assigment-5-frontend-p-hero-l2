"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  ChevronRight,
  UserCircle,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import {
  adminSidebarUrl,
  creatorSidebarUrl,
  userUrl,
} from "@/app/constrant/sidebarUrl";
import LogoutBtn from "./shared/LogoutBtn";

export default function CustomSidebar() {
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const user = useSelector((state: any) => state?.auth?.user);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) return null;

  const sidebarItems =
    user?.role === "ADMIN"
      ? adminSidebarUrl
      : user?.role === "CREATOR"
        ? creatorSidebarUrl
        : userUrl;

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-[var(--border)] bg-[var(--card)]"
    >
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3 group cursor-pointer overflow-hidden">
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer overflow-hidden"
          >
            <div className="h-10 w-10 bg-[var(--primary)] rounded-xl flex items-center justify-center shadow-lg shrink-0 transition-transform group-hover:scale-105">
              <PlayCircle
                size={22}
                fill="var(--primary-foreground)"
                className="text-[var(--primary)]"
              />
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="font-black text-[var(--foreground)] tracking-tighter leading-none uppercase text-xl">
                Movie<span className="text-[var(--primary)]">-Portal</span>
              </span>
              <span className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase tracking-[0.2em] mt-1">
                Production {user?.role}
              </span>
            </div>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 overflow-y-auto scrollbar-hide">
        <div className="px-4 mb-4 group-data-[collapsible=icon]:hidden">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            Cinema Management
          </p>
        </div>

        <SidebarMenu className="gap-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.name}
                  onClick={() => isMobile && setOpenMobile(false)}
                  className={cn(
                    "h-11 rounded-[var(--radius)] px-4 transition-all duration-200",
                    isActive
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
                  )}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon size={19} className="shrink-0" />
                    <span className="font-bold text-sm tracking-tight group-data-[collapsible=icon]:hidden">
                      {item.name}
                    </span>
                    {isActive && (
                      <ChevronRight
                        size={14}
                        className="ml-auto opacity-70 group-data-[collapsible=icon]:hidden"
                      />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-[var(--border)] bg-[var(--background)]">
        <div className="flex items-center gap-3 p-2 bg-[var(--card)] rounded-[var(--radius)] border border-[var(--border)] shadow-sm group-data-[collapsible=icon]:p-1 group-data-[collapsible=icon]:justify-center">
          <div className="h-9 w-9 bg-[var(--muted)] rounded-lg flex items-center justify-center text-[var(--primary)] shrink-0 border border-[var(--border)]">
            <UserCircle size={22} />
          </div>

          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-[var(--foreground)] text-[10px] truncate uppercase leading-none">
              {user?.name}
            </span>
            <span className="text-[8px] font-black text-[var(--primary)] uppercase tracking-widest mt-1">
              {user?.role}
            </span>
          </div>
          <LogoutBtn />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
