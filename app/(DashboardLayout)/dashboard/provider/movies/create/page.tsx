"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  Loader2,
  AlertCircle,
  Film,
  Users,
  DollarSign,
  Image as ImageIcon,
  Video,
  Clapperboard,
  CheckCircle2,
  Calendar,
  Layers,
  Star,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-toastify";

import { movieUploadSchema } from "@/types/zod/movie/channelSchema";
import {
  useCategoriesQuery,
  useUploadMovieMutation,
} from "@/redux/api/movieApi";
import { ICategory } from "@/types/interface/movie.interface";

export default function UploadMoviePage() {
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const router = useRouter();

  const { data: categoriesRes, isLoading: isCategoriesLoading } =
    useCategoriesQuery(undefined);

  const categoryOptions = useMemo(() => {
    const categoriesData =
      categoriesRes?.data?.data || categoriesRes?.data || [];
    return categoriesData.map((c: ICategory) => c.name);
  }, [categoriesRes]);

  const [uploadMovie, { isLoading }] = useUploadMovieMutation();

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const ErrorMessage = ({ message }: { message?: string }) => (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1 overflow-hidden ml-1"
        >
          <AlertCircle size={12} /> {message}
        </motion.p>
      )}
    </AnimatePresence>
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({ ...prev, [e.target.name]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formattedData = {
      ...formData,
      isPremium: formData.isPremium === "true",
      duration: formData.duration,
      price: formData.price,
    };

    const validation = movieUploadSchema.safeParse(formattedData);

    if (!validation.success) {
      const formattedErrors: { [key: string]: string } = {};
      validation.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    if (!files.thumbnail || !files.poster || !files.video) {
      toast.error("Thumbnail, Poster, and Video are required");
      return;
    }

    const data = new FormData();
    Object.keys(validation.data).forEach((key) => {
      if (key === "cast") {
        const castArray = (validation.data as any).cast
          .split(",")
          .map((c: string) => c.trim());
        data.append(key, JSON.stringify(castArray));
      } else {
        data.append(key, (validation.data as any)[key]);
      }
    });

    Object.keys(files).forEach((key) => {
      if (files[key]) {
        data.append(key, files[key] as File);
      }
    });

    try {
      const result = await uploadMovie(data).unwrap();
      toast.success(result.message || "Movie uploaded successfully!");
      router.push("/dashboard/provider/movies");
      setFormData({
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
      setFiles({ thumbnail: null, poster: null, video: null });
      setFileInputKey(Date.now());
    } catch (error: any) {
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-[var(--card)] p-8 rounded-3xl border border-[var(--border)] shadow-2xl"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)] mb-4 shadow-lg shadow-[var(--primary)]/30"
          >
            <Clapperboard size={32} className="text-white" />
          </motion.div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-[var(--foreground)]">
            Upload <span className="text-[var(--primary)]">Content</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
                Movie Title
              </label>
              <div className="relative">
                <Film
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                  size={18}
                />
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full bg-[var(--muted)] border ${errors.title ? "border-red-500" : "border-[var(--border)]"} rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all`}
                  placeholder="Enter movie title..."
                />
              </div>
              <ErrorMessage message={errors.title} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
                Genre
              </label>
              <div className="relative">
                <Layers
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] z-10"
                  size={18}
                />
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className={`w-full bg-[var(--muted)] border ${errors.genre ? "border-red-500" : "border-[var(--border)]"} rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Select a genre
                  </option>
                  {isCategoriesLoading ? (
                    <option>Loading...</option>
                  ) : (
                    categoryOptions?.map((name: any) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))
                  )}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none"
                  size={16}
                />
              </div>
              <ErrorMessage message={errors.genre} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
                Release Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                  size={18}
                />
                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  className={`w-full bg-[var(--muted)] border ${errors.releaseDate ? "border-red-500" : "border-[var(--border)]"} rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none transition-all`}
                />
              </div>
              <ErrorMessage message={errors.releaseDate} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
                Duration
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full bg-[var(--muted)] border ${errors.duration ? "border-red-500" : "border-[var(--border)]"} rounded-xl py-3 px-4 text-sm focus:outline-none transition-all`}
                  placeholder="e.g. 2h 30m"
                />
              </div>
              <ErrorMessage message={errors.duration} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
                Cast
              </label>
              <div className="relative">
                <Users
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                  size={18}
                />
                <input
                  name="cast"
                  value={formData.cast}
                  onChange={handleChange}
                  className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none"
                  placeholder="Actor 1, Actor 2..."
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
                Director
              </label>
              <div className="relative">
                <PlayCircle
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                  size={18}
                />
                <input
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none"
                  placeholder="Director Name"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
                Price ($)
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                  size={18}
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
                Content Type
              </label>
              <div className="relative">
                <Star
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] z-10"
                  size={18}
                />
                <select
                  name="isPremium"
                  value={formData.isPremium}
                  onChange={handleChange}
                  className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="false">Free Content</option>
                  <option value="true">Premium Content</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>

          <div className="col-span-2 space-y-1">
            <label className="text-[10px] font-black uppercase text-[var(--foreground)] ml-1 tracking-widest">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              rows={3}
              onChange={handleChange}
              className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:outline-none"
              placeholder="Write movie summary..."
            />
          </div>

          <div className="bg-[var(--muted)] p-6 rounded-2xl border border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-[var(--muted-foreground)] flex items-center gap-2">
                <ImageIcon size={14} /> Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                key={fileInputKey}
                name="thumbnail"
                onChange={handleFileChange}
                className="w-full cursor-pointer text-xs file:bg-black file:text-white file:rounded-full file:px-4 file:py-2 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-[var(--muted-foreground)] flex items-center gap-2">
                <ImageIcon size={14} /> Poster
              </label>
              <input
                type="file"
                accept="image/*"
                key={fileInputKey}
                name="poster"
                onChange={handleFileChange}
                className="w-full cursor-pointer text-xs file:bg-black file:text-white file:rounded-full file:px-4 file:py-2 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-[var(--muted-foreground)] flex items-center gap-2">
                <Video size={14} /> Movie Video
              </label>
              <input
                type="file"
                accept="video/*"
                key={fileInputKey}
                name="video"
                onChange={handleFileChange}
                className="w-full cursor-pointer text-xs file:bg-black file:text-white file:rounded-full file:px-4 file:py-2 cursor-pointer"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--primary)] cursor-pointer text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase text-[11px] tracking-[0.2em]"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            {isLoading ? "Uploading Content..." : "Publish Movie"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
