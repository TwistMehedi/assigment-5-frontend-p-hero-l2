"use client";

import { useState, useRef, useEffect } from "react";
import {
  BadgeCheck,
  Bell,
  CreditCard,
  HomeIcon,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import LogoutBtn from "../shared/LogoutBtn";
import Link from "next/link";

export default function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full overflow-hidden border hover:scale-105 transition"
      >
        <img
          src="https://github.com/shadcn.png"
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 shadow-lg rounded-xl border p-2 z-50">
          <div className="flex flex-col gap-1">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <HomeIcon size={16} />
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Home
              </Link>
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <LayoutDashboard size={16} />
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell size={16} />
              Notifications
            </button>

            <div className="border-t my-1"></div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
              <LogoutBtn />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
