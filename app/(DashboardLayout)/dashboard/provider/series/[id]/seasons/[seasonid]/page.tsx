"use client";

import React, { useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Play,
  Clock,
  ArrowLeft,
  Loader2,
  Clapperboard,
  Plus,
  X,
  Video,
} from "lucide-react";
import {
  useAddEpisodeMutation,
  useSingleSeasonQuery,
} from "@/redux/api/series.api";
import { toast } from "react-toastify";
import { EpisodeCard } from "@/components/movie/EpisodeCard";

const SeasonDetails = () => {
  const { id, seasonid } = useParams();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [addEpisode, { isLoading: isAddingEpisode }] = useAddEpisodeMutation();
  const { data: seasonResponse, isLoading } = useSingleSeasonQuery(
    seasonid as string,
  );
  const season = seasonResponse?.data;

  const [episodeData, setFormData] = useState({
    title: "",
    episodeNumber: "",
    duration: "",
    description: "",
  });

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    } else {
      setVideoFile(null);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEpisode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoFile) return toast.error("Please select a video file");

    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("title", episodeData.title);
      formData.append("episodeNumber", episodeData.episodeNumber);
      formData.append("duration", episodeData.duration);
      formData.append("description", episodeData.description);
      formData.append("seasonId", seasonid as string);

      const res = await addEpisode(formData).unwrap();

      if (res.success) {
        toast.success(res.message || "Episode published!");
        setIsModalOpen(false);
        setVideoFile(null);
        setFormData({
          title: "",
          episodeNumber: "",
          duration: "",
          description: "",
        });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-[var(--background)]">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
          Fetching Season...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-12 relative">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md h-full bg-[var(--card)] border border-[var(--border)] p-8 overflow-y-auto rounded-3xl md:rounded-none md:rounded-l-3xl animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                Add Episode
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-[var(--muted)] rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleAddEpisode}>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">
                  Episode Title
                </label>
                <input
                  name="title"
                  value={episodeData.title}
                  onChange={handleInputChange}
                  required
                  type="text"
                  placeholder="e.g. The Beginning"
                  className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">
                    EP Number
                  </label>
                  <input
                    name="episodeNumber"
                    value={episodeData.episodeNumber}
                    onChange={handleInputChange}
                    required
                    type="number"
                    placeholder="1"
                    className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">
                    Duration (Min)
                  </label>
                  <input
                    name="duration"
                    value={episodeData.duration}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="45"
                    className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={episodeData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Brief description..."
                  className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] resize-none"
                />
              </div>

              <label
                className={`group p-8 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${videoFile ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-[var(--border)] hover:border-[var(--primary)]/40"}`}
              >
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideo}
                />
                <Video
                  size={32}
                  className={videoFile ? "text-[var(--primary)]" : "opacity-20"}
                />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 text-center">
                  {videoFile ? videoFile.name : "Select Video File"}
                </p>
              </label>

              <button
                disabled={isAddingEpisode}
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-[var(--primary)] text-black font-black uppercase py-4 rounded-xl text-xs tracking-[0.2em] shadow-lg shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingEpisode ? (
                  <>
                    {" "}
                    <Loader2 className="animate-spin" size={18} />{" "}
                    {isAddingEpisode ? "Uploading Video..." : "Saving..."}{" "}
                  </>
                ) : (
                  "Publish Episode"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <button
              onClick={() => router.back()}
              className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-all hover:text-[var(--primary)]"
            >
              <ArrowLeft size={14} /> Back to series
            </button>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2">
              {season?.title || `Season ${season?.seasonNumber || "01"}`}
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)]">
              {season?.episodes?.length || 0} Episodes Total
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[var(--primary)] transition-all shadow-xl active:scale-90"
          >
            <Plus size={16} /> Add New Episode
          </button>
        </div>
        <hr className="border-[var(--border)] mb-10 opacity-50" />

        {season?.episodes?.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <Clapperboard size={48} className="text-[var(--primary)]" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
              No episodes added yet
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {season?.episodes?.map((episode: any) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonDetails;
