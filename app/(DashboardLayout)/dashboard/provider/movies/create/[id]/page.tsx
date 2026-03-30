"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  useMyMovieQuery 
} from "@/redux/api/movieApi";
import { 
  Calendar, 
  Clock, 
  User, 
  Film, 
  Tag, 
  DollarSign, 
  ArrowLeft,
  PlayCircle,
  Clapperboard,
  Users
} from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();  
  const router = useRouter();

   
  const { data: response, isLoading, isError } = useMyMovieQuery(id as string);
  const movie = response?.data;


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)]">Loading Movie Details...</p>
        </div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-bold uppercase">Movie not found or error occurred!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-8">
     
      <div className="max-w-6xl mx-auto mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors mb-6 group text-xs font-black uppercase"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Library
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[var(--foreground)]">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${movie.isPremium ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                {movie.isPremium ? "Premium Content" : "Free Access"}
              </span>
              <div className="flex items-center gap-1 text-[var(--muted-foreground)] text-xs font-bold uppercase">
                <Tag size={14} /> {movie.genre}
              </div>
              <div className="flex items-center gap-1 text-[var(--muted-foreground)] text-xs font-bold uppercase">
                <Clock size={14} /> {movie.duration} Mins
              </div>
            </div>
          </div>
          <div className="text-2xl font-black text-[var(--primary)]">
            ${movie.price}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Video & Images */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player Section */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-[var(--border)] bg-black shadow-2xl group">
             <video 
               src={movie.videoUrl} 
               controls 
               poster={movie.posterUrl}
               className="w-full h-full object-contain"
             />
          </div>

          {/* Description */}
          <div className="bg-[var(--card)] p-6 md:p-8 rounded-3xl border border-[var(--border)]">
            <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
              <AlignLeftIcon size={18} className="text-[var(--primary)]" /> Storyline
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-sm">
              {movie.description}
            </p>
          </div>
        </div>

        {/* Right Column: Details & Poster */}
        <div className="space-y-6">
          {/* Poster Image */}
          <div className="bg-[var(--card)] p-3 rounded-3xl border border-[var(--border)] overflow-hidden">
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          {/* Metadata List */}
          <div className="bg-[var(--card)] p-6 rounded-3xl border border-[var(--border)] space-y-5">
            <DetailItem icon={<Clapperboard size={16}/>} label="Director" value={movie.director} />
            <DetailItem icon={<Calendar size={16}/>} label="Release Date" value={new Date(movie.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
            
            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-[10px] font-black uppercase text-[var(--muted-foreground)] mb-3 flex items-center gap-2">
                <Users size={14} /> Leading Cast
              </p>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor, index) => (
                  <span key={index} className="bg-[var(--muted)] text-[var(--foreground)] px-3 py-1.5 rounded-lg text-[11px] font-bold border border-[var(--border)]">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Details
const DetailItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-[var(--primary)]/10 rounded-lg text-[var(--primary)]">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black uppercase text-[var(--muted-foreground)] tracking-widest">{label}</p>
      <p className="text-sm font-bold text-[var(--foreground)]">{value}</p>
    </div>
  </div>
);

// Lucide Icon Component (Fallback)
const AlignLeftIcon = ({ size, className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>
);

export default MovieDetails;