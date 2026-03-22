import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SubscriptionCTA = () => {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 dark:bg-primary/10 p-12 text-center border border-white/10 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/20 blur-[120px] -z-10" />

        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
          Ready to watch your favorite{" "}
          <span className="text-primary">Movies?</span>
        </h2>
        <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
          Join thousands of movie lovers. Start your 7-day free trial or choose
          a premium plan today.
        </p>

        <Link href="/pricing">
          <Button
            size="lg"
            className="h-16 px-12 rounded-full text-xl font-black shadow-xl shadow-primary/40 hover:scale-105 transition-transform"
          >
            View All Plans
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default SubscriptionCTA;
