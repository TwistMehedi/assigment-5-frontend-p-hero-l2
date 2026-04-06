"use client";

import React, { useState } from "react";
import {
  PlayCircle,
  ChevronDown,
  ChevronUp,
  X,
  Play,
  Search,
  Zap,
} from "lucide-react";
import { useMyPurchasedAllQuery } from "@/redux/api/user.api";
import EpisodePagination from "@/components/User/EpisodePagination";
import LibraryPagination from "@/components/User/LibraryPagination";

export default function LibraryPage() {
  const { data: response, isLoading } = useMyPurchasedAllQuery(undefined);
  const [expandedSeries, setExpandedSeries] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const allPurchases: any = response?.data || [];

  const filteredData = allPurchases.filter((item: any) => {
    const title = item.media?.title || item.series?.title || "";
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalLibraryPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentLibraryItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading)
    return (
      <div className="p-8 text-center font-black animate-pulse uppercase text-primary h-screen flex items-center justify-center">
        Syncing Vault...
      </div>
    );

  return (
    <div className="p-4 md:p-6 bg-background min-h-screen space-y-6 text-foreground max-w-7xl mx-auto">
      {activeVideo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full hover:bg-red-500 text-white transition-all"
            >
              <X size={20} />
            </button>
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
            MY <span className="text-primary">LIBRARY</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mt-1">
            <Zap size={12} className="text-primary fill-primary" />{" "}
            {allPurchases.length} Units Collected
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            type="text"
            placeholder="SEARCH..."
            className="w-full bg-card border border-border rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary font-bold text-[10px] tracking-widest uppercase"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentLibraryItems.map((purchase: any) => {
          const item = purchase.media || purchase.series;
          const isMovie = purchase.itemType === "MOVIE";
          const isExpanded = expandedSeries === purchase.id;

          return (
            <div
              key={purchase.id}
              className={`border border-border rounded-2xl bg-card overflow-hidden transition-all duration-300 ${isExpanded ? "ring-2 ring-primary/20" : "hover:border-primary/30"}`}
            >
              <div className="flex flex-col sm:flex-row items-center p-3 gap-4">
                <div className="w-full sm:w-32 h-20 shrink-0 rounded-xl overflow-hidden border border-border relative group">
                  <img
                    src={item?.posterUrl}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    alt=""
                  />
                  {isMovie && (
                    <div
                      onClick={() => setActiveVideo(item?.videoUrl)}
                      className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-black transition-all"
                    >
                      <PlayCircle size={24} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span
                      className={`text-[8px] font-black px-2 py-0.5 rounded-md uppercase ${isMovie ? "bg-zinc-800 text-white" : "bg-primary text-black"}`}
                    >
                      {isMovie ? "Movie" : "Series"}
                    </span>
                    <span className="text-[9px] text-muted-foreground font-bold uppercase italic">
                      {item?.genre}
                    </span>
                  </div>
                  <h3 className="font-black uppercase italic text-lg md:text-xl truncate">
                    {item?.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {!isMovie && (
                    <div className="text-right pr-4 border-r border-border hidden md:block">
                      <p className="text-[8px] font-black text-muted-foreground uppercase">
                        Seasons
                      </p>
                      <p className="font-black text-sm">
                        {item?.seasons?.length || 0}
                      </p>
                    </div>
                  )}
                  {isMovie ? (
                    <button
                      onClick={() => setActiveVideo(item?.videoUrl)}
                      className="px-5 py-2 bg-primary text-black rounded-lg font-black uppercase text-[10px] hover:bg-white transition-all flex items-center gap-2"
                    >
                      <Play size={12} fill="black" /> Play
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setExpandedSeries(isExpanded ? null : purchase.id)
                      }
                      className={`px-4 py-2 rounded-lg border font-black text-[10px] flex items-center gap-2 ${isExpanded ? "bg-primary text-black" : "bg-muted hover:border-primary/50"}`}
                    >
                      {isExpanded ? "CLOSE" : "EPISODES"}{" "}
                      {isExpanded ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {isExpanded && !isMovie && (
                <div className="bg-muted/20 border-t border-border p-4 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-4">
                    {item?.seasons?.map((season: any) => (
                      <div
                        key={season.id}
                        className="bg-background border border-border rounded-xl overflow-hidden"
                      >
                        <div className="px-4 py-2 bg-zinc-900/50 border-b border-border">
                          <h4 className="text-[11px] font-black uppercase italic text-primary">
                            Season {season.seasonNumber}: {season.title}
                          </h4>
                        </div>
                        <EpisodePagination
                          episodes={season.episodes || []}
                          setActiveVideo={setActiveVideo}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <LibraryPagination
        currentPage={currentPage}
        totalPage={totalLibraryPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
