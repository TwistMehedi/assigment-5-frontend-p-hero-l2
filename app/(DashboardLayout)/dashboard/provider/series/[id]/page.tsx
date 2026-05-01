"use client";

import React, { useState } from "react";
import { useSingleSeriesQuery } from "@/redux/api/series.api";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Play,
  Info,
  Calendar,
  User,
  Tag,
  DollarSign,
  Loader2,
  Undo2,
  Lock,
  Clapperboard,
  Users,
  Film,
} from "lucide-react";
import Image from "next/image";
import { ISeason } from "@/types/interface/series.interface";
import AddSeasonModal from "@/components/Series/Season/AddSeasonModal";
import Link from "next/link";

const SingleSeries = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: seriesResponse, isLoading: isFetching } = useSingleSeriesQuery(
    id as string,
  );

  const series = seriesResponse?.data;

  console.log(series);
  if (isFetching) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-[var(--background)]">
        <Loader2 className="animate-spin text-[var(--primary)]" size={48} />
        <p className="text-xs font-black uppercase tracking-[0.3em] opacity-50">
          Loading Series...
        </p>
      </div>
    );
  }

  if (!series) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-black uppercase">Series Not Found</h2>
        <button
          onClick={() => router.back()}
          className="text-[10px] font-bold uppercase bg-[var(--muted)] px-6 py-2 rounded-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pb-20">
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={series.posterUrl || ""}
            alt={series.title || "Series Poster"}
            fill
            className="object-cover opacity-40 blur-[2px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-8 items-end"
          >
            <div className="hidden md:block w-64 h-96 relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
              <Image
                src={series.posterUrl || ""}
                alt={series.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-2">
                {series.isPremium && (
                  <span className="bg-[var(--primary)] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase flex items-center gap-1">
                    <Lock size={12} /> Premium
                  </span>
                )}
                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  {series.genre}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                {series.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-white/70 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-[var(--primary)]" />{" "}
                  {new Date(series.releaseDate).getFullYear()}
                </span>
                <span className="flex items-center gap-2">
                  <User size={16} className="text-[var(--primary)]" />{" "}
                  {series.director}
                </span>
                <span className="flex items-center gap-2 font-black text-[var(--primary)]">
                  <DollarSign size={16} />{" "}
                  {series.price === 0 ? "FREE" : series.price}
                </span>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/20 transition-all"
                >
                  <Undo2 size={18} /> Back
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
              <Info className="text-[var(--primary)]" /> Storyline
            </h3>
            <p className="text-white/60 leading-relaxed text-lg italic">
              {series.description}
            </p>
          </section>

          <section className="p-6 md:p-8 bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] border-dashed">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                <Clapperboard size={20} className="text-[var(--primary)]" />
                All Seasons
              </h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-[var(--primary)] text-black px-6 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--primary)]/20"
              >
                Add Season
              </button>
            </div>

            <AddSeasonModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              seriesId={id as string}
              nextSeasonNumber={(series?.seasons?.length || 0) + 1}
            />

            <div className="flex flex-col gap-4">
              {series?.seasons && series?.seasons.length > 0 ? (
                series.seasons.map((season: ISeason, index: number) => (
                  <div
                    key={season.id}
                    className="group relative w-full p-4 bg-[var(--muted)]/40 border border-[var(--border)] rounded-2xl flex items-center justify-between hover:border-[var(--primary)]/30 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
                      {season.posterUrl && (
                        <Image
                          src={season.posterUrl || ""}
                          alt={season.title || "Season"}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-4 z-10">
                      <div className="relative w-14 h-20 rounded-xl overflow-hidden bg-black/20 shrink-0 border border-white/5">
                        {season.posterUrl ? (
                          <Image
                            src={season.posterUrl || ""}
                            alt={season.title || "Season"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-[var(--muted-foreground)]">
                            <Film size={20} />
                          </div>
                        )}
                      </div>

                      <div className="text-left">
                        <p className="font-black uppercase text-sm group-hover:text-[var(--primary)] transition-colors">
                          {season.title || `Season ${season.seasonNumber}`}
                        </p>
                        <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-1">
                          {season.episodes?.length || 0} Episodes • Season{" "}
                          {season.seasonNumber}
                        </p>
                        <Link
                          href={`/dashboard/provider/series/${id}/seasons/${season.id}`}
                          className="text-[10px] font-black uppercase text-[var(--primary)] hover:underline"
                        >
                          View Episodes
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 z-10">
                      <span className="hidden sm:block text-[10px] font-black uppercase bg-white/5 px-3 py-1 rounded-full opacity-40">
                        #S{season.seasonNumber}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 flex flex-col items-center gap-2 opacity-40">
                  <Clapperboard size={32} />
                  <p className="text-xs font-bold uppercase tracking-widest">
                    No seasons available.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] p-8">
            <h4 className="text-sm font-black uppercase mb-6 flex items-center gap-2 border-b border-[var(--border)] pb-4">
              <Users size={16} className="text-[var(--primary)]" /> Starring
              Cast
            </h4>
            <div className="space-y-4">
              {Array.isArray(series.cast) ? (
                series.cast.map((actor: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-[var(--muted)] rounded-full flex items-center justify-center text-[var(--primary)] font-black text-xs group-hover:bg-[var(--primary)] group-hover:text-black transition-colors">
                      {actor.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-white/80 group-hover:text-white">
                      {actor}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[var(--muted-foreground)]">
                  No cast information available.
                </p>
              )}
            </div>
          </div>

          <div className="bg-[var(--muted)]/30 rounded-[2.5rem] p-8 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase opacity-40">
                Status
              </span>
              <span className="text-[10px] font-black uppercase text-green-500">
                Published
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase opacity-40">
                Series ID
              </span>
              <span className="text-[10px] font-mono opacity-60">
                #{series.id.slice(0, 8)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSeries;
