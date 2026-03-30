"use client";

import React, { useEffect, useState } from "react";
import {
  useGetSingleSeriesQuery,
  useSingleSeriesQuery,
  useUpdateSeriesMutation,
} from "@/redux/api/series.api";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Save,
  Image as ImageIcon,
  Clapperboard,
  Users,
  Tag,
  Loader2,
  Undo2,
} from "lucide-react";
import { toast } from "react-toastify";

const EditSeries = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: seriesResponse, isLoading: isFetching } = useSingleSeriesQuery(
    id as string,
  );
  const [updateSeries, { isLoading: isUpdating }] = useUpdateSeriesMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    director: "",
    genre: "",
    price: "0",
    isPremium: "false",
    cast: "",
  });

  const [poster, setPoster] = useState<File | null>(null);

  useEffect(() => {
    if (seriesResponse?.data) {
      const s = seriesResponse.data;
      setFormData({
        title: s.title || "",
        description: s.description || "",
        director: s.director || "",
        genre: s.genre || "",
        price: String(s.price || 0),
        isPremium: String(s.isPremium || false),
        cast: Array.isArray(s.cast) ? s.cast.join(", ") : "",
      });
    }
  }, [seriesResponse]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "cast") {
        const castArray = formData.cast.split(",").map((c) => c.trim());
        data.append(key, JSON.stringify(castArray));
      } else {
        data.append(key, (formData as any)[key]);
      }
    });

    if (poster) data.append("poster", poster);

    try {
      await updateSeries({ id: id as string, data }).unwrap();
      toast.success("Series updated successfully!");
      router.push("/dashboard/provider/series");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update series");
    }
  };

  if (isFetching)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-10 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] p-6 md:p-12 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Edit <span className="text-[var(--primary)]">Series</span>
          </h1>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[10px] font-black uppercase bg-[var(--muted)] px-4 py-2 rounded-full"
          >
            <Undo2 size={14} /> Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <InputField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <InputField
              label="Director"
              name="director"
              value={formData.director}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-4">
            <InputField
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase ml-1 opacity-60">
                  Premium
                </label>
                <select
                  name="isPremium"
                  value={formData.isPremium}
                  onChange={handleChange}
                  className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm font-bold outline-none"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-span-2 space-y-1">
            <label className="text-[10px] font-black uppercase ml-1 opacity-60">
              Cast (Comma separated)
            </label>
            <input
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm outline-none"
            />
          </div>

          <div className="col-span-2">
            <label className="text-[10px] font-black uppercase ml-1 opacity-60">
              Update Poster (Optional)
            </label>
            <div className="mt-2 p-6 border-2 border-dashed border-[var(--border)] rounded-2xl bg-[var(--muted)]/20 text-center">
              <label className="cursor-pointer flex flex-col items-center gap-2">
                <ImageIcon
                  className="text-[var(--muted-foreground)]"
                  size={24}
                />
                <span className="text-[10px] font-black uppercase">
                  {poster ? poster.name : "Choose New Poster"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setPoster(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>

          <div className="col-span-2 space-y-1">
            <label className="text-[10px] font-black uppercase ml-1 opacity-60">
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

          <button
            type="submit"
            disabled={isUpdating}
            className="col-span-2 cursor-pointer bg-[var(--primary)] text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase text-xs tracking-widest disabled:opacity-50"
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Update Series Details
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const InputField = ({ label, name, value, type = "text", onChange }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black uppercase ml-1 opacity-60">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-[var(--primary)]"
    />
  </div>
);

export default EditSeries;
