"use client";

import React, { useState } from "react";
import {
  Plus,
  Tv,
  MoreVertical,
  ExternalLink,
  Settings,
  Film,
  AlertCircle,
  MapPin,
} from "lucide-react";
import CreateChannelModal from "@/components/movie/CreateChannelModal";

const dummyChannels = [
  {
    id: "1",
    name: "Action Blockbuster",
    location: "Dhaka, BD",
    description: "Home of the best action movies and series.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=AB",
    totalMovie: "12",
    totalSeries: "5",
  },
];

export default function MyChannelsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const channels = dummyChannels;

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
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
        {[
          { label: "Total Channels", value: channels.length, icon: Tv },
          { label: "Total Content", value: "17+", icon: Film },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[var(--card)] border border-[var(--border)] p-4 rounded-2xl"
          >
            <stat.icon size={16} className="text-[var(--primary)] mb-2" />
            <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase">
              {stat.label}
            </p>
            <p className="text-xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {channels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden hover:border-[var(--primary)]/50 transition-all duration-300"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <img
                      src={channel.image}
                      alt="logo"
                      className="w-12 h-12 rounded-xl object-cover bg-[var(--muted)]"
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
                  <button className="p-2 hover:bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)]">
                    <MoreVertical size={18} />
                  </button>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 min-h-[32px]">
                  {channel.description}
                </p>
                <div className="flex items-center gap-4 py-3 border-y border-[var(--border)]/50">
                  <div className="text-center flex-1">
                    <p className="text-[10px] font-black uppercase text-[var(--muted-foreground)]">
                      Movies
                    </p>
                    <p className="font-bold text-white">{channel.totalMovie}</p>
                  </div>
                  <div className="text-center flex-1 border-x border-[var(--border)]/50">
                    <p className="text-[10px] font-black uppercase text-[var(--muted-foreground)]">
                      Series
                    </p>
                    <p className="font-bold text-white">
                      {channel.totalSeries}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 bg-[var(--muted)] hover:bg-[var(--primary)] hover:text-black py-2.5 rounded-xl text-[10px] font-black uppercase transition-all">
                    <Settings size={14} /> Edit
                  </button>
                  <button className="flex items-center justify-center gap-2 border border-[var(--border)] hover:border-[var(--primary)] py-2.5 rounded-xl text-[10px] font-black uppercase transition-all">
                    <ExternalLink size={14} /> Visit
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
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
