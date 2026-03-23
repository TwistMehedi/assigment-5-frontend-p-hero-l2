"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Tv, Layers } from "lucide-react";
import SeriesCard from "@/components/Series/SeriesCard";

const allSeries = [
  {
    id: 101,
    title: "Breaking Bad",
    rating: 9.5,
    category: "Crime",
    seasons: 5,
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500",
  },
  {
    id: 102,
    title: "Stranger Things",
    rating: 8.7,
    category: "Sci-Fi",
    seasons: 4,
    status: "Ongoing",
    image:
      "https://images.unsplash.com/photo-1560169897-bb334ee5b301?q=80&w=500",
  },
];

const SeriesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen pt-28 pb-20 container mx-auto px-4">
      <div className="mb-12 space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold bg-primary/10 w-fit px-4 py-1 rounded-full text-xs">
          <Layers size={14} /> BINGE-WATCH SERIES
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            TV <span className="text-primary">Shows</span>
          </h1>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by series name..."
              className="pl-10 rounded-2xl bg-card border-border h-12 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {allSeries.map((series) => (
          <div key={series.id} className="relative group">
            <SeriesCard key={series.id} {...series} />

            <div className="mt-2 flex justify-between items-center px-1">
              <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                <Tv size={10} /> {series.seasons} Seasons
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  series.status === "Ongoing"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {series.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesPage;
