"use client";

import React, { useState } from "react";
import { useCreateSeriesMutation } from "@/redux/api/series.api";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Image as ImageIcon,
  Video,
  Clapperboard,
  Users,
  Tag,
  DollarSign,
  Calendar,
  Loader2,
  Undo2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { seriesSchema } from "@/types/zod/series/series.schema";
import { ZodError } from "zod";

const CreateSeries = () => {
  const router = useRouter();
  const [createSeries, { isLoading }] = useCreateSeriesMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    director: "",
    cast: "",
    genre: "",
    releaseDate: "",
    price: "0",
    isPremium: "false",
  });

  const [files, setFiles] = useState<{ poster: File | null }>({
    poster: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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
    if (e.target.files?.[0]) {
      setFiles((prev) => ({ ...prev, [e.target.name]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = seriesSchema.parse(formData);

      const data = new FormData();
      Object.keys(validatedData).forEach((key) => {
        if (key === "cast") {
          const castArray = validatedData.cast
            .split(",")
            .map((c: string) => c.trim());
          data.append(key, JSON.stringify(castArray));
        } else {
          data.append(key, (validatedData as any)[key]);
        }
      });

      if (files.poster) data.append("poster", files.poster);

      const res = await createSeries(data).unwrap();
      toast.success(res?.message || "Series created successfully!");
      router.push("/dashboard/provider/series");
    } catch (err: any) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue: any) => {
          fieldErrors[issue.path[0]] = issue.message;
        });
        setErrors(fieldErrors);
        toast.error("Please fix the validation errors");
        console.log("Validation Errors:", fieldErrors);
      } else {
        toast.error(err?.data?.message || "Failed to create series");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-10 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] p-6 md:p-12 shadow-2xl shadow-black/20"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
              New <span className="text-[var(--primary)]">Series</span>
            </h1>
            <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase mt-2 tracking-widest">
              Setup metadata
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[10px] font-black uppercase bg-[var(--muted)] px-4 py-2 rounded-full hover:bg-[var(--primary)] hover:text-black transition-all"
          >
            <Undo2 size={14} /> Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase flex items-center gap-2 px-1 text-[var(--muted-foreground)]">
              <PlusCircle size={16} /> Series Title
            </label>
            <input
              name="title"
              placeholder="e.g. Breaking Bad"
              onChange={handleChange}
              className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase flex items-center gap-2 px-1 text-[var(--muted-foreground)]">
              <Clapperboard size={16} /> Director
            </label>
            <input
              name="director"
              placeholder="Name"
              onChange={handleChange}
              className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            {errors.director && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.director}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase flex items-center gap-2 px-1 text-[var(--muted-foreground)]">
              <Tag size={16} /> Genre
            </label>
            <input
              name="genre"
              placeholder="Drama, Thriller"
              onChange={handleChange}
              className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            {errors.genre && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.genre}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase flex items-center gap-2 px-1 text-[var(--muted-foreground)]">
              <Calendar size={16} /> Release Date
            </label>
            <input
              name="releaseDate"
              type="date"
              onChange={handleChange}
              className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            {errors.releaseDate && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.releaseDate}
              </p>
            )}
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase flex items-center gap-2 px-1 text-[var(--muted-foreground)]">
              <Users size={14} /> Cast Members
            </label>
            <input
              name="cast"
              placeholder="Kit Harington, Emilia Clarke"
              onChange={handleChange}
              className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            {errors.cast && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.cast}</p>
            )}
          </div>

          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border-2 border-dashed border-[var(--border)] rounded-[2rem] bg-[var(--muted)]/20 text-center">
              <label className="cursor-pointer flex flex-col items-center gap-2">
                <ImageIcon
                  className="text-[var(--muted-foreground)]"
                  size={30}
                />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {files.poster?.name || "Upload Poster"}
                </span>
                <input
                  type="file"
                  name="poster"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 col-span-2">
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-black uppercase flex items-center gap-2 px-1 text-[var(--muted-foreground)]">
                <DollarSign size={16} /> Price
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl py-4 px-5 text-sm outline-none"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-black uppercase px-1 text-[var(--muted-foreground)]">
                Access Type
              </label>
              <select
                name="isPremium"
                onChange={handleChange}
                className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl py-3.5 px-4 text-sm outline-none font-bold"
              >
                <option value="false">Free Access</option>
                <option value="true">Premium</option>
              </select>
            </div>
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase px-1 text-[var(--muted-foreground)]">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              onChange={handleChange}
              className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div className="col-span-2 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--primary)] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em] hover:shadow-xl hover:shadow-[var(--primary)]/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <PlusCircle size={20} />
              )}
              {isLoading ? "Publishing..." : "Create Series Now"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateSeries;
