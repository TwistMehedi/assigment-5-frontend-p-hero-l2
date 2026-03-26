"use client";

import React, { useState } from "react";
import {
  Search,
  MoreVertical,
  UserCog,
  ShieldCheck,
  UserCheck,
  Ban,
  Trash2,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const usersData = [
  {
    id: "1",
    name: "Mehedi Hasan",
    email: "mehedi@example.com",
    role: "ADMIN",
    status: "Active",
  },
  {
    id: "2",
    name: "Rakib Ahmed",
    email: "rakib@example.com",
    role: "CREATOR",
    status: "Active",
  },
  {
    id: "3",
    name: "Sabbir Hossain",
    email: "sabbir@example.com",
    role: "USER",
    status: "Banned",
  },
  {
    id: "4",
    name: "Anika Tabassum",
    email: "anika@example.com",
    role: "USER",
    status: "Active",
  },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[var(--foreground)]">
            User Management
          </h1>
          <p className="text-xs text-[var(--muted-foreground)] font-medium uppercase tracking-widest mt-1">
            Total {usersData.length} Users Found
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--muted)]/50 border-b border-[var(--border)]">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  User
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Role
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {usersData.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-[var(--muted)]/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold">
                        {user.name[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[var(--foreground)]">
                          {user.name}
                        </span>
                        <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                          <Mail size={12} /> {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                          : user.role === "CREATOR"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
                      )}
                    >
                      {user.role === "ADMIN" ? (
                        <ShieldCheck size={12} />
                      ) : user.role === "CREATOR" ? (
                        <UserCog size={12} />
                      ) : (
                        <UserCheck size={12} />
                      )}
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase",
                        user.status === "Active"
                          ? "text-green-500"
                          : "text-red-500",
                      )}
                    >
                      ● {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 hover:bg-[var(--background)] rounded-lg text-blue-500 transition-colors"
                        title="Change Role"
                      >
                        <UserCog size={18} />
                      </button>
                      <button
                        className="p-2 hover:bg-[var(--background)] rounded-lg text-orange-500 transition-colors"
                        title="Ban User"
                      >
                        <Ban size={18} />
                      </button>
                      <button
                        className="p-2 hover:bg-[var(--background)] rounded-lg text-red-500 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
