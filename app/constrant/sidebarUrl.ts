import {
  Clapperboard,
  Film,
  LayoutDashboard,
  Settings,
  Ticket,
  Users,
} from "lucide-react";

export const adminSidebarUrl = [
  { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/admin/users", icon: Users },
  {
    name: "Movie Approval",
    href: "/dashboard/admin/movies",
    icon: Clapperboard,
  },
  { name: "Categories", href: "/dashboard/admin/categories", icon: Film },
  { name: "Revenue", href: "/dashboard/admin/revenue", icon: Ticket },
  { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];
