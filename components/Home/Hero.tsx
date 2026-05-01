"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const images = [
  "https://i.ibb.co.com/cSy9FFwJ/photo-1626814026160-2237a95fc5a0.avif",
  "https://i.ibb.co.com/1tD2qMFp/photo-1489599849927-2ee91cede3ba.avif",
  "https://i.ibb.co.com/FLLqYzHW/photo-1517604931442-7e0c8ed2963c.avif",
  "https://i.ibb.co.com/fdw18VJR/photo-1478720568477-152d9b164e26.avif",
  "https://i.ibb.co.com/rGdDpxwc/photo-1524712245354-2c4e5e7121c0.avif",
  "https://i.ibb.co.com/bgXYbFqs/photo-1594909122845-11baa439b7bf.avif",
  "https://i.ibb.co.com/8L2h9xSq/photo-1440404653325-ab127d49abc1.avif",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/60" />

      <div className="container relative z-10 px-4 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 rounded-full">
            New Release
          </span>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Unlimited <span className="text-primary">Movies</span>, <br />
            TV Shows, & More.
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            Discover the best movies and series from around the globe. Rate,
            review, and build your ultimate watchlist today.
          </p>

          <div className="flex gap-4 justify-center md:justify-start">
            <Link
              href="/movies"
              className="bg-primary cursor-pointer px-6 py-3 text-white rounded-xl hover:scale-105 transition dark:bg-green-600"
            >
              Explore Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
