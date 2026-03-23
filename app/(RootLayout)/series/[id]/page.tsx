"use client";

import React, { useState } from "react";
import {
  Star,
  Play,
  Tv,
  Calendar,
  Info,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingSystem from "@/components/movie/RatingSystem";

const SeriesDetails = ({ params }: { params: { id: string } }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  const series = {
    title: "The Last of Us",
    description:
      "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    rating: 8.8,
    year: "2023",
    seasons: [
      {
        number: 1,
        episodes: [
          {
            id: 1,
            title: "When You're Lost in the Darkness",
            duration: "1h 21m",
          },
          { id: 2, title: "Infected", duration: "52m" },
          { id: 3, title: "Long, Long Time", duration: "1h 15m" },
        ],
      },
      {
        number: 2,
        episodes: [{ id: 4, title: "Coming Soon...", duration: "--" }],
      },
    ],
    genre: "Drama, Sci-Fi",
    image:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1200",
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-[45vh] md:h-[60vh] w-full">
        <img
          src={series.image}
          className="absolute inset-0 w-full h-full object-cover"
          alt={series.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 mt-[-100px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                {series.title}
              </h1>
              <div className="flex flex-wrap gap-4 items-center text-sm font-bold">
                <span className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-current" /> {series.rating} / 10
                </span>
                <span className="flex items-center gap-1 text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
                  <Tv className="h-4 w-4" /> {series.seasons.length} Seasons
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar size={16} /> {series.year}
                </span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {series.description}
              </p>
            </div>

            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <Info className="text-primary" size={20} /> Episodes
                </h3>
                <select
                  className="bg-background border border-border rounded-lg px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                >
                  {series.seasons.map((s) => (
                    <option key={s.number} value={s.number}>
                      Season {s.number}
                    </option>
                  ))}
                </select>
              </div>

              <div className="divide-y divide-border">
                {series.seasons
                  .find((s) => s.number === selectedSeason)
                  ?.episodes.map((ep, index) => (
                    <div
                      key={ep.id}
                      className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-black text-muted-foreground/30 group-hover:text-primary transition-colors">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm md:text-base">
                            {ep.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {ep.duration}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full group-hover:bg-primary group-hover:text-white"
                      >
                        <Play size={16} fill="currentColor" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-card p-8 rounded-3xl border border-border space-y-6">
              <h3 className="text-xl font-black italic flex items-center gap-2 uppercase tracking-tighter">
                <MessageSquare className="text-primary" /> Drop a Review
              </h3>
              <RatingSystem onRate={(val) => console.log("Rated:", val)} />
              <textarea
                placeholder="Share your thoughts on this series..."
                className="w-full h-32 p-4 bg-background border border-border rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
              />
              <Button className="font-bold px-8 rounded-xl shadow-lg shadow-primary/20">
                Submit Rating
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-background aspect-[2/3]">
              <img
                src={series.image}
                className="w-full h-full object-cover"
                alt="Poster"
              />
            </div>
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-3xl space-y-4">
              <p className="text-sm font-medium text-center italic">
                Subscribe to Premium to watch all episodes in 4K Ultra HD.
              </p>
              <Button className="w-full h-14 rounded-2xl font-black text-lg gap-2 shadow-xl shadow-primary/30">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
