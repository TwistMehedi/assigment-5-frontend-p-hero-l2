"use client";

import React, { useState } from "react";
import {
  Star,
  Play,
  Clock,
  Calendar,
  Globe,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingSystem from "@/components/movie/RatingSystem";

const MovieDetailsPage = ({ params }: { params: { id: string } }) => {
  const movie = {
    title: "The Dark Knight",
    rating: 9.0,
    year: "2008",
    duration: "2h 32m",
    genre: "Action, Crime, Drama",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    director: "Christopher Nolan",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
    image:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1200",
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-[50vh] md:h-[70vh] w-full">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 mt-[-150px] relative z-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/3 shrink-0">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>
            <Button className="w-full mt-6 h-14 text-lg font-bold gap-2 shadow-lg shadow-primary/20">
              <Play className="fill-current" /> Watch Movie
            </Button>
          </div>

          <div className="flex-grow space-y-6">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white">
              {movie.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm font-bold">
              <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full">
                <Star className="h-4 w-4 fill-current" /> {movie.rating} / 10
              </span>
              <span className="flex items-center gap-1 bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full text-muted-foreground">
                <Calendar className="h-4 w-4" /> {movie.year}
              </span>
              <span className="flex items-center gap-1 bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full text-muted-foreground">
                <Clock className="h-4 w-4" /> {movie.duration}
              </span>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {movie.description}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-bold">
                  Director
                </p>
                <p className="font-semibold">{movie.director}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-bold">
                  Cast
                </p>
                <p className="font-semibold">{movie.cast}</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-4 mt-8">
              <div className="flex items-center gap-2 font-black text-xl italic">
                <MessageSquare className="text-primary" /> RATE & REVIEW
              </div>

              <p className="text-sm text-muted-foreground">
                How would you rate this movie? (1 is poor, 10 is masterpiece)
              </p>

              <RatingSystem onRate={(val) => console.log("User rated:", val)} />

              <textarea
                className="w-full h-32 p-4 bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                placeholder="Write your thoughts about this movie..."
              />

              <Button
                variant="outline"
                className="font-bold border-primary text-primary hover:bg-primary hover:text-white transition-all"
              >
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
