"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const RatingSystem = ({ onRate }: { onRate: (rating: number) => void }) => {
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex items-center gap-1.5">
      {[...Array(10)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            type="button"
            className="transition-transform hover:scale-125 focus:outline-none"
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => {
              setSelected(ratingValue);
              onRate(ratingValue);
            }}
          >
            <Star
              className={cn(
                "h-6 w-6 md:h-8 md:w-8 transition-colors",
                ratingValue <= (hover || selected)
                  ? "fill-yellow-500 text-yellow-500"
                  : "fill-transparent text-slate-300 dark:text-slate-700",
              )}
            />
          </button>
        );
      })}
      <span className="ml-4 font-black text-2xl text-primary">
        {selected > 0 ? selected : hover > 0 ? hover : "0"}
        <span className="text-sm text-muted-foreground font-normal">/10</span>
      </span>
    </div>
  );
};

export default RatingSystem;
