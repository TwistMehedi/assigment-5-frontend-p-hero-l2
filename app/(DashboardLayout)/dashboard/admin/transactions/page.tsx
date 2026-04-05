"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  ArrowLeft,
  Download,
  CreditCard,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useGetAllTransactionsQuery } from "@/redux/api/user.api";

export default function AdminTransactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: response, isLoading } = useGetAllTransactionsQuery({
    page: currentPage,
    search: searchTerm,
  });

  const transactions = response?.data?.transactions || [];
  const meta = response?.data?.meta;

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 bg-background min-h-screen text-foreground">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Back to Overview
          </Link>
          <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
            All <span className="text-primary">Transactions</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Manage and track every payment across the platform.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-card border border-border p-4 rounded-3xl shadow-sm">
        <div className="md:col-span-8 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by User Name, Email or Transaction ID..."
            className="w-full bg-background border border-border rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">
                <th className="px-6 py-5">User Details</th>
                <th className="px-6 py-5">Purchased Item</th>
                <th className="px-6 py-5">Transaction ID</th>
                <th className="px-6 py-5">Amount</th>
                <th className="px-6 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.length > 0 ? (
                transactions.map((tx: any) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-muted/20 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase truncate max-w-[150px]">
                            {tx.user?.name || "Unknown"}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {tx.user?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black bg-muted px-2 py-0.5 rounded-md uppercase tracking-tighter">
                          {tx.itemType}
                        </span>
                        <p className="text-xs font-bold uppercase text-primary">
                          {tx.media?.title ||
                            tx.series?.title ||
                            "Item Not Found"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-muted-foreground uppercase">
                      {tx.transactionId.slice(0, 18)}...
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-foreground italic">
                        ${tx.amount.toFixed(2)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full border shadow-sm ${
                          tx.status === "COMPLETED"
                            ? "border-green-500/30 text-green-500 bg-green-500/5"
                            : "border-yellow-500/30 text-yellow-500 bg-yellow-500/5"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-20 text-center text-muted-foreground font-black uppercase tracking-widest"
                  >
                    No transactions found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/10">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Showing{" "}
            <span className="text-foreground">{transactions.length}</span> of{" "}
            <span className="text-foreground">{meta?.total || 0}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-10 w-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:text-black disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              {[...Array(Math.min(meta?.pages || 1, 5))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-10 w-10 rounded-xl text-xs font-black transition-all ${
                    currentPage === i + 1
                      ? "bg-primary text-black"
                      : "border border-border hover:border-primary text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, meta?.pages || 1))
              }
              disabled={currentPage === meta?.pages}
              className="h-10 w-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:text-black disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
