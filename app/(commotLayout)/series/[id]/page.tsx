"use client";

import React, { useMemo, useState } from "react";
import {
  Star,
  Tv,
  Calendar,
  ShoppingCart,
  Loader2,
  Users,
  PlayCircle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSeriesQuery } from "@/redux/api/series.api";
import { useParams, useRouter } from "next/navigation";
import { useCheckPurchaseQuery } from "@/redux/api/payment.api";
import ReviewSection from "@/components/ReviewSection";
import WatchList from "@/components/shared/WatchList";

const SeriesDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const [selectedSeason, setSelectedSeason] = useState<any>(null);

  const {
    data: response,
    isLoading: isSeriesLoading,
    refetch,
  } = useSeriesQuery<any>(id);
  const series = response?.data;

  const { data: checkResponse, isLoading: isCheckLoading } =
    useCheckPurchaseQuery(id as string, {
      skip: !id,
    });

  const isPurchased = useMemo(() => {
    if (isCheckLoading || !checkResponse?.success || !checkResponse?.data)
      return false;
    const data = checkResponse.data;
    return data.itemId === id && data.status === "COMPLETED";
  }, [checkResponse, id, isCheckLoading]);

  const handleAction = () => {
    if (isPurchased || !series?.isPremium) {
      router.push(`/series/watch/${id}`);
    } else {
      router.push(`/checkout/${id}?type=series`);
    }
  };

  const handleSeasonClick = (season: any) => {
    if (isPurchased || !series?.isPremium) {
      setSelectedSeason(season);
      window.scrollTo({ top: 800, behavior: "smooth" });
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
      <div className="text-center py-20 font-black">Series not found!</div>
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
              <h1 className="text-4xl md:text-7xl font-black uppercase italic leading-none">
                {series?.title}
              </h1>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 items-center text-xs font-bold uppercase">
                <span className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                  <Star className="h-3 w-3 fill-current" />{" "}
                  {series?.averageRating}/10 Rating
                </span>
                <span className="flex items-center gap-1 text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  <Tv className="h-3 w-3" /> {series?.seasons?.length || 0}{" "}
                  Seasons
                </span>
              </div>
              <p className="text-sm md:text-lg text-muted-foreground max-w-3xl font-medium">
                {series?.description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 border-l-4 border-primary pl-4">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                  Explore Seasons
                </h3>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {series?.seasons?.map((s: any) => (
                  <div
                    key={s.id}
                    className={`space-y-2 group cursor-pointer transition-all ${selectedSeason?.id === s.id ? "scale-105" : ""}`}
                    onClick={() => handleSeasonClick(s)}
                  >
                    <div
                      className={`relative aspect-[2/3] rounded-xl overflow-hidden border transition-all duration-300 shadow-lg bg-muted ${selectedSeason?.id === s.id ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary"}`}
                    >
                      <img
                        src={s.posterUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={s.title}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                        <PlayCircle size={32} className="text-primary" />
                      </div>
                    </div>
                    <p className="text-[11px] font-bold uppercase text-center truncate text-muted-foreground group-hover:text-primary transition-colors">
                      {s.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {(isPurchased || !series?.isPremium) && selectedSeason && (
              <div className="space-y-6 pt-10 border-t border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black uppercase italic text-primary">
                    {selectedSeason.title} - Episodes
                  </h3>
                  <span className="text-xs font-bold bg-muted px-3 py-1 rounded-full">
                    {selectedSeason.episodes?.length || 0} Episodes Available
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {selectedSeason.episodes?.map((episode: any) => (
                    <div
                      key={episode.id}
                      onClick={() =>
                        router.push(`/series/watch/${id}?episode=${episode.id}`)
                      }
                      className="group flex items-center gap-4 p-3 rounded-xl border border-border bg-card hover:border-primary hover:bg-muted/50 transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-lg text-primary font-black group-hover:bg-primary group-hover:text-black transition-colors">
                        {episode.episodeNumber}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold uppercase group-hover:text-primary transition-colors">
                          {episode.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {episode.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-bold uppercase">
                          Watch Now
                        </span>
                        <PlayCircle size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl sticky top-24">
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-black uppercase italic truncate">
                    Access Premium Content
                  </h3>
                  <span
                    className={`px-4 py-2 rounded-xl shadow-md italic text-xs font-black ${isPurchased ? "bg-green-500 text-white" : "bg-primary text-black"}`}
                  >
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
                  className={`w-full cursor-pointer h-14 rounded-2xl font-black text-xs gap-3 uppercase tracking-widest ${isPurchased || !series?.isPremium ? "bg-green-600 hover:bg-green-700 text-white" : "bg-primary hover:bg-white text-black"}`}
                >
                  {isCheckLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : isPurchased || !series?.isPremium ? (
                    <>
                      <CheckCircle size={20} /> Start Watching
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} /> Buy Full Series
                    </>
                  )}
                </Button>

                {(isPurchased || !series?.isPremium) && (
                  <WatchList
                    itemId={id as string}
                    type="SERIES"
                    refetch={refetch}
                  />
                )}

                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.2em]">
                    <Users size={14} /> Star Cast
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {series?.cast?.map((actor: string) => (
                      <span
                        key={actor}
                        className="text-[10px] bg-muted/50 px-3 py-1.5 rounded-lg font-bold border border-border/50 uppercase"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ReviewSection
              itemId={id as string}
              type="SERIES"
              refetch={refetch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
