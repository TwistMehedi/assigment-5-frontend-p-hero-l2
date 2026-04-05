"use client";

import React, { useEffect, useState } from "react";
import { X, Save, Loader2, Film, Type, DollarSign } from "lucide-react";
import { toast } from "react-toastify";
import { useUpdateMovieAdminMutation } from "@/redux/api/movieApi";

interface EditMovieModalProps {
  movie: any;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

export default function EditMovieModal({
  movie,
  isOpen,
  onClose,
  refetch,
}: EditMovieModalProps) {
  const [updateMovieAdmin, { isLoading }] = useUpdateMovieAdminMutation();
  const [formData, setFormData] = useState({
    title: "",
    isPremium: false,
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || "",
        isPremium: movie.isPremium || false,
      });
    }
  }, [movie]);

  const handleSubmit = async (e: React.FormEvent) => {
    const data = {
      id: movie.id,
      ...formData,
    };
    e.preventDefault();
    try {
      const result = await updateMovieAdmin(data).unwrap();
      toast.success(result?.message || "Movie updated successfully!");
      refetch();
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update movie");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card border-2 border-border w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-xl">
              <Film className="text-primary" size={20} />
            </div>
            <h2 className="text-xl font-black uppercase italic italic tracking-tighter">
              Edit <span className="text-primary">Movie</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="hover:rotate-90 transition-transform p-2"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Type size={12} /> Movie Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-muted/50 border-2 border-border rounded-2xl px-4 py-3 focus:border-primary outline-none font-bold transition-all"
                placeholder="Enter movie title"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Status
                </label>
                <div
                  onClick={() =>
                    setFormData({ ...formData, isPremium: !formData.isPremium })
                  }
                  className={`w-full h-[52px] rounded-2xl border-2 cursor-pointer flex items-center justify-center font-black uppercase text-[10px] tracking-tighter transition-all ${
                    formData.isPremium
                      ? "bg-primary border-primary text-black"
                      : "bg-muted/50 border-border text-muted-foreground"
                  }`}
                >
                  {formData.isPremium ? "Premium Active" : "Set to Premium"}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest transition-all shadow-lg shadow-primary/20"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
