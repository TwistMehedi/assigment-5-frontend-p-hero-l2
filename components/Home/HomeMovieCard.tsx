"use client";

import React from "react";
import Image from "next/image";
import { Star, Play } from "lucide-react";
import { motion } from "framer-motion";

interface MovieProps {
  title: string;
  image: string;
  rating: number;
  category: string;
}

const HomeMovieCard = ({ title, image, rating, category }: MovieProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-border"
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-primary p-3 rounded-full scale-50 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-6 w-6 text-white fill-current" />
          </div>
        </div>
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          <span className="text-xs font-bold text-white">{rating}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">
          {category}
        </p>
        <h3 className="font-bold text-sm md:text-base line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default HomeMovieCard;
