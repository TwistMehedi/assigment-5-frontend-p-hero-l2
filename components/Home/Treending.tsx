"use client";

import React from "react";
import HomeMovieCard from "@/components/Home/HomeMovieCard";
import { useLatestMoviesQuery } from "@/redux/api/movieApi";
import { Loader2, Film } from "lucide-react";
import Link from "next/link";

const Treending = () => {
  const { data: response, isLoading } = useLatestMoviesQuery(undefined);

  const movies = response?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-16 relative z-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase italic">
            Trending <span className="text-primary">Movies</span>
          </h2>
          <p className="text-muted-foreground mt-2 font-medium">
            Most rated and newly arrived movies this week
          </p>
        </div>
        <Link
          href={"/movies"}
          className="w-fit px-6 py-2 rounded-xl border-2 border-primary text-primary font-black uppercase tracking-tighter hover:bg-primary hover:text-black transition-all active:scale-95"
        >
          Explore All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie: any) => (
          <HomeMovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            videoUrl={movie.videoUrl || movie.videoUrl}
            rating={movie.averageRating || 0}
            genre={movie.genre}
            isPremium={movie.isPremium}
            price={movie.price}
            channels={movie.channels}
            user={movie.user}
          />
        ))}
      </div>

      {!isLoading && movies.length === 0 && (
        <div className="text-center py-20 bg-muted/10 rounded-[2rem] border-2 border-dashed border-border">
          <Film className="mx-auto text-muted-foreground/30 mb-4" size={48} />
          <p className="text-muted-foreground font-bold uppercase tracking-widest">
            No trending movies found
          </p>
        </div>
      )}
    </div>
  );
};

export default Treending;
