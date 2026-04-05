"use client";

import React, { useState } from "react";
import {
  Tv,
  Trash2,
  Edit3,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  Film,
} from "lucide-react";

import { useGetAllSeriesForAdminQuery } from "@/redux/api/user.api";
import EditSeriesModal from "@/components/Series/Admin/EditSeriesModal";
import { toast } from "react-toastify";
import {
  useDeleteSeriesAdminMutation,
  useDeleteEpisodeMutation,
} from "@/redux/api/series.api";
import EditEpisodeModal from "@/components/Series/Admin/EditEpisodeModal";

export default function AdminSeries() {
  const {
    data: response,
    isLoading,
    refetch,
  } = useGetAllSeriesForAdminQuery(undefined);
  const [expandedSeries, setExpandedSeries] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [seasonPages, setSeasonPages] = useState<{ [key: string]: number }>({});

  const [isEpisodeEditModalOpen, setIsEpisodeEditModalOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState<any>(null);

  const itemsPerPage = 10;
  const allSeries = response?.data || [];

  const [deleteSeriesAdmin, { isLoading: isDeleting }] =
    useDeleteSeriesAdminMutation();

  const [deleteEpisode, { isLoading: isDeletingEpisode }] =
    useDeleteEpisodeMutation();

  const handleEditClick = (series: any) => {
    setSelectedSeries(series);
    setIsEditModalOpen(true);
  };

  const handleEpisodeEditClick = (episode: any) => {
    setSelectedEpisode(episode);
    setIsEpisodeEditModalOpen(true);
  };

  const handleDeleteEpisode = async (id: string) => {
    try {
      const result = await deleteEpisode(id).unwrap();
      toast.success(result?.message);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  const handleDelete = async (id: any) => {
    try {
      const result = await deleteSeriesAdmin(id).unwrap();
      toast.success(result?.message);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedSeries(expandedSeries === id ? null : id);
  };

  const handlePageChange = (seasonId: string, newPage: number) => {
    setSeasonPages((prev) => ({ ...prev, [seasonId]: newPage }));
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center font-black animate-pulse uppercase tracking-[0.4em] text-primary h-screen flex items-center justify-center">
        Syncing Media Vault...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-background min-h-screen space-y-8 text-foreground">
      <EditSeriesModal
        isOpen={isEditModalOpen}
        series={selectedSeries}
        onClose={() => setIsEditModalOpen(false)}
        refetch={refetch}
      />

      <EditEpisodeModal
        isOpen={isEpisodeEditModalOpen}
        episode={selectedEpisode}
        onClose={() => setIsEpisodeEditModalOpen(false)}
        refetch={refetch}
      />

      {activeVideo && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10">
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)]">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 z-20 bg-white/10 p-3 rounded-full hover:bg-red-500 transition-all text-white"
            >
              <X size={28} strokeWidth={3} />
            </button>
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-border pb-10">
        <div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-[ -0.05em] italic leading-none">
            Series <span className="text-primary italic">Inventory</span>
          </h1>
          <div className="w-12 h-1 bg-primary"></div>
          Managing {allSeries.length} Production Units
        </div>
      </div>

      <div className="space-y-6">
        {allSeries.map((series: any) => (
          <div
            key={series.id}
            className={`border-2 border-border rounded-[2.5rem] bg-card overflow-hidden transition-all duration-500 ${expandedSeries === series.id ? "border-primary ring-4 ring-primary/10 shadow-2xl" : "hover:border-primary/40"}`}
          >
            <div className="flex flex-col lg:flex-row items-center p-6 gap-8">
              <div className="w-full lg:w-40 h-24 shrink-0 rounded-3xl overflow-hidden border-2 border-border shadow-2xl bg-muted">
                <img
                  src={series.posterUrl}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  alt={series.title}
                />
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-black uppercase italic text-2xl md:text-3xl tracking-tighter leading-none mb-2">
                  {series.title}
                </h3>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <span
                    className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${series.isPremium ? "bg-primary text-black shadow-lg shadow-primary/20" : "bg-zinc-800 text-white border border-white/10"}`}
                  >
                    {series.isPremium ? "Premium" : "Free"}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-black uppercase tracking-[0.2em] italic">
                    {series.genre}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 md:gap-12 px-8 py-4 lg:py-0 bg-muted/40 lg:bg-transparent rounded-[2rem] border border-border lg:border-none lg:border-x-2 lg:border-border/50">
                <div className="text-center min-w-[80px]">
                  <p className="text-[10px] font-black text-muted-foreground uppercase flex items-center justify-center gap-2 mb-1">
                    <Layers size={14} className="text-primary" /> Seasons
                  </p>
                  <p className="font-black text-3xl italic tracking-tighter">
                    {series.totalSeasons || 0}
                  </p>
                </div>
                <div className="text-center min-w-[80px]">
                  <p className="text-[10px] font-black text-muted-foreground uppercase flex items-center justify-center gap-2 mb-1">
                    <Film size={14} className="text-primary" /> Episodes
                  </p>
                  <p className="font-black text-3xl italic tracking-tighter">
                    {series.totalEpisodes || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleEditClick(series)}
                  className="p-4 bg-muted hover:bg-primary hover:text-black rounded-[1.5rem] transition-all border-2 border-border active:scale-90"
                >
                  <Edit3 size={20} strokeWidth={2.5} />
                </button>
                <button className="p-4 bg-muted hover:bg-destructive hover:text-white rounded-[1.5rem] transition-all border-2 border-border active:scale-90">
                  <Trash2
                    onClick={() => handleDelete(series.id)}
                    size={20}
                    strokeWidth={2.5}
                  />
                </button>
                <button
                  onClick={() => toggleExpand(series.id)}
                  className={`p-4 rounded-[1.5rem] border-2 transition-all ${expandedSeries === series.id ? "bg-primary text-black border-primary scale-110 shadow-[0_0_25px_rgba(var(--primary),0.4)]" : "bg-muted border-border hover:border-primary/50"}`}
                >
                  {expandedSeries === series.id ? (
                    <ChevronUp size={24} strokeWidth={4} />
                  ) : (
                    <ChevronDown size={24} strokeWidth={4} />
                  )}
                </button>
              </div>
            </div>

            {expandedSeries === series.id && (
              <div className="bg-muted/30 border-t-4 border-border p-5 md:p-10 animate-in slide-in-from-top-10 duration-700 ease-out">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                  {series.seasons_data?.map((season: any) => {
                    const currentPage = seasonPages[season.id] || 1;
                    const totalEpisodes = season.episodes?.length || 0;
                    const totalPages = Math.ceil(totalEpisodes / itemsPerPage);
                    const currentEpisodes = season.episodes?.slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage,
                    );

                    return (
                      <div
                        key={season.id}
                        className="bg-background border-2 border-border rounded-[2.5rem] flex flex-col h-[550px] shadow-2xl overflow-hidden group/season hover:border-primary/40 transition-all"
                      >
                        <div className="px-8 py-6 bg-zinc-900/80 border-b-2 border-border flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase text-primary tracking-[0.3em]">
                              Season Unit {season.seasonNumber}
                            </span>
                            <h4 className="text-lg font-black uppercase italic tracking-tighter leading-none mt-1">
                              {season.title || "Standard Deployment"}
                            </h4>
                          </div>
                          <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-2xl">
                            <span className="text-xs font-black text-primary uppercase">
                              {totalEpisodes} EP
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                          {currentEpisodes?.length > 0 ? (
                            currentEpisodes.map((ep: any) => (
                              <div
                                key={ep.id}
                                className="px-6 py-5 flex justify-between items-center hover:bg-muted rounded-[1.5rem] transition-all group/ep border border-transparent hover:border-border/50"
                              >
                                <div
                                  onClick={() => setActiveVideo(ep.videoUrl)}
                                  className="flex items-center gap-5 cursor-pointer"
                                >
                                  <div className="relative bg-muted p-2 rounded-xl">
                                    <PlayCircle
                                      size={28}
                                      className="text-muted-foreground group-hover/ep:text-primary transition-all group-hover/ep:scale-110"
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">
                                      Index {ep.episodeNumber}
                                    </span>
                                    <span className="text-[15px] font-black uppercase italic group-hover/ep:text-primary transition-colors tracking-tight">
                                      {ep.title}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEpisodeEditClick(ep)}
                                    className="p-2 text-muted-foreground hover:text-primary opacity-0 group-hover/ep:opacity-100 transition-all"
                                  >
                                    <Edit3 size={16} strokeWidth={2.5} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEpisode(ep.id)}
                                    className="p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover/ep:opacity-100 transition-all transform translate-x-2 group-hover/ep:translate-x-0"
                                  >
                                    <Trash2 size={16} strokeWidth={2.5} />
                                  </button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="h-full flex items-center justify-center flex-col opacity-10">
                              <Tv size={60} strokeWidth={1} className="mb-4" />
                              <p className="text-xs font-black uppercase tracking-[0.5em]">
                                No Data Stream
                              </p>
                            </div>
                          )}
                        </div>

                        {totalPages > 1 && (
                          <div className="px-8 py-5 border-t-2 border-border bg-zinc-950 flex items-center justify-between">
                            <p className="text-[11px] font-black text-muted-foreground uppercase italic tracking-widest">
                              Page {currentPage} of {totalPages}
                            </p>
                            <div className="flex gap-3">
                              <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                  handlePageChange(season.id, currentPage - 1)
                                }
                                className="p-3 rounded-xl border-2 border-border hover:bg-primary hover:text-black disabled:opacity-20 transition-all active:scale-90"
                              >
                                <ChevronLeft size={18} strokeWidth={4} />
                              </button>
                              <button
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                  handlePageChange(season.id, currentPage + 1)
                                }
                                className="p-3 rounded-xl border-2 border-border hover:bg-primary hover:text-black disabled:opacity-20 transition-all active:scale-90"
                              >
                                <ChevronRight size={18} strokeWidth={4} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
