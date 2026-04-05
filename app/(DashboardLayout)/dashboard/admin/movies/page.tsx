"use client";

import React, { useState } from "react";
import {
  Film,
  Trash2,
  Edit3,
  Loader2,
  Play,
  X,
  User,
  Calendar,
} from "lucide-react";
import { useGetAllMoviesForAdminQuery } from "@/redux/api/user.api";
import EditMovieModal from "@/components/Series/Admin/EditMovieModal";
import { useDeleteMovieAdminMutation } from "@/redux/api/movieApi";
import { toast } from "react-toastify";

export default function AdminMovies() {
  const {
    data: response,
    isLoading,
    refetch,
  } = useGetAllMoviesForAdminQuery(undefined);

  const [deleteMovieAdmin] = useDeleteMovieAdminMutation();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const movies = response?.data || [];

  const handleEditClick = (movie: any) => {
    setSelectedMovie(movie);
    setIsEditModalOpen(true);
  };

  const handleDeleteMovie = async (id: string) => {
    try {
      const result = await deleteMovieAdmin(id).unwrap();
      toast.success(result?.message || "Movie deleted successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete movie");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 bg-background min-h-screen">
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden border-2 border-primary/20 shadow-[0_0_50px_rgba(0,0,0,1)]">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 z-20 bg-white/10 p-3 rounded-full hover:bg-red-500 transition-all text-white"
            >
              <X size={24} strokeWidth={3} />
            </button>
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      <EditMovieModal
        movie={selectedMovie}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        refetch={refetch}
      />
      <div>
        <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
          Movie <span className="text-primary">Inventory</span>
        </h1>
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
          Raw Data Stream: {movies.length} Units Detected
        </p>
      </div>

      <div className="border-2 border-border rounded-[2rem] bg-card overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b-2 border-border">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Preview
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Movie Details
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Stats
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Access
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-border">
              {movies.map((movie: any) => (
                <tr
                  key={movie.id}
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <td className="p-6">
                    <div className="relative w-28 h-16 rounded-xl overflow-hidden border border-border group/play">
                      <img
                        src={movie.posterUrl}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt=""
                      />
                      <button
                        onClick={() => setActiveVideo(movie.videoUrl)}
                        className="absolute inset-0 bg-primary/80 opacity-0 group-hover/play:opacity-100 flex items-center justify-center transition-all cursor-pointer text-black"
                      >
                        <Play size={20} fill="currentColor" />
                      </button>
                    </div>
                  </td>

                  <td className="p-6">
                    <h3 className="font-black uppercase italic text-lg leading-none mb-2 group-hover:text-primary transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 items-center opacity-70">
                      <span className="text-[9px] font-black uppercase flex items-center gap-1">
                        <User size={10} className="text-primary" />{" "}
                        {movie.user?.name}
                      </span>
                      <span className="text-[9px] font-black uppercase flex items-center gap-1">
                        <Calendar size={10} className="text-primary" />{" "}
                        {new Date(movie.releaseDate).getFullYear()}
                      </span>
                      <span className="text-[9px] font-black uppercase text-primary tracking-tighter">
                        {movie.genre}
                      </span>
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="flex gap-6">
                      <div className="text-center">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">
                          Sales
                        </p>
                        <p className="font-black italic text-sm">
                          {movie.totalSales}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">
                          Revenue
                        </p>
                        <p className="font-black italic text-sm text-green-500">
                          ${movie.revenue}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        movie.isPremium
                          ? "bg-primary text-black"
                          : "bg-zinc-800 text-white border border-white/10"
                      }`}
                    >
                      {movie.isPremium ? "Premium" : "Free"}
                    </span>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditClick(movie)}
                        className="p-3 bg-muted hover:bg-primary hover:text-black rounded-xl transition-all border border-border"
                      >
                        <Edit3 size={16} strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={() => handleDeleteMovie(movie.id)}
                        className="p-3 bg-muted hover:bg-red-500 hover:text-white rounded-xl transition-all border border-border"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {movies.length === 0 && (
          <div className="text-center py-20 border-t-2 border-border">
            <Film
              className="mx-auto text-muted-foreground mb-4 opacity-20"
              size={48}
            />
            <p className="font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">
              No Data Packets Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
