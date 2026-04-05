"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Film, Upload, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useUpdateEpisodeMutation } from "@/redux/api/series.api";

interface EditEpisodeModalProps {
  episode: any;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

export default function EditEpisodeModal({
  episode,
  isOpen,
  onClose,
  refetch,
}: EditEpisodeModalProps) {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [updateEpisode, { isLoading }] = useUpdateEpisodeMutation();

  useEffect(() => {
    if (episode) {
      setTitle(episode.title);
      setSelectedFile(null);
    }
  }, [episode]);

  if (!isOpen || !episode) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", episode.id);
    formData.append("title", title);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    
    try {
      const result = await updateEpisode(formData).unwrap();
   
      toast.success(result?.message || "Episode updated successfully");
      refetch();
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="bg-card border-2 border-border w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="px-8 py-6 border-b-2 border-border flex justify-between items-center bg-muted/20">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">
            Edit <span className="text-primary">Episode</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">
              Episode Title
            </label>
            <div className="relative">
              <Film
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                size={18}
              />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-muted border-2 border-border rounded-2xl pl-12 pr-5 py-4 focus:border-primary outline-none font-bold italic"
                placeholder="Episode Name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">
              Replace Video (Optional)
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-[1.5rem] cursor-pointer hover:bg-muted/50 transition-all">
              <Upload className="text-muted-foreground mb-2" size={24} />
              <span className="text-[10px] font-black uppercase text-muted-foreground">
                {selectedFile ? selectedFile.name : "Select new video file"}
              </span>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary text-black font-black uppercase py-4 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save size={20} />
              )}{" "}
              Update Episode
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 border-2 border-border font-black uppercase py-4 rounded-2xl hover:bg-muted transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
