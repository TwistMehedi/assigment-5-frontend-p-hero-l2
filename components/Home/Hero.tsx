"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center transition-colors duration-500">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-white/40 dark:bg-black/60 transition-colors" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 px-4 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 rounded-full">
            New Release
          </span>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-6 leading-tight">
            Unlimited <span className="text-primary">Movies</span>, <br />
            TV Shows, & More.
          </h1>

          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Discover the best movies and series from around the globe. Rate,
            review, and build your ultimate watchlist today.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
