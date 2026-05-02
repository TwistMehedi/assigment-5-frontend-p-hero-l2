"use client";

import React, { useMemo } from "react";
import {
  Star,
  Play,
  Lock,
  Unlock,
  ShoppingCart,
  Loader2,
  PlayCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IMovieResponse } from "@/types/interface/movie.interface";
import { useCheckPurchaseQuery } from "@/redux/api/payment.api";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import WatchList from "../shared/WatchList";

const HomeMovieCard = ({
  id,
  title,
  thumbnailUrl,
  genre,
  price,
  rating,
  isPremium,
  channels,
  user,
  videoUrl,
}: IMovieResponse) => {
  const router = useRouter();

  const {
    data: checkResponse,
    isLoading: isCheckLoading,
    refetch,
  } = useCheckPurchaseQuery(id);

  const isPurchased = useMemo(() => {
    if (!checkResponse?.data) return false;
    return (
      checkResponse.data === true ||
      checkResponse.data?.itemId === id ||
      checkResponse.data?.isPurchased === true
    );
  }, [checkResponse, id]);

   const handleMovieAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPurchased || !isPremium) {
      if (videoUrl && videoUrl.startsWith("http")) {
        window.open(videoUrl, "_blank");
      } else {
        router.push(`/watch/${id}`);
      }
    } else {
      router.push(`/checkout/${id}?type=movie`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border cursor-pointer"
    >
      <div className="relative aspect-[18/19] overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute top-3 left-3 z-10">
          {isPremium && !isPurchased ? (
            <div className="flex items-center gap-1 bg-primary text-black text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase">
              <Lock size={12} className="fill-current" /> Premium
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase">
              <Unlock size={12} className="fill-current" />{" "}
              {isPurchased ? "Owned" : "Free"}
            </div>
          )}
        </div>

        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md text-yellow-400 text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
            <Star size={12} className="fill-yellow-400" />
            <span className="text-white">{rating}/10</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <div className="bg-primary p-4 rounded-full scale-50 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
            <Play className="h-8 w-8 text-black fill-current" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[10px] uppercase tracking-widest text-primary font-black">
            {genre}
          </p>
          {isPremium && !isPurchased && (
            <p className="text-xs font-black text-white bg-white/10 px-2 py-0.5 rounded">
              ${price}
            </p>
          )}
        </div>
        <Link href={`/movies/${id}`}>
          <h3 className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors uppercase mb-4 tracking-tight">
            {title}
          </h3>
        </Link>

        {user?.name && (
          <p className="text-muted-foreground text-xs font-medium">
            {user?.name}
          </p>
        )}

        <div className="flex items-center gap-2">
           <Button
            onClick={handleMovieAction}
            disabled={isCheckLoading}
            className={`flex-1 cursor-pointer min-w-0 h-10 whitespace-nowrap rounded-lg font-bold text-[11px] uppercase flex items-center justify-center gap-2 ${
              isPurchased || !isPremium
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-primary text-black hover:bg-primary/90"
            }`}
          >
            {isPurchased || !isPremium ? "Watch" : "Buy"}
          </Button>

           {(isPurchased || !isPremium) && (
            <div className="shrink-0">
              <WatchList itemId={id} type="MOVIE" refetch={refetch} />
            </div>
          )}

           <Link
            href={`/movies/${id}`}
            className="shrink-0 px-3 h-10 flex items-center justify-center text-[11px] font-bold uppercase rounded-lg border border-border hover:bg-white/10 transition whitespace-nowrap"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeMovieCard;
