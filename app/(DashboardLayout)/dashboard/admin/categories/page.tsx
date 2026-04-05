"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Film, AlertCircle, Check, X } from "lucide-react";
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/api/movieApi";
import { toast } from "react-toastify";
import { ICategory } from "@/types/interface/movie.interface";

export default function CategoryManagement() {
  const [mounted, setMounted] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const { data: categoryResponse, isLoading: isFetching } =
    useCategoriesQuery();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = categoryResponse?.data || [];

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await createCategory({ name: newCategory }).unwrap();
      toast.success("Genre created!");
      setNewCategory("");
      setIsAdding(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Error!");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateCategory({ id, name: editingName }).unwrap();
      toast.success("Updated!");
      setEditingId(null);
    } catch (error: any) {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Deleted!");
    } catch (error: any) {
      toast.error("Deletion failed");
    }
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
          className="flex items-center cursor-pointer gap-2 bg-[var(--primary)] text-black px-5 py-2.5 rounded-xl font-bold text-xs uppercase shadow-lg"
        >
          <Plus className={isAdding ? "rotate-45" : ""} />{" "}
          {isAdding ? "Close" : "Add New Genre"}
        </button>
      </div>

      {isAdding && (
        <div className="p-4 bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-2xl flex gap-3 animate-in fade-in slide-in-from-top-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Comedy, Action..."
            className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
          />
          <button
            disabled={isLoading}
            onClick={handleAddCategory}
            className="bg-[var(--primary)] text-black px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2"
          >
            <Check size={16} /> {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isFetching ? (
          <p className="text-xs font-bold animate-pulse">Loading...</p>
        ) : categories.length > 0 ? (
          categories.map((cat: ICategory) => (
            <div
              key={cat.id}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 flex items-center justify-between group hover:border-[var(--primary)]/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="p-3 bg-[var(--muted)] rounded-xl text-[var(--muted-foreground)] group-hover:text-[var(--primary)]">
                  <Film size={20} />
                </div>

                {editingId === cat.id ? (
                  <input
                    className="bg-[var(--background)] border border-[var(--primary)] rounded-lg px-2 py-1 text-sm outline-none w-full"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <div>
                    <h3 className="font-bold text-sm uppercase">{cat.name}</h3>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1">
                {editingId === cat.id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(cat.id)}
                      className="p-2 cursor-pointer text-green-500"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 cursor-pointer text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <div className="flex  transition-opacity">
                    <button
                      onClick={() => {
                        setEditingId(cat.id);
                        setEditingName(cat.name);
                      }}
                      className="p-2 cursor-pointer text-blue-500 hover:bg-[var(--muted)] rounded-lg"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 cursor-pointer text-red-500 hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-[var(--border)] rounded-3xl opacity-50">
            <AlertCircle size={32} className="mb-2" />
            <p className="text-xs font-bold uppercase tracking-widest">
              No Categories Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
