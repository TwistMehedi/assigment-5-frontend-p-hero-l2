"use client";

import React from "react";
import {
  Star,
  Tv,
  Calendar,
  ShoppingCart,
  Loader2,
  Users,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSeriesQuery } from "@/redux/api/series.api";
import { useParams, useRouter } from "next/navigation";
import { useCheckPurchaseQuery } from "@/redux/api/payment.api";

const SeriesDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: response, isLoading: isSeriesLoading } =
    useSeriesQuery<any>(id);
  const series = response?.data;

  console.log(series);
  const { data: checkResponse, isLoading: isCheckLoading } =
    useCheckPurchaseQuery(id as string, {
      skip: !id,
    });

  console.log(checkResponse);

  const isPurchased = checkResponse?.data?.isPurchased;
  console.log(isPurchased);

  const handleAction = () => {
    if (isPurchased || !series?.isPremium) {
      router.push(`/watch/${id}`);
    } else {
      router.push(`/checkout/${id}?type=series`);
    }
  };

  if (isSeriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!series)
    return (
      <div className="text-center py-20 font-bold uppercase tracking-widest text-destructive">
        Series not found!
      </div>
    );

  return (
    <div className="min-h-screen pb-20 bg-background text-foreground">
      <div className="relative h-[40vh] md:h-[60vh] w-full">
        <img
          src={series?.posterUrl}
          className="absolute inset-0 w-full h-full object-cover"
          alt={series?.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-20 md:-mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4 text-center lg:text-left">
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
                {series?.title}
              </h1>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 items-center text-xs font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                  <Star className="h-3 w-3 fill-current" /> 9.5 Rating
                </span>
                <span className="flex items-center gap-1 text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  <Tv className="h-3 w-3" /> {series?.seasons?.length} Seasons
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar size={14} />{" "}
                  {new Date(series?.releaseDate).getFullYear()}
                </span>
              </div>

              <p className="text-sm md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto lg:mx-0">
                {series?.description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 border-l-4 border-primary pl-4">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                  Available Seasons
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
                {series?.seasons?.map((s: any) => (
                  <div
                    key={s.id}
                    className="group relative aspect-[2/3] rounded-2xl overflow-hidden border border-border hover:border-primary transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    <img
                      src={s.posterUrl}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={s.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <PlayCircle size={40} className="text-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg sticky top-24">
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center gap-2">
                  <h3 className="text-sm font-black uppercase italic tracking-tighter text-foreground truncate">
                    {series?.title}
                  </h3>
                  <span className="bg-primary text-black font-black px-3 py-1.5 rounded-lg shadow-md italic text-xs shrink-0 transform rotate-2">
                    {isPurchased
                      ? "OWNED"
                      : series?.price > 0
                        ? `$${series?.price}`
                        : "FREE"}
                  </span>
                </div>

                <Button
                  onClick={handleAction}
                  disabled={isCheckLoading}
                  className={`w-full cursor-pointer h-12 rounded-lg font-bold text-sm gap-2 uppercase tracking-tight shadow-md transition-all active:scale-95 ${
                    isPurchased
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-primary text-black"
                  }`}
                >
                  {isCheckLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : isPurchased || !series?.isPremium ? (
                    <>
                      <PlayCircle size={18} /> Watch Now
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} /> Buy Series
                    </>
                  )}
                </Button>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-primary font-bold uppercase text-[10px] tracking-widest">
                    <Users size={12} /> Star Cast
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {series?.cast?.map((actor: string) => (
                      <span
                        key={actor}
                        className="text-[9px] bg-muted/50 px-2.5 py-1 rounded-md font-medium border border-border/50 uppercase"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
