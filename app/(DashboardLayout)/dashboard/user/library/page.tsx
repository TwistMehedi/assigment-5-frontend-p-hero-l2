"use client";

import React, { useState, useMemo } from "react";
import { useMyPurchasedAllQuery } from "@/redux/api/user.api";
import {
  Loader2,
  PlayCircle,
  Film,
  Tv,
  Search,
  LayoutGrid,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Library = () => {
  const { data: response, isLoading } = useMyPurchasedAllQuery({});
  const [searchQuery, setSearchQuery] = useState("");

  const purchases = response?.data || [];

  const filteredPurchases = useMemo(() => {
    return purchases.filter((purchase: any) => {
      const item = purchase.media || purchase.series;
      return item?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [purchases, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary h-12 w-12" />
        <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px]">
          Loading Your Collection...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-8 bg-background min-h-screen text-foreground">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <LayoutGrid size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Premium Access
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter leading-none">
            My Library
          </h1>
          <p className="text-muted-foreground font-medium text-sm border-l-2 border-primary pl-4">
            Manage and watch your purchased movies and series.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            type="text"
            placeholder="Search your titles..."
            className="w-full bg-card border border-border rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-bold text-xs uppercase tracking-wider"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <hr className="border-border/50" />

      <AnimatePresence mode="popLayout">
        {filteredPurchases.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            {filteredPurchases.map((purchase: any) => {
              const item = purchase.media || purchase.series;
              const isMovie = purchase.itemType === "MOVIE";
              const watchLink = isMovie
                ? `/watch/${item?.id}`
                : `/series/${item?.id}`;

              return (
                <motion.div
                  key={purchase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-card border border-border rounded-[2rem] overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                >
                  <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                    <img
                      src={
                        item?.thumbnailUrl ||
                        item?.posterUrl ||
                        "https://via.placeholder.com/600x400"
                      }
                      alt={item?.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />

                    <div className="absolute top-4 left-4">
                      <span className="bg-background/80 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                        {isMovie ? (
                          <Film
                            size={12}
                            className="text-primary fill-primary/20"
                          />
                        ) : (
                          <Tv
                            size={12}
                            className="text-orange-500 fill-orange-500/20"
                          />
                        )}
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {isMovie ? "Movie" : "Series"}
                        </span>
                      </span>
                    </div>

                    <Link
                      href={watchLink}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]"
                    >
                      <div className="bg-primary p-4 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                        <PlayCircle
                          size={32}
                          className="text-black fill-current"
                        />
                      </div>
                    </Link>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="font-black text-xl leading-tight uppercase italic tracking-tighter line-clamp-1 group-hover:text-primary transition-colors">
                      {item?.title || "Untitled Masterpiece"}
                    </h3>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock size={14} className="text-primary/60" />
                        <span className="text-[10px] font-black uppercase tracking-tight">
                          {new Date(purchase.createdAt).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>

                      <Link href={watchLink}>
                        <button className="flex items-center gap-2 bg-primary text-black px-5 py-2 rounded-full text-[10px] font-black uppercase hover:bg-white transition-all shadow-lg shadow-primary/10">
                          Watch <ArrowRight size={12} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border rounded-[3rem] bg-card/30"
          >
            <div className="bg-muted p-8 rounded-full mb-6">
              <Film size={48} className="text-muted-foreground opacity-20" />
            </div>
            <h2 className="text-2xl font-black uppercase italic tracking-widest text-muted-foreground">
              {searchQuery ? "No Matches Found" : "Your Library is Empty"}
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs mx-auto font-medium">
              {searchQuery
                ? `We couldn't find anything matching "${searchQuery}".`
                : "Unlock premium movies and series to see them here."}
            </p>
            {!searchQuery && (
              <Link href="/movies">
                <button className="mt-8 bg-primary text-black px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                  Browse Catalog
                </button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Library;
