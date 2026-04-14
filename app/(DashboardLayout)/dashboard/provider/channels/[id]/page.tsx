"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useChannelsQuery,
  useDeleteChaneleMutation,
  useGetChannelQuery,
} from "@/redux/api/movieApi";
import {
  MapPin,
  Tv,
  Film,
  Info,
  ArrowLeft,
  Trash2,
  Settings,
  Loader2,
} from "lucide-react";

const ChannelDetails = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: response, isLoading } = useGetChannelQuery(id);

  const channel = response?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="text-center p-20 text-white font-black uppercase">
        Channel Not Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] font-black uppercase text-[var(--muted-foreground)] hover:text-white transition-all"
        >
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="relative h-48 bg-[var(--muted)]">
          <img
            src={channel?.data?.image}
            className="w-full h-full object-cover blur-2xl opacity-20"
            alt=""
          />

          <div className="absolute -bottom-10 left-10">
            <img
              src={channel?.data?.image}
              className="w-32 h-32 rounded-[2rem] border-8 border-[var(--card)] object-cover shadow-xl"
              alt={channel?.data.name}
            />
          </div>
        </div>

        <div className="pt-16 pb-10 px-10 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
                {channel?.data.name}
              </h1>
              <p className="text-[var(--primary)] font-black uppercase text-[10px] mt-1 tracking-widest flex items-center gap-1">
                <MapPin size={12} /> {channel?.data.location}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-6">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-[10px] font-black uppercase text-[var(--muted-foreground)] tracking-[0.2em] flex items-center gap-2">
                <Info size={14} className="text-[var(--primary)]" /> Channel
                Overview
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed bg-[var(--background)] p-6 rounded-2xl border border-[var(--border)]">
                {channel?.data.description ||
                  "No description provided for this channel."}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-[10px] font-black uppercase text-[var(--muted-foreground)] tracking-[0.2em]">
                Quick Stats
              </h2>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between p-4 bg-[var(--muted)] rounded-2xl border border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <Film size={18} className="text-[var(--primary)]" />
                    <span className="text-[10px] font-black uppercase text-white">
                      Movies
                    </span>
                  </div>
                  <span className="text-xl font-black text-white">
                    {channel?.data.totalMovie || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-[var(--muted)] rounded-2xl border border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <Tv size={18} className="text-[var(--primary)]" />
                    <span className="text-[10px] font-black uppercase text-white">
                      Series
                    </span>
                  </div>
                  <span className="text-xl font-black text-white">
                    {channel?.data.totalSeries || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetails;
