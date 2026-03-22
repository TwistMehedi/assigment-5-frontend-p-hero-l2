import HomeMovieCard from "@/components/Home/HomeMovieCard";
import React from "react";

const trendingMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    rating: 9.0, // 1-10 Scale
    reviews: 1250,
    category: "Action",
    image:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=500",
  },
  {
    id: 2,
    title: "Interstellar",
    rating: 8.7,
    reviews: 980,
    category: "Sci-Fi",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500",
  },
  {
    id: 3,
    title: "Inception",
    rating: 8.8,
    reviews: 1100,
    category: "Thriller",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500",
  },
  {
    id: 4,
    title: "The Joker",
    rating: 8.4,
    reviews: 850,
    category: "Drama",
    image:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=500",
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    rating: 8.4,
    reviews: 2100,
    category: "Action",
    image:
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=500",
  },
];

const Treending = () => {
  return (
    <div className="container mx-auto px-4 mt-16 relative z-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Trending <span className="text-primary">Movies</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Most rated movies this week
          </p>
        </div>
        <button className="px-5 py-2 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all">
          Explore All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {trendingMovies.map((movie) => (
          <HomeMovieCard
            key={movie.id}
            title={movie.title}
            image={movie.image}
            rating={movie.rating}
            category={movie.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Treending;
