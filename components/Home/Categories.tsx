"use client";
import React from "react";
import Link from "next/link";
import { useCategoriesQuery } from "@/redux/api/movieApi";

const Categories = () => {
  const { data: response } = useCategoriesQuery();
  const genres = response?.data || [];

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-l-4 border-primary pl-6">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">
            Browse by <span className="text-primary">Genre</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-lg font-medium">
            Discover movies tailored to your taste.
          </p>
        </div>
        <Link
          href="/movies"
          className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
        >
          View All{" "}
          <span className="group-hover:translate-x-2 transition-transform">
            →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {genres.map((genre: any, idx: any) => (
          <Link
            key={idx || genre.name}
            href={`/movies?category=${genre.name}`}
            className="relative group h-40 flex flex-col justify-between p-6 rounded-3xl border border-border bg-gradient-to-br from-card to-card/50 hover:to-primary/10 hover:border-primary/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
          >
            <span className="absolute -right-4 -bottom-6 text-9xl font-black text-foreground/5 group-hover:text-primary/10 transition-colors pointer-events-none">
              {genre.name.charAt(0)}
            </span>

            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="w-10 h-1 bg-primary/20 group-hover:w-full group-hover:bg-primary transition-all duration-500 rounded-full" />

              <div>
                <h3 className="font-black text-2xl tracking-tight group-hover:text-primary transition-colors">
                  {genre.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1 bg-secondary/50 py-1 px-2 rounded-lg inline-block">
                  {genre.count || "0"}
                  
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
