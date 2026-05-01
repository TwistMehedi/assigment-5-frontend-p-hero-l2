"use client";

import React, { useState } from "react";
import {
  Plus,
  Tv,
  MoreVertical,
  ExternalLink,
  Settings,
  AlertCircle,
  MapPin,
  Trash2,
} from "lucide-react";
import CreateChannelModal from "@/components/movie/CreateChannelModal";
import { IChannel } from "@/types/interface/movie.interface";
import {
  useChannelsQuery,
  useDeleteChaneleMutation,
} from "@/redux/api/movieApi";
import { toast } from "react-toastify";
import Link from "next/link";

export default function MyChannelsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<IChannel | null>(null);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [deleteChannel, { isLoading: isDeleting }] = useDeleteChaneleMutation();
  const { data: channelsResult, isLoading, isError } = useChannelsQuery();
  const channels = channelsResult?.data || [];
  console.log(channels)

  if (isLoading)
    return (
      <div className="text-white text-center p-20 font-black uppercase tracking-widest animate-pulse">
        Broadcasting data loading...
      </div>
    );
  if (isError)
    return (
      <div className="text-red-500 text-center p-20 font-black uppercase">
        Failed to fetch channels.
      </div>
    );

  const handleOpenModal = (channel?: IChannel) => {
    setSelectedChannel(channel || null);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  const handleDeleteChannel = async (id: string) => {
    try {
      const result = await deleteChannel(id).unwrap();
      toast.success(result.message);
      setActiveMenu(null);
    } catch (error: any) {
      toast.error(error.data?.message || "Delete failed");
    }
  };

  return (
    <div
      className="space-y-8 max-w-7xl mx-auto p-6"
      onClick={() => setActiveMenu(null)}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">
            My Channels
          </h1>
          <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-[0.2em]">
            Manage your broadcasting identities
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center cursor-pointer gap-2 bg-[var(--primary)] text-black px-6 py-3 rounded-2xl font-black text-xs uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[var(--primary)]/20"
        >
          <Plus size={18} strokeWidth={3} /> Create New Channel
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--card)] border border-[var(--border)] p-4 rounded-2xl">
          <Tv size={16} className="text-[var(--primary)] mb-2" />
          <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase">
            Total Channels
          </p>
          <p className="text-xl font-black text-white">
            {(channels as any)?.length}
          </p>
        </div>
      </div>

      {(channels as any)?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(channels as any)?.map((channel: IChannel) => (
            <div
              key={channel.id}
              className="group relative bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden hover:border-[var(--primary)]/50 transition-all duration-300"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <img
                      src={channel.image}
                      alt="logo"
                      className="w-12 h-12 rounded-xl object-cover bg-[var(--muted)] border border-[var(--border)]"
                    />
                    <div>
                      <h3 className="font-black uppercase tracking-tight text-lg text-white">
                        {channel.name}
                      </h3>
                      <p className="text-[10px] font-bold text-[var(--primary)] uppercase flex items-center gap-1">
                        <MapPin size={10} /> {channel.location}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(
                          activeMenu === channel.id ? null : channel.id,
                        );
                      }}
                      className="p-2 hover:bg-[var(--muted)] rounded-xl transition-colors text-[var(--muted-foreground)] hover:text-white"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {activeMenu === channel.id && (
                      <div
                        className="absolute right-0 mt-2 w-32 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleDeleteChannel(channel.id)}
                          disabled={isDeleting}
                          className="w-full flex items-center gap-2 px-4 py-3 text-[10px] font-black uppercase text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={14} />
                          {isDeleting ? "Processing..." : "Delete"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 py-3 border-y border-[var(--border)]/50">
                  <div className="text-center flex-1">
                    <p className="text-[10px] font-black uppercase text-[var(--muted-foreground)]">
                      Movies
                    </p>
                    <p className="font-bold text-white">
                      {channel?.totalMovie || 0}
                    </p>
                  </div>
                  <div className="text-center flex-1 border-x border-[var(--border)]/50">
                    <p className="text-[10px] font-black uppercase text-[var(--muted-foreground)]">
                      Series
                    </p>
                    <p className="font-bold text-white">
                      {channel?.totalSeries || 0}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenModal(channel)}
                    className="flex items-center justify-center gap-2 bg-[var(--muted)] hover:bg-[var(--primary)] hover:text-black py-2.5 rounded-xl text-[10px] font-black uppercase transition-all"
                  >
                    <Settings size={14} /> Edit
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 border border-[var(--border)] hover:border-[var(--primary)] py-2.5 rounded-xl text-[10px] font-black uppercase transition-all">
                    <Link href={`/dashboard/provider/channels/${channel.id}`}>
                      <ExternalLink size={14} /> Visit
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[var(--border)] rounded-[2rem] opacity-50 text-white">
          <AlertCircle size={40} className="mb-2" />
          <p className="font-black uppercase text-sm">No Channels Found</p>
        </div>
      )}

      <CreateChannelModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedChannel(null);
        }}
        initialData={selectedChannel}
      />
    </div>
  );
}
