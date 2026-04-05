"use client";

import React, { useState } from "react";
import {
  Search,
  ShieldCheck,
  UserCog,
  UserCheck,
  Trash2,
  Mail,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useUsersQuery,
  useUpdateRoleMutation,
  useDeleteUserMutation,
} from "@/redux/api/user.api";
import { toast } from "react-toastify";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: response, isLoading } = useUsersQuery(searchTerm);
  const [updateRole] = useUpdateRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  const usersData = response?.data || [];

  const handleChangeRole = async (id: string, currentRole: string) => {
    let nextRole = "USER";
    if (currentRole === "USER") nextRole = "CREATOR";
    else if (currentRole === "CREATOR") nextRole = "ADMIN";
    else nextRole = "USER";

    try {
      await updateRole({ id, role: nextRole }).unwrap();
      toast.success(`Role updated to ${nextRole}`);
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? if you delete this user so his movies and series will be deleted an delete all transactions with payment",
      )
    ) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-foreground">
            User Management
          </h1>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">
            Total {usersData.length} Users Found
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  User
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Role
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <Loader2
                      className="animate-spin text-primary mx-auto"
                      size={30}
                    />
                  </td>
                </tr>
              ) : (
                usersData.map((user: any) => (
                  <tr
                    key={user.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold uppercase">
                          {user.name?.[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-foreground">
                            {user.name}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
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
                      <span className="text-[10px] font-bold uppercase text-green-500">
                        ● {user.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleChangeRole(user.id, user.role)}
                          className="p-2 cursor-pointer hover:bg-background rounded-lg text-blue-500 transition-colors"
                          title="Toggle Role"
                        >
                          <UserCog size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 cursor-pointer hover:bg-background rounded-lg text-red-500 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
