"use client";
import React, { useState } from "react";
import { Clock, Play, X } from "lucide-react";

export const EpisodeCard = ({ episode }: { episode: any }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowPlayer(true)}
        className="group cursor-pointer relative bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--primary)]/50 transition-all duration-300"
      >
        <div className="flex items-center p-4 gap-4">
          <div className="relative h-16 w-16 flex-shrink-0 bg-[var(--muted)] rounded-xl flex items-center justify-center overflow-hidden border border-[var(--border)]">
            <span className="text-xl font-black opacity-20 group-hover:opacity-0 transition-opacity">
              {episode.episodeNumber < 10
                ? `0${episode.episodeNumber}`
                : episode.episodeNumber}
            </span>
            <Play
              size={24}
              className="absolute text-[var(--primary)] opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all"
              fill="currentColor"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">
                EP {episode.episodeNumber}
              </span>
              <span className="text-[10px] opacity-30">•</span>
              <div className="flex items-center gap-1 opacity-40 text-[10px] font-bold uppercase">
                <Clock size={10} />
                {episode.duration} Min
              </div>
            </div>
            <h3 className="font-bold text-sm uppercase tracking-tight truncate">
              {episode.title}
            </h3>
            <p className="text-[10px] opacity-50 line-clamp-1 mt-1 font-medium">
              {episode.description || "No description available."}
            </p>
          </div>

          <div className="p-2 bg-[var(--muted)] rounded-full opacity-0 group-hover:opacity-100 hover:bg-[var(--primary)] hover:text-black transition-all">
            <Play size={16} fill="currentColor" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
      </div>

      {showPlayer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPlayer(false);
            }}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-red-500 rounded-full transition-all z-[110]"
          >
            <X size={24} className="text-white" />
          </button>

          <div className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <video
              controls
              autoPlay
              className="w-full h-full object-contain"
              src={episode.videoUrl}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
};
