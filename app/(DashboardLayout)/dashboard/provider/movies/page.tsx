"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit3,
  Trash2,
  Plus,
  Search,
  Film,
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ViewIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useDeleteMovieMutation,
  useGetMyMoviesQuery,
} from "@/redux/api/movieApi";
import { toast } from "react-toastify";
import Link from "next/link";

const Movies = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 3;

  const { data: response, isLoading } = useGetMyMoviesQuery({
    searchTerm,
    page,
    limit,
  });

  const movies = response?.data?.data || [];
  const meta = response?.data?.meta;

  const [deleteMovie, { isLoading: isDeleting }] = useDeleteMovieMutation();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const res = await deleteMovie(id).unwrap();
      toast.success(res?.message || "Movie deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete movie");
    }
  };

  return (
    <div className="p-6 bg-[var(--background)] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-[var(--foreground)]">
            Content <span className="text-[var(--primary)]">Library</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
            Manage and monitor your uploaded movies
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/dashboard/provider/movies/create")}
          className="bg-[var(--primary)] text-black px-6 py-3 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest shadow-lg"
        >
          <Plus size={18} /> Upload New
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[
          { label: "Total Movies", value: meta?.total || 0, icon: Film },
          {
            label: "Showing Page",
            value: `${meta?.page || 0} of ${meta?.totalPage || 0}`,
            icon: Star,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-[var(--muted-foreground)]">
                {stat.label}
              </p>
              <h3 className="text-xl font-black text-[var(--foreground)]">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--card)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[var(--border)] bg-[var(--muted)]/30">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by title, genre or cast..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-[var(--primary)] outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--muted)]/50 text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">
                <th className="px-6 py-4">Movie Info</th>
                <th className="px-6 py-4">Genre</th>
                <th className="px-6 py-4">Release Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 animate-pulse text-xs font-bold uppercase"
                  >
                    Loading Library...
                  </td>
                </tr>
              ) : movies.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-xs font-bold uppercase"
                  >
                    No Movies Found
                  </td>
                </tr>
              ) : (
                movies.map((movie) => (
                  <tr
                    key={movie.id}
                    className="hover:bg-[var(--muted)]/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={movie.thumbnailUrl || "/placeholder.png"}
                          alt={movie.title}
                          className="h-12 w-10 object-cover rounded-md shadow-sm"
                        />
                        <div>
                          <p className="text-sm font-bold text-[var(--foreground)]">
                            {movie.title}
                          </p>
                          <p className="text-[10px] text-[var(--muted-foreground)] font-mono uppercase">
                            ID: {movie.id.slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium">
                      {movie.genre}
                    </td>
                    <td className="px-6 py-4 text-xs text-[var(--muted-foreground)]">
                      {movie.releaseDate
                        ? new Date(movie.releaseDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[9px] font-black px-2 py-1 rounded-full uppercase ${movie.isPremium ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"}`}
                      >
                        {movie.isPremium ? "Premium" : "Free"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold">
                      ${movie.price}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/provider/movies/create/edit/${movie.id}`}
                          className="p-2 hover:bg-blue-500 hover:text-white rounded-lg transition-all"
                        >
                          <Edit3 size={16} />
                        </Link>
                        <button
                          className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-all disabled:opacity-50"
                          onClick={() => handleDelete(movie.id)}
                          disabled={isDeleting}
                        >
                          <Trash2 size={16} />
                        </button>
                        <Link
                          href={`/dashboard/provider/movies/create/${movie.id}`}
                          className="p-2 hover:bg-blue-500 hover:text-white rounded-lg transition-all"
                        >
                          <ViewIcon size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[var(--border)] flex items-center justify-between bg-[var(--muted)]/10">
          <p className="text-[10px] font-black uppercase text-[var(--muted-foreground)]">
            Showing Page {meta?.page} of {meta?.totalPage}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="p-2 border border-[var(--border)] rounded-lg disabled:opacity-30 hover:bg-[var(--muted)] transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={page >= (meta?.totalPage || 1)}
              onClick={() => setPage((prev) => prev + 1)}
              className="p-2 border border-[var(--border)] rounded-lg disabled:opacity-30 hover:bg-[var(--muted)] transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
