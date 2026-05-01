"use client";
import React from "react";
import Link from "next/link";
import { useCategoriesQuery } from "@/redux/api/movieApi";

const Categories = () => {
  const { data: response } = useCategoriesQuery();
  const genres = response?.data || [];

  return (
    <section className="py-24 container mx-auto px-4">
       <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 border-l-4 border-primary pl-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Browse by{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              Genre
            </span>
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Discover movies tailored to your taste.
          </p>
        </div>

        <Link
          href="/movies"
          className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest hover:text-primary transition-all"
        >
          View All
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {genres.map((genre: any, idx: number) => (
          <Link
            key={idx || genre.name}
            href={`/movies?category=${genre.name}`}
            className="
              relative group 
              h-24 flex items-center justify-center
              rounded-2xl 
              border border-white/10 
              bg-white/5 backdrop-blur-xl
              overflow-hidden
              transition-all duration-500
              hover:scale-[1.05] hover:-translate-y-2
              hover:border-primary/50
              hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]
            "
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl" />

            {/* Content */}
            <h3 className="relative z-10 text-lg md:text-xl font-bold tracking-wide text-white group-hover:text-primary transition">
              {genre.name}
            </h3>

            {/* Animated border line */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;