"use client";

import { useGetAdminDashboardQuery } from "@/redux/api/user.api";
import {
  Users,
  Film,
  Tv,
  DollarSign,
  TrendingUp,
  UserCheck,
  Activity,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function AdminOverview() {
  const { data: response, isLoading } = useGetAdminDashboardQuery(undefined);
  const adminData = response?.data;

  console.log("Client Side Admin Data:", adminData);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  const stats = [
    {
      title: "Total Revenue",
      value: `$${adminData?.overview?.totalRevenue || 0}`,
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-500/10",
      description: "Platform total earnings",
    },
    {
      title: "Total Users",
      value: adminData?.counts?.users || 0,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      description: "Active platform users",
    },
    {
      title: "Content Creator",
      value: adminData?.counts?.providers || 0,
      icon: UserCheck,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      description: "Approved Creator",
    },
    {
      title: "Total Content",
      value: adminData?.counts?.totalContent || 0,
      icon: Film,
      color: "text-primary",
      bg: "bg-primary/10",
      description: "Movies & Series combined",
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 bg-background min-h-screen text-foreground">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
            Admin <span className="text-primary">Overview</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Monitoring platform performance and transactions.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-2xl border border-border">
          <Activity size={18} className="text-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Live System Status
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-card border border-border p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight
                className="text-muted-foreground group-hover:text-primary transition-colors"
                size={18}
              />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-muted-foreground text-xs font-black uppercase tracking-widest">
                {stat.title}
              </h3>
              <p className="text-2xl font-black italic tracking-tighter">
                {stat.value}
              </p>
              <p className="text-[10px] text-muted-foreground font-medium">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="font-black uppercase italic tracking-tighter flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" /> Recent
              Transactions
            </h3>
            <Link
              href="/dashboard/admin/transactions"
              className="text-[10px] bg-muted hover:bg-primary hover:text-black px-3 py-1.5 rounded-lg font-black uppercase tracking-widest transition-all"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30 text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {adminData?.recentTransactions?.map((tx: any) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-muted/20 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold uppercase">
                        {tx.customer || "Unknown"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg font-bold border border-primary/20">
                        {tx.item}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-green-500">
                        ${tx.amount}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-[10px] text-muted-foreground font-medium">
                        {new Date(tx.date).toLocaleDateString()}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-4 bg-card border border-border rounded-3xl shadow-sm">
          <div className="p-6 border-b border-border">
            <h3 className="font-black uppercase italic tracking-tighter flex items-center gap-2">
              <UserCheck size={18} className="text-primary" /> New Joinings
            </h3>
          </div>
          <div className="p-6 space-y-6">
            {adminData?.recentUsers?.map((user: any) => (
              <div
                key={user.id}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center font-black text-primary border border-border group-hover:border-primary transition-colors">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase leading-none">
                      {user.name}
                    </h4>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {user.email}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[9px] font-black px-2 py-1 rounded-md border ${
                    user.role === "CREATOR"
                      ? "border-purple-500/30 text-purple-500 bg-purple-500/5"
                      : "border-blue-500/30 text-blue-500 bg-blue-500/5"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
