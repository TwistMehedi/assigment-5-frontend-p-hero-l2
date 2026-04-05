"use client";

import React from "react";
import {
  Star,
  Clock,
  Calendar,
  MessageSquare,
  Loader2,
  AlertTriangle,
  ShoppingCart,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingSystem from "@/components/movie/RatingSystem";
import { useParams, useRouter } from "next/navigation";
import { useMovieQuery } from "@/redux/api/movieApi";
import { motion } from "framer-motion";
import { useCheckPurchaseQuery } from "@/redux/api/payment.api";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: response, isLoading, isError } = useMovieQuery(id);
  const movie = response?.data;

  const { data: checkResponse, isLoading: isCheckLoading } =
    useCheckPurchaseQuery(id as string, {
      skip: !id,
    });

  const isPurchased = checkResponse?.data?.isPurchased;

  const handleMovieAction = () => {
    if (isPurchased || !movie?.isPremium) {
      if (movie?.videoUrl && movie.videoUrl.startsWith("http")) {
        window.open(movie.videoUrl, "_blank");
      } else {
        router.push(`/watch/${id}`);
      }
    } else {
      router.push(`/checkout/${id}?type=movie`);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );

  if (isError || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <AlertTriangle className="h-16 w-16 text-destructive" />
        <h2 className="text-2xl font-bold uppercase tracking-tighter italic">
          Movie not found!
        </h2>
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-background text-foreground">
      <div className="relative h-[50vh] md:h-[75vh] w-full">
        <img
          src={movie.posterUrl || movie.thumbnailUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 mt-[-200px] relative z-10">
        <div className="flex flex-col md:flex-row gap-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full md:w-1/3 shrink-0"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-background bg-card">
              <img
                src={movie.thumbnailUrl}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>

            <div className="mt-6 space-y-4">
              <Button
                onClick={handleMovieAction}
                disabled={isCheckLoading}
                className={`w-full h-14 rounded-2xl font-black uppercase italic tracking-tighter gap-3 transition-all ${
                  isPurchased
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-primary text-black hover:bg-primary/90"
                }`}
              >
                {isCheckLoading ? (
                  <Loader2 className="animate-spin" />
                ) : isPurchased || !movie?.isPremium ? (
                  <>
                    <PlayCircle size={24} /> Watch Now
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} /> Buy Access for ${movie?.price}
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          <div className="flex-grow space-y-6 pt-10 md:pt-48">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic">
                {movie.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm font-bold">
                <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full uppercase">
                  <Star className="h-4 w-4 fill-current" /> 8.5 / 10
                </span>
                <span className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-muted-foreground uppercase">
                  <Calendar className="h-4 w-4" />{" "}
                  {new Date(movie.releaseDate).getFullYear()}
                </span>
                <span className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full uppercase">
                  {movie.genre}
                </span>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {movie.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-6 mt-12"
            >
              <div className="flex items-center gap-2 font-black text-2xl italic uppercase tracking-tighter">
                <MessageSquare className="text-primary h-7 w-7" /> Rate & Review
              </div>
              <RatingSystem onRate={(val) => console.log("Rated:", val)} />
              <textarea
                className="w-full h-32 p-4 bg-background border border-border rounded-2xl outline-none"
                placeholder="Share your thoughts..."
              />
              <Button
                variant="outline"
                className="font-black border-primary text-primary hover:bg-primary hover:text-white uppercase tracking-widest h-12 px-8"
              >
                Submit Review
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
