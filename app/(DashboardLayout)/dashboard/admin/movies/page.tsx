"use client";

import React, { useState, useEffect } from "react";
import { 
  CheckCircle, 
  XCircle, 
  Play, 
  Eye, 
  Clock, 
  Film,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Movie {
  id: string;
  title: string;
  creator: string;
  category: string;
  thumbnail: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

const mockMovies: Movie[] = [
  { id: "1", title: "Inception 2", creator: "Christopher Nolan", category: "Sci-Fi", thumbnail: "/api/placeholder/160/90", status: "PENDING", createdAt: "2026-03-20" },
  { id: "2", title: "The Dark Knight", creator: "Warner Bros", category: "Action", thumbnail: "/api/placeholder/160/90", status: "PENDING", createdAt: "2026-03-21" },
  { id: "3", title: "Interstellar", creator: "Syncopy", category: "Adventure", thumbnail: "/api/placeholder/160/90", status: "PENDING", createdAt: "2026-03-22" },
];

export default function MovieApprovalPage() {
  const [mounted, setMounted] = useState(false);
  const [movies, setMovies] = useState<Movie[]>(mockMovies);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAction = (id: string, newStatus: "APPROVED" | "REJECTED") => {
    // Production-e ekhane API call hobe
    setMovies(prev => prev.filter(m => m.id !== id));
    console.log(`Movie ${id} marked as ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black uppercase tracking-tight text-[var(--foreground)]">
          Movie Approvals
        </h1>
        <div className="flex items-center gap-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest">
          <Clock size={14} />
          {movies.length} Movies Waiting for Review
        </div>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-all group"
            >
              {/* Thumbnail Preview */}
              <div className="relative h-24 w-40 rounded-xl overflow-hidden bg-[var(--muted)] shrink-0">
                <img 
                  src={movie.thumbnail} 
                  alt={movie.title} 
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Play size={24} className="text-white fill-white" />
                </div>
              </div>

              {/* Movie Info */}
              <div className="flex-1 space-y-1 text-center md:text-left">
                <h3 className="font-black text-lg leading-none uppercase tracking-tight">
                  {movie.title}
                </h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                  <span className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase flex items-center gap-1">
                    <Film size={12} /> {movie.category}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase flex items-center gap-1">
                    <Eye size={12} /> By {movie.creator}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase">
                    📅 {movie.createdAt}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => handleAction(movie.id, "REJECTED")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-bold text-xs uppercase transition-all"
                >
                  <XCircle size={16} /> Reject
                </button>
                <button 
                  onClick={() => handleAction(movie.id, "APPROVED")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white font-bold text-xs uppercase transition-all shadow-sm"
                >
                  <CheckCircle size={16} /> Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-[var(--border)] rounded-3xl opacity-50">
          <AlertCircle size={40} className="mb-2" />
          <p className="font-bold uppercase tracking-widest text-sm">Everything is Clear!</p>
          <p className="text-xs">No pending movies to approve at the moment.</p>
        </div>
      )}
    </div>
  );
}