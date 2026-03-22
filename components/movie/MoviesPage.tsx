"use client";

import React, { useState } from "react";
import HomeMovieCard from "@/components/Home/HomeMovieCard";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

// রিকোয়ারমেন্ট অনুযায়ী ডামি ডাটা (পরবর্তীতে ডাটাবেস থেকে আসবে)
const allMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    rating: 9.0,
    category: "Action",
    image:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=500",
  },
  {
    id: 2,
    title: "Interstellar",
    rating: 8.7,
    category: "Sci-Fi",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500",
  },
  {
    id: 3,
    title: "Inception",
    rating: 8.8,
    category: "Thriller",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500",
  },
  {
    id: 4,
    title: "The Joker",
    rating: 8.4,
    category: "Drama",
    image:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=500",
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    rating: 8.4,
    category: "Action",
    image:
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=500",
  },
  {
    id: 6,
    title: "Parasite",
    rating: 8.6,
    category: "Drama",
    image:
      "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?q=80&w=500",
  },
  {
    id: 7,
    title: "The Martian",
    rating: 8.0,
    category: "Sci-Fi",
    image:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=500",
  },
  {
    id: 8,
    title: "Blade Runner 2049",
    rating: 8.0,
    category: "Sci-Fi",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500",
  },
];

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Action", "Sci-Fi", "Drama", "Thriller"];

  // Filter Logic
  const filteredMovies = allMovies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 container mx-auto px-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            Explore <span className="text-primary">Movies</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover and rate your favorite titles ({filteredMovies.length})
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title..."
              className="pl-10 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap border ${
                  selectedCategory === cat
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-card hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <HomeMovieCard key={movie.id} {...movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border">
          <p className="text-muted-foreground text-lg">
            No movies found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 text-primary font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
