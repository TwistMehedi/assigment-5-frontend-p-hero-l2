"use client";

import React from "react";
import { Star, Play, Lock, Unlock, ShoppingCart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IMovieResponse } from "@/types/interface/movie.interface";
import PaymentButton from "../Payment/PaymentButton";

const HomeMovieCard = ({
  id,
  title,
  thumbnailUrl,
  genre,
  price,
  isPremium,
  videoUrl,
}: IMovieResponse) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-border cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {isPremium ? (
            <div className="flex items-center gap-1 bg-primary text-black text-[9px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-tighter">
              <Lock size={10} className="fill-current" />
              Premium
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-green-500 text-white text-[9px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-tighter">
              <Unlock size={10} className="fill-current" />
              Free
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-primary p-3 rounded-full scale-50 group-hover:scale-100 transition-transform duration-300 shadow-xl shadow-primary/40">
            <Play className="h-6 w-6 text-black fill-current" />
          </div>
        </div>

        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          <span className="text-xs font-bold text-white">4.5</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[10px] uppercase tracking-widest text-primary font-black">
            {genre}
          </p>
          {isPremium && (
            <p className="text-[10px] font-black text-white bg-white/10 px-1.5 rounded">
              ${price}
            </p>
          )}
        </div>

        <Link href={`/movies/${id}`}>
          <h3 className="font-bold text-sm md:text-base line-clamp-1 group-hover:text-primary transition-colors uppercase tracking-tight mb-3">
            {title}
          </h3>
        </Link>

        <div className="flex flex-col gap-2 mt-2">
          {isPremium ? (
            // <Link href={`/checkout/${id}`}>
            //   <motion.button
            //     whileTap={{ scale: 0.95 }}
            //     className="w-full bg-primary hover:bg-primary/90 text-black text-[10px] font-black py-2 rounded-lg flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
            //   >
            //     <ShoppingCart size={14} />
            //     Buy Now
            //   </motion.button>
            // </Link>
            <PaymentButton
              itemId={id}
              itemType="movie"
              price={price}
              title={title}
            />
          ) : (
            <Link href={`/movies/${id}`}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-green-500 hover:bg-green-600 text-white text-[10px] font-black py-2 rounded-lg flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
              >
                <Eye size={14} />
                Watch Now
              </motion.button>
            </Link>
          )}

          <Link
            href={`/movies/${id}`}
            className="text-center text-[9px] uppercase font-black text-muted-foreground hover:text-primary transition-colors py-1"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeMovieCard;
