"use client";

import React from "react";
import { Star, Quote, Clapperboard, MonitorPlay } from "lucide-react";
import { motion } from "framer-motion";
import { useAllReviewsTestimonialQuery } from "@/redux/api/review.api";
import Link from "next/link";
import CardSkeleton from "../shared/CardSkeleton";

const Testimonials = () => {
  const { data: reviewsResponse, isLoading } = useAllReviewsTestimonialQuery(
    {},
  );
  const reviews = reviewsResponse?.data || [];

  if (isLoading) {
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>;
  }

  return (
    <section className=" bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="pt-24 container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-black uppercase tracking-[0.3em] text-[10px] bg-primary/10 px-4 py-2 rounded-full"
          >
            Community Voices
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic"
          >
            What Our <span className="text-primary">Watchers</span> Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews?.slice(0, 8).map((review: any, index: number) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border/50 p-8 rounded-[32px] relative group hover:border-primary/30 transition-all duration-500"
            >
              <Link
                href={
                  review?.media
                    ? `/movies/${review.mediaId}`
                    : `/series/${review.seriesId}`
                }
              >
                <Quote
                  className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors"
                  size={40}
                />

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${i < review.rating ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground font-medium italic mb-8 leading-relaxed">
                  "{review?.content}"
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                  <div>
                    <h4 className="font-black text-sm tracking-wider">
                      {review?.tags}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      {review?.media ? (
                        <Clapperboard size={12} className="text-primary" />
                      ) : (
                        <MonitorPlay size={12} className="text-primary" />
                      )}
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                        Reviewed: {review.media?.title || review.series?.title}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
