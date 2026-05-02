"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  Loader2,
  Clapperboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAllMoviesQuery, useCategoriesQuery } from "@/redux/api/movieApi";
import { ICategory, IMovieResponse } from "@/types/interface/movie.interface";
import HomeMovieCard from "../Home/HomeMovieCard";
import { useSearchParams } from "next/navigation";
import CardSkeleton from "../shared/CardSkeleton";

const MoviesPage = () => {
  const searchParams = useSearchParams();

  const filters = searchParams.get("category") || "";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categoriesRes } = useCategoriesQuery(undefined);

  const categories = useMemo(() => {
    const categoriesData =
      categoriesRes?.data?.data || categoriesRes?.data || [];
    return ["All", ...categoriesData.map((c: ICategory) => c.name)];
  }, [categoriesRes]);

  const { data: moviesRes, isLoading: isMoviesLoading } = useAllMoviesQuery({
    search: searchQuery || filters,
    category: selectedCategory,
    page: currentPage,
    limit: 10,
  });

  const movies = moviesRes?.data?.movies || [];
  const pagination = moviesRes?.data?.pagination;
  const { totalMovies = 0, totalPages = 1 } = pagination || {};

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 container mx-auto px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight uppercase">
          Explore <span className="text-primary">Movies</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-sm font-medium uppercase tracking-wider">
          Found {totalMovies} titles matching your criteria
        </p>
      </div>

      <div className="space-y-6 mb-12">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, director, cast..."
            className="pl-10 rounded-xl bg-card border-border focus-visible:ring-primary h-12"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-border/50">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? "bg-primary text-black border-primary shadow-lg shadow-primary/20"
                  : "bg-card border-border hover:border-primary/40 text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isMoviesLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : movies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie: IMovieResponse) => (
              <HomeMovieCard key={movie.id} {...movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12 border-t border-border pt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 rounded-full border border-border hover:bg-primary hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`h-10 w-10 rounded-xl text-xs font-black transition-all ${
                        currentPage === pageNumber
                          ? "bg-primary text-black shadow-lg shadow-primary/20"
                          : "bg-card border border-border hover:border-primary/50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 rounded-full border border-border hover:bg-primary hover:text-black disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-card/30 rounded-3xl border border-dashed border-border">
          <Clapperboard
            size={64}
            className="text-muted-foreground mb-4 opacity-20"
          />
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
            No movies found
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setCurrentPage(1);
            }}
            className="mt-6 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 border border-primary/20 rounded-full hover:bg-primary/5 transition-all"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
