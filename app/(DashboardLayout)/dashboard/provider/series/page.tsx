"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Clapperboard,
  Layers,
  Calendar,
  DollarSign,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMySeriesesQuery } from "@/redux/api/series.api";

const Series = () => {
  const { data: response, isLoading, isError } = useMySeriesesQuery();
  const serieses = response?.data || [];

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.2em]">
          Loading your series...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-red-500 gap-2">
        <AlertCircle size={40} />
        <p className="text-sm font-bold uppercase">Failed to load serieses</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 min-h-screen bg-[var(--background)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
            My <span className="text-[var(--primary)]">Collections</span>
          </h1>
          <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase mt-2 tracking-widest">
            Manage your uploaded series and episodes
          </p>
        </div>

        <Link href="/dashboard/series/create">
          <button className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[var(--primary)] transition-all active:scale-95 shadow-lg shadow-white/5">
            <PlusCircle
              size={18}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            Create New Series
          </button>
        </Link>
      </div>

      {serieses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {serieses.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[var(--card)] border border-[var(--border)] rounded-[2rem] overflow-hidden hover:border-[var(--primary)]/50 transition-all shadow-xl"
            >
              <div className="relative h-64 w-full bg-[var(--muted)] overflow-hidden">
                {item.posterUrl ? (
                  <Image
                    src={item.posterUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[var(--muted-foreground)]">
                    <Layers size={40} />
                  </div>
                )}

                {item.isPremium && (
                  <div className="absolute top-4 right-4 bg-[var(--primary)] text-black text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Premium
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-lg uppercase tracking-tight line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-[10px] text-[var(--muted-foreground)] font-bold uppercase">
                    <Clapperboard size={12} /> {item.director}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[var(--muted-foreground)] font-bold uppercase">
                    <Calendar size={12} />{" "}
                    {new Date(item.releaseDate).getFullYear()}
                  </div>
                  <div className="flex items-center gap-2 text-[var(--primary)] font-black uppercase text-xs">
                    <DollarSign size={14} />{" "}
                    {item.price === 0 ? "Free" : `$${item.price}`}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/provider/series/edit/${item.id}`}
                    className="flex-1"
                  >
                    <button className="w-full py-3 cursor-pointer rounded-xl bg-[var(--muted)] hover:bg-[var(--primary)] hover:text-black text-[10px] font-black uppercase transition-all">
                      Edit
                    </button>
                  </Link>
                  <Link
                    href={`/dashboard/provider/series/${item.id}`}
                    className="flex-1"
                  >
                    <button className="w-full py-3 cursor-pointer rounded-xl border border-[var(--border)] hover:border-[var(--primary)] text-[10px] font-black uppercase transition-all">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="h-[40vh] border-2 border-dashed border-[var(--border)] rounded-[3rem] flex flex-col items-center justify-center gap-4 text-center p-10">
          <div className="p-6 bg-[var(--muted)] rounded-full text-[var(--muted-foreground)]">
            <Layers size={40} />
          </div>
          <h2 className="text-xl font-black uppercase tracking-widest">
            No Series Found
          </h2>
          <p className="text-xs text-[var(--muted-foreground)] max-w-xs font-bold uppercase">
            You haven&apos;t uploaded any series yet. Start by creating your
            first collection.
          </p>
        </div>
      )}
    </div>
  );
};

export default Series;
