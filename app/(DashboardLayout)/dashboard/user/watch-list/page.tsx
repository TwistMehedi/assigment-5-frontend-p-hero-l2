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
import {
  useDeleteWatchMutation,
  useWatchListsHubsQuery,
} from "@/redux/api/user.api";
import EpisodePagination from "@/components/User/EpisodePagination";
import LibraryPagination from "@/components/User/LibraryPagination";
import { toast } from "react-toastify";

const WatchLetterLists = () => {
  const [deleteWatch] = useDeleteWatchMutation();
  const { data: response, isLoading, refetch } = useWatchListsHubsQuery({});
  const watchLists: any = response?.data || [];

  const [expandedSeries, setExpandedSeries] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredData = watchLists.filter((item: any) => {
    const title = item.media?.title || item.series?.title || "";
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const haldeDelete = async (id: string) => {
    try {
      const result = await deleteWatch(id).unwrap();
      toast.success(result?.message);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center font-black animate-pulse uppercase text-primary h-screen flex items-center justify-center">
        Loading Watchlist...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-background min-h-screen space-y-6 text-foreground max-w-7xl mx-auto">
      {activeVideo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full hover:bg-red-500 text-white"
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
          <h1 className="text-3xl md:text-5xl font-black uppercase italic">
            MY <span className="text-primary">WATCHLIST</span>
          </h1>
          <p className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2 mt-1">
            <Zap size={12} className="text-primary fill-primary" />
            {watchLists.length} Items Saved
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
            className="w-full bg-card border border-border rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary font-bold text-[10px] uppercase"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentItems.map((itemData: any) => {
          const item = itemData?.media || itemData.series;
          const isMovie = itemData?.mediaId;

          const isExpanded = expandedSeries === itemData.id;
          return (
            <div
              key={itemData.id}
              className={`border border-border rounded-2xl bg-card overflow-hidden transition-all ${
                isExpanded
                  ? "ring-2 ring-primary/20"
                  : "hover:border-primary/30"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center p-3 gap-4">
                <div className="w-full sm:w-32 h-20 rounded-xl overflow-hidden border border-border relative group">
                  <img
                    src={item?.posterUrl}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-black uppercase text-lg truncate">
                    {item?.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {isMovie ? (
                    <button
                      onClick={() => setActiveVideo(item?.videoUrl)}
                      className="px-5 cursor-pointer py-2 bg-primary text-black rounded-lg font-black text-[10px]"
                    >
                      <Play size={12} /> Play
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setExpandedSeries(isExpanded ? null : itemData.id)
                      }
                      className="px-4 cursor-pointer py-2 border rounded-lg text-[10px]"
                    >
                      {isExpanded ? "Close" : "Open"}
                      {isExpanded ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => haldeDelete(itemData.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-black text-[10px] hover:bg-red-600 disabled:opacity-50"
                >
                  DELETE
                </button>
              </div>
              {isExpanded && !isMovie && (
                <div className="p-4 border-t border-border">
                  {item?.seasons?.map((season: any) => (
                    <div key={season.id}>
                      <h4 className="font-bold text-primary">
                        Season {season.seasonNumber}
                      </h4>

                      <EpisodePagination
                        episodes={season.episodes || []}
                        setActiveVideo={setActiveVideo}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <LibraryPagination
        currentPage={currentPage}
        totalPage={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default WatchLetterLists;
