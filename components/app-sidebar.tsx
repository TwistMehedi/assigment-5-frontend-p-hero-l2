import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { UserCircle, UtensilsCrossed, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
// import { getNavData } from "@/app/constrant/sidebarUrl";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Build Your Application",
      url: "#",
      items: [
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
  ],
};

export async function AppSidebar({ user, ...props }: { user: any }) {
  return (
    <Sidebar
      {...props}
      // '!bg-white' এবং '!border' ব্যবহার করুন Shadcn এর ডিফল্ট ভেরিয়েবল ভাঙার জন্য
      className="!bg-white !border-r !border-gray-100 shadow-2xl"
    >
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="h-10 w-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200 shrink-0">
            <UtensilsCrossed size={22} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-gray-900 tracking-tighter leading-none uppercase text-lg">
              Meal<span className="text-orange-600">Forge</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">
              Management
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 !bg-white">
        {data?.navMain?.length > 0
          ? data.navMain.map((group: any, index: number) => (
              <SidebarGroup key={index} className="py-4">
                <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-4 mb-2">
                  {group.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-1">
                    {group.items?.map((item: any) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.isActive}
                          // 'cn' ব্যবহার করে কন্ডিশনাল ক্লাস দিন
                          className={cn(
                            "group h-12 rounded-2xl px-4 transition-all duration-300",
                            item.isActive
                              ? "!bg-orange-50 !text-orange-600 shadow-sm"
                              : "hover:bg-gray-50 text-gray-500 hover:text-gray-900",
                          )}
                        >
                          <Link
                            href={item.url}
                            className="flex items-center gap-3"
                          >
                            <LayoutDashboard
                              size={18}
                              className={cn(
                                "shrink-0",
                                item.isActive
                                  ? "text-orange-600"
                                  : "text-gray-400 group-hover:text-gray-900",
                              )}
                            />
                            <span className="font-bold text-sm tracking-tight">
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))
          : null}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-50 bg-white">
        <div className="flex items-center gap-3 px-3 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="h-9 w-9 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
            <UserCircle size={24} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-black text-gray-800 text-xs truncate uppercase tracking-tighter">
              {user?.name || "Mehedi Hasan"}
            </span>
            <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest leading-none mt-0.5">
              {user?.role || "Admin"}
            </span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
