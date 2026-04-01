"use client";

import { useParams, useSearchParams } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useMovieQuery } from "@/redux/api/movieApi";
import PaymentButton from "@/components/Payment/PaymentButton";
import { useSeriesQuery } from "@/redux/api/series.api";

const CheckoutPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const itemType = (searchParams.get("type") || "movie") as "movie" | "series";

  const movieQuery = useMovieQuery(id as string, {
    skip: itemType !== "movie",
  });
  const seriesQuery = useSeriesQuery(id as string, {
    skip: itemType !== "series",
  });

  const isLoading =
    itemType === "movie" ? movieQuery.isLoading : seriesQuery.isLoading;
  const item =
    itemType === "movie" ? movieQuery.data?.data : seriesQuery.data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground uppercase font-black">
        Item details not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-black mb-8 uppercase italic tracking-tighter">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-xl shadow-black/5">
            <img
              src={item?.posterUrl || item?.thumbnailUrl}
              alt={item?.title}
              className="rounded-xl mb-4 w-full aspect-video object-cover"
            />
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded uppercase font-black tracking-widest">
                {itemType}
              </span>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-tight">
              {item?.title}
            </h2>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
              <span className="text-muted-foreground text-sm font-bold uppercase tracking-widest">
                Total Price:
              </span>
              <p className="text-primary font-black text-2xl">
                ${item?.price || 0}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-muted/30 p-8 rounded-2xl border border-dashed border-primary/30 flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 mb-4 font-black text-xl uppercase italic">
                <ShieldCheck className="text-primary" /> Secure Gateway
              </div>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed font-medium">
                You are about to get lifetime access to{" "}
                <span className="text-foreground font-bold">{item?.title}</span>
                . Payments are processed securely via Stripe.
              </p>

              <PaymentButton
                itemId={item?._id || item?.id}
                itemType={itemType}
                price={item?.price}
                title={item?.title}
              />

              <div className="mt-6 flex items-center justify-center gap-4 opacity-50 grayscale">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                  alt="Stripe"
                  className="h-5"
                />
              </div>

              <p className="text-[10px] text-center mt-4 text-muted-foreground uppercase font-bold tracking-widest">
                No extra taxes or hidden fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
