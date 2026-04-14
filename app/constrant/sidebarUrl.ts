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
  Library,
  User,
  WatchIcon,
} from "lucide-react";

export const adminSidebarUrl = [
  { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/admin/users", icon: Users },
  {
    name: "Movies",
    href: "/dashboard/admin/movies",
    icon: Clapperboard,
  },
  {
    name: "Series",
    href: "/dashboard/admin/series",
    icon: Clapperboard,
  },
  { name: "Categories", href: "/dashboard/admin/categories", icon: Film },
  { name: "Transactions", href: "/dashboard/admin/transactions", icon: Ticket },
  {
    name: "Profile",
    href: "/dashboard/admin/profile",
    icon: User,
  },
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
    name: "Profile",
    href: "/dashboard/provider/profile",
    icon: User,
  },
];

export const userUrl = [
  { name: "Overview user", href: "/dashboard/user", icon: LayoutDashboard },
  { name: "Libary", href: "/dashboard/user/library", icon: Library },
  { name: "Watch List", href: "/dashboard/user/watch-list", icon: WatchIcon },
  {
    name: "Profile",
    href: "/dashboard/user/profile",
    icon: User,
  },
];
