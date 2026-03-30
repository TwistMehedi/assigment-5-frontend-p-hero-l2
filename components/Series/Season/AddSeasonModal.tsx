"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2, Film } from "lucide-react";
import { toast } from "react-toastify";
import { useCreateSeasonMutation } from "@/redux/api/series.api";

interface AddSeasonModalProps {
  seriesId: string;
  isOpen: boolean;
  onClose: () => void;
  nextSeasonNumber: number;
}

const AddSeasonModal = ({
  seriesId,
  isOpen,
  onClose,
  nextSeasonNumber,
}: AddSeasonModalProps) => {
  const [createSeason, { isLoading }] = useCreateSeasonMutation();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!seriesId) return toast.error("Series ID is missing");

    const formData = new FormData();
    formData.append("seriesId", seriesId);
    formData.append("seasonNumber", nextSeasonNumber.toString());
    if (title) formData.append("title", title);
    if (file) formData.append("poster", file);

    try {
      console.log(formData);
      const result = await createSeason(formData).unwrap();
      console.log(result);
      toast.success(`Season ${nextSeasonNumber} created successfully!`);
      setTitle("");
      setFile(null);
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create season");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[var(--card)] border border-[var(--border)] w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary)]/10 blur-[80px] rounded-full" />

            <div className="flex justify-between items-center mb-8 relative z-10">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">
                  New <span className="text-[var(--primary)]">Season</span>
                </h2>
                <p className="text-[9px] font-bold opacity-50 uppercase mt-1 tracking-widest">
                  Add sequence to your series
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-[var(--muted)] rounded-full hover:bg-red-500 hover:text-white transition-all active:scale-90"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase px-1 text-[var(--muted-foreground)]">
                  Season Sequence
                </label>
                <div className="w-full bg-[var(--muted)]/50 border border-[var(--border)] rounded-2xl py-4 px-5 text-sm font-black text-[var(--primary)] flex items-center gap-3">
                  <Film size={16} /> Season {nextSeasonNumber}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase px-1 text-[var(--muted-foreground)]">
                  Season Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  placeholder="e.g. Rise of the Kingdom"
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase px-1 text-[var(--muted-foreground)]">
                  Season Poster
                </label>
                <div className="relative group border-2 border-dashed border-[var(--border)] rounded-[2rem] p-8 bg-[var(--muted)]/20 hover:bg-[var(--muted)]/40 transition-all text-center">
                  <label className="cursor-pointer flex flex-col items-center gap-3">
                    <div className="p-4 bg-[var(--background)] rounded-full text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors">
                      <Upload size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest truncate max-w-[250px]">
                      {file ? file.name : "Click to upload poster"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>

              <button
                disabled={isLoading}
                className="w-full bg-[var(--primary)] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em] hover:shadow-xl hover:shadow-[var(--primary)]/20 transition-all disabled:opacity-50 cursor-pointer active:scale-[0.98]"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Create Season"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddSeasonModal;
