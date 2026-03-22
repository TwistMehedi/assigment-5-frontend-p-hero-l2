import React from "react";
import { Clapperboard, Monitor, Skull, Rocket, Heart, Zap } from "lucide-react";

const genres = [
  {
    name: "Action",
    icon: <Zap />,
    count: "120+ Movies",
    color: "bg-orange-500",
  },
  {
    name: "Sci-Fi",
    icon: <Rocket />,
    count: "80+ Movies",
    color: "bg-blue-500",
  },
  {
    name: "Horror",
    icon: <Skull />,
    count: "45+ Movies",
    color: "bg-purple-500",
  },
  { name: "Drama", icon: <Heart />, count: "200+ Movies", color: "bg-red-500" },
  {
    name: "TV Series",
    icon: <Monitor />,
    count: "60+ Series",
    color: "bg-green-500",
  },
  {
    name: "Documentary",
    icon: <Clapperboard />,
    count: "30+ Films",
    color: "bg-yellow-500",
  },
];

const Categories = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight">
          Browse by <span className="text-primary">Genre</span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Find your favorite movies by category
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {genres.map((genre, i) => (
          <div
            key={i}
            className="group cursor-pointer p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all text-center"
          >
            <div
              className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 text-white ${genre.color} group-hover:scale-110 transition-transform`}
            >
              {genre.icon}
            </div>
            <h3 className="font-bold text-lg">{genre.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{genre.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
