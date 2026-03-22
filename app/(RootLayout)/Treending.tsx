import HomeMovieCard from "@/components/Home/HomeMovieCard";
import React from "react";

const trendingMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    rating: "9.0",
    category: "Action",
    image:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Interstellar",
    rating: "8.7",
    category: "Sci-Fi",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Inception",
    rating: "8.8",
    category: "Thriller",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "The Joker",
    rating: "8.4",
    category: "Drama",
    image:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    rating: "8.4",
    category: "Action",
    image:
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=500&auto=format&fit=crop",
  },
];

const Treending = () => {
  return (
    <div className="container mx-auto px-4 py-12 relative z-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Trending Now
          </h2>
          <div className="h-1 w-12 bg-primary mt-1 rounded-full" />
        </div>
        <button className="text-sm font-semibold text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
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
