import {
  Clapperboard,
  Film,
  LayoutDashboard,
  Settings,
  Ticket,
  Users,
  Tv,
  PlusCircle,
  BarChart3,
  Video,
  Radio,
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

export const creatorSidebarUrl = [
  {
    name: "Overview",
    href: "/dashboard/provider",
    icon: LayoutDashboard,
  },
  {
    name: "My Channels",
    href: "/dashboard/provider/channels",
    icon: Radio,
  },
  {
    name: "My Movies",
    href: "/dashboard/provider/movies",
    icon: Film,
  },
  {
    name: "Upload Movie",
    href: "/dashboard/provider/movies/create",
    icon: PlusCircle,
  },
  {
    name: "My Series",
    href: "/dashboard/provider/series",
    icon: Tv,
  },
  {
    name: "Upload Series",
    href: "/dashboard/provider/series/create",
    icon: Video,
  },
  {
    name: "Analytics",
    href: "/dashboard/provider/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/dashboard/provider/settings",
    icon: Settings,
  },
];
