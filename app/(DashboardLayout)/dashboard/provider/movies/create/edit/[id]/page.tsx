"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Loader2,
  Film,
  Save,
  ArrowLeft,
  Clapperboard,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import { toast } from "react-toastify";
import { useMyMovieQuery, useUpdateMovieMutation } from "@/redux/api/movieApi";

export default function EditMoviePage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: response, isLoading: isFetching } = useMyMovieQuery(
    id as string,
  );
  const [updateMovie, { isLoading: isUpdating }] = useUpdateMovieMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    director: "",
    cast: "",
    duration: "",
    releaseDate: "",
    price: "0",
    isPremium: "false",
  });

  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    thumbnail: null,
    poster: null,
    video: null,
  });

  useEffect(() => {
    if (response?.data) {
      const movie = response.data;
      setFormData({
        title: movie.title || "",
        description: movie.description || "",
        genre: movie.genre || "",
        director: movie.director || "",
        cast: Array.isArray(movie.cast) ? movie.cast.join(", ") : "",
        duration: movie.duration?.toString() || "",
        releaseDate: movie.releaseDate
          ? new Date(movie.releaseDate).toISOString().split("T")[0]
          : "",
        price: movie.price || "0",
        isPremium: movie.isPremium?.toString() || "false",
      });
    }
  }, [response]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFiles((prev) => ({ ...prev, [e.target.name]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "cast") {
        const castArray = formData.cast.split(",").map((c) => c.trim());
        data.append(key, JSON.stringify(castArray));
      } else if (key === "duration") {
        data.append(key, String(formData.duration));
      } else {
        data.append(key, (formData as any)[key]);
      }
    });

    Object.keys(files).forEach((key) => {
      if (files[key]) {
        data.append(key, files[key] as File);
      }
    });

    try {
      const result = await updateMovie({ id: id as string, data }).unwrap();
      toast.success(result?.message || "Movie updated successfully!");
        router.push("/dashboard/provider/movies");
        
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update movie");
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl bg-[var(--card)] p-8 rounded-3xl border border-[var(--border)] shadow-2xl"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--muted-foreground)] mb-6 hover:text-[var(--primary)] transition-colors"
        >
          <ArrowLeft size={14} /> Cancel Edit
        </button>

        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            Edit <span className="text-[var(--primary)]">Movie</span>
          </h2>
          <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest mt-1">
            Update details for: {formData.title}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase ml-1">
                Movie Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase ml-1">
                Genre
              </label>
              <input
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase ml-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase ml-1">
                Duration (Min)
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 120"
                className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase ml-1">
                Release Date
              </label>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:outline-none"
              />
            </div>

            <div className="col-span-2 bg-[var(--muted)]/50 p-6 rounded-2xl border border-dashed border-[var(--border)] grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase flex items-center gap-2 text-[var(--muted-foreground)]">
                  <ImageIcon size={12} /> New Thumbnail
                </p>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleFileChange}
                  className="text-[10px] cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase flex items-center gap-2 text-[var(--muted-foreground)]">
                  <ImageIcon size={12} /> New Poster
                </p>
                <input
                  type="file"
                  name="poster"
                  onChange={handleFileChange}
                  className="text-[10px] cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase flex items-center gap-2 text-[var(--muted-foreground)]">
                  <Video size={12} /> New Video
                </p>
                <input
                  type="file"
                  name="video"
                  onChange={handleFileChange}
                  className="text-[10px] cursor-pointer"
                />
              </div>
            </div>

            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase ml-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                rows={4}
                onChange={handleChange}
                className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isUpdating}
            className="w-full cursor-pointer bg-[var(--primary)] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase text-[11px] tracking-widest shadow-lg shadow-[var(--primary)]/20 disabled:opacity-50"
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            {isUpdating ? "Updating..." : "Save Changes"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
