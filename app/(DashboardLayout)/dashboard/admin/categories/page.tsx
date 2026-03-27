"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Film,
  Search,
  AlertCircle,
  Check,
} from "lucide-react";
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
} from "@/redux/api/movieApi";

import { toast } from "react-toastify";
import { ICategory } from "@/types/interface/movie.interface";

export default function CategoryManagement() {
  const [mounted, setMounted] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const { data: categoryResponse, isLoading: isFetching } =
    useCategoriesQuery();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const categories = categoryResponse?.data || [];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      const result = await createCategory({ name: newCategory }).unwrap();
      if (result.success) {
        toast.success(result.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }

    setIsAdding(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">
            Manage Genres
          </h1>
          <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-[0.2em]">
            Organize content categories
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center cursor-pointer gap-2 bg-[var(--primary)] text-black px-5 py-2.5 rounded-xl font-bold text-xs uppercase transition-transform active:scale-95 shadow-lg shadow-[var(--primary)]/20"
        >
          {isAdding ? (
            <Plus className="rotate-45 transition-transform" />
          ) : (
            <Plus />
          )}
          {isAdding ? "Close" : "Add New Genre"}
        </button>
      </div>

      {isAdding && (
        <div className="p-4 bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-2xl flex gap-3 animate-in fade-in slide-in-from-top-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter genre name (e.g. Comedy)"
            className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            autoFocus
          />
          <button
            disabled={isLoading}
            onClick={handleAddCategory}
            className="bg-[var(--primary)] cursor-pointer text-black px-4 py-2 rounded-xl font-bold text-xs uppercase flex items-center gap-2"
          >
            <Check size={16} /> {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isFetching ? (
          <p className="text-xs font-bold uppercase animate-pulse">
            Loading Categories...
          </p>
        ) : categories.length > 0 ? (
          categories.map((cat: ICategory) => (
            <div
              key={cat.id}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 flex items-center justify-between group hover:border-[var(--primary)]/50 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[var(--muted)] rounded-xl text-[var(--muted-foreground)] group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] transition-colors">
                  <Film size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-tight">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] font-medium text-[var(--muted-foreground)] uppercase tracking-widest">
                    {cat.movieCount || 0} Movies Linked
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-[var(--muted)] rounded-lg text-blue-500 transition-colors">
                  <Edit3 size={16} />
                </button>
                <button className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-[var(--border)] rounded-3xl opacity-50">
            <AlertCircle size={32} className="mb-2" />
            <p className="font-bold uppercase tracking-widest text-xs">
              No Categories Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
