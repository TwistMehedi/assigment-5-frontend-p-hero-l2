"use client";

import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  Layers,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
} from "lucide-react";
import SeriesCard from "@/components/Series/SeriesCard";
import { useAllSeriesQuery } from "@/redux/api/series.api";
import { useCategoriesQuery } from "@/redux/api/movieApi";
import { ICategory } from "@/types/interface/movie.interface";
import CardSkeleton from "@/components/shared/CardSkeleton";

const SeriesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: catResponse } = useCategoriesQuery();

  const categories = useMemo(() => {
    const categoriesData = catResponse?.data?.data || catResponse?.data || [];
    return ["All", ...categoriesData.map((c: ICategory) => c.name)];
  }, [catResponse]);

  const { data: response, isLoading } = useAllSeriesQuery<any>({
    searchTerm: searchQuery,
    category: selectedCategory,
    page: currentPage,
    limit: 5,
  });

  const allSeries = response?.data?.data || [];
  const pagination = response?.data?.meta;
  const { totalPage = 1 } = pagination || {};

  console.log(allSeries);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 container mx-auto px-4 overflow-x-hidden">
      <div className="mb-10 space-y-6">
        <div className="flex items-center gap-2 text-primary font-bold bg-primary/10 w-fit px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase">
          <Layers size={14} /> Binge-Watch Series
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              TV <span className="text-primary">Shows</span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium max-w-md">
              Explore our vast collection of award-winning series and trending
              TV shows.
            </p>
          </div>

          <div className="w-full lg:max-w-md space-y-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search series, cast..."
                className="pl-12 rounded-2xl bg-card border-border focus-visible:ring-primary h-14 text-sm font-medium shadow-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-border/40 scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border shrink-0 ${
                  selectedCategory === cat
                    ? "bg-primary text-black border-primary shadow-lg shadow-primary/20 scale-95"
                    : "bg-card border-border hover:border-primary/40 text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : allSeries.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allSeries.map((series: any) => (
              <div
                key={series.id}
                className="transition-transform duration-300 hover:scale-[1.02]"
              >
                <SeriesCard {...series} />
              </div>
            ))}
          </div>

          {totalPage > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-20 border-t border-border pt-12">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="h-12 w-12 flex items-center justify-center rounded-2xl border border-border hover:bg-primary hover:text-black disabled:opacity-20 disabled:hover:bg-transparent transition-all active:scale-90"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="hidden sm:flex items-center gap-2">
                {[...Array(totalPage)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`h-12 w-12 rounded-2xl text-[10px] font-black transition-all active:scale-90 ${
                        currentPage === pageNumber
                          ? "bg-primary text-black shadow-xl shadow-primary/20 scale-110"
                          : "bg-card border border-border hover:border-primary/50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <div className="sm:hidden text-[10px] font-black uppercase tracking-widest bg-card px-6 py-3 rounded-2xl border border-border">
                Page {currentPage} of {totalPage}
              </div>

              <button
                disabled={currentPage === totalPage}
                onClick={() => handlePageChange(currentPage + 1)}
                className="h-12 w-12 flex items-center justify-center rounded-2xl border border-border hover:bg-primary hover:text-black disabled:opacity-20 disabled:hover:bg-transparent transition-all active:scale-90"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-card/20 rounded-[40px] border border-dashed border-border/60 mx-auto max-w-4xl">
          <div className="bg-background p-8 rounded-full mb-6 shadow-inner">
            <Clapperboard
              size={48}
              className="text-muted-foreground opacity-30"
            />
          </div>
          <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2">
            No Series Found
          </h3>
          <p className="text-muted-foreground font-medium text-sm text-center px-6 mb-8 max-w-sm">
            We couldn't find any series matching your current filters or search
            term.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setCurrentPage(1);
            }}
            className="text-black bg-primary text-[10px] font-black uppercase tracking-[0.2em] px-10 py-4 rounded-2xl hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SeriesPage;
