"use client";

import { useMyPurchasedAllQuery } from "@/redux/api/user.api";
import {
  Loader2,
  PlayCircle,
  Film,
  Tv,
  Search,
  LayoutGrid,
  Clock,
} from "lucide-react";
import { useState } from "react";

const Library = () => {
  const { data: response, isLoading } = useMyPurchasedAllQuery({});
  const [searchQuery, setSearchQuery] = useState("");

  const purchases = response?.data || [];
  console.log(purchases)
  const filteredPurchases = purchases.filter((purchase: any) => {
    const title = purchase.media?.title || purchase.series?.title || "";
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary h-12 w-12" />
        <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
          Loading Your Collection...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-10 bg-background min-h-screen text-foreground">
      {/* Header Section: Responsive Flex */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
            <LayoutGrid size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Digital Assets
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase italic tracking-tighter leading-none">
            My Library
          </h1>
          <p className="text-muted-foreground font-medium text-sm sm:text-base">
            Your purchased movies and series.
          </p>
        </div>

        {/* Search Bar: Full width on mobile */}
        <div className="relative w-full md:w-72 lg:w-80">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            type="text"
            placeholder="Search library..."
            className="w-full bg-card border border-border rounded-2xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <hr className="border-border opacity-50" />

      {/* Content Grid: Responsive Columns */}
      {filteredPurchases.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredPurchases.map((purchase: any) => {
            const item = purchase.media || purchase.series;
            const isMovie = !!purchase.media;

            return (
              <div
                key={purchase.id}
                className="group relative bg-card border border-border rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-500"
              >
                {/* Image Section */}
                <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                  <img
                    src={
                      item?.thumbnail || "https://via.placeholder.com/400x225"
                    }
                    alt={item?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />

                  {/* Play Overlay: Simplified for mobile touch */}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-primary p-3 rounded-full shadow-xl">
                      <PlayCircle size={28} className="text-white fill-white" />
                    </div>
                  </div>

                  {/* Type Badge: Smaller on mobile */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="bg-background/90 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-border flex items-center gap-1.5 sm:gap-2">
                      {isMovie ? (
                        <Film size={12} className="text-primary" />
                      ) : (
                        <Tv size={12} className="text-orange-500" />
                      )}
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                        {isMovie ? "Movie" : "Series"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-black text-base sm:text-lg leading-tight uppercase italic tracking-tighter line-clamp-1 group-hover:text-primary transition-colors mb-4">
                    {item?.title || "Untitled"}
                  </h3>

                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock size={12} />
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-tight">
                        {new Date(purchase.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    <button className="bg-primary text-white md:bg-primary/10 md:text-primary md:hover:bg-primary md:hover:text-white px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase transition-all shadow-sm">
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State: Responsive Padding */
        <div className="flex flex-col items-center justify-center py-16 sm:py-32 text-center border-2 border-dashed border-border rounded-[2rem] sm:rounded-[3rem] bg-card/30 mx-2">
          <div className="bg-muted p-4 sm:p-6 rounded-full mb-4 sm:mb-6">
            <Film size={32} className="text-muted-foreground opacity-20" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-muted-foreground">
            {searchQuery ? "No matches found" : "Library is empty"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-[250px] sm:max-w-xs mx-auto px-4">
            {searchQuery
              ? "Try adjusting your search keywords."
              : "Items you buy will appear here."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Library;
