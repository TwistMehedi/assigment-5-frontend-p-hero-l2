"use client";

import { useState, useEffect } from "react";
import {
  PlayCircle,
  Clock,
  CreditCard,
  Heart,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useGetSharedUserQuery } from "@/redux/api/user.api";

const UserDashboard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: response, isLoading } = useGetSharedUserQuery({});
  const userData = response?.data;

  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading || !isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary h-12 w-12" />
      </div>
    );
  }

  const { purchases, stats } = userData || {};

  return (
    <div className="p-6 lg:p-10 space-y-10 bg-background min-h-screen text-foreground">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">
          Welcome back, {userData?.name?.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground font-medium">
          Ready to dive back into your favorite stories?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UserStatCard
          title="Total Purchased"
          value={stats?.totalPurchased || 0}
          icon={<PlayCircle className="text-primary" />}
        />
        <UserStatCard
          title="Watch Time"
          value={`${stats?.watchTime || 0} hrs`}
          icon={<Clock className="text-orange-500" />}
        />
        <UserStatCard
          title="Total Spent"
          value={`$${stats?.totalSpent || "0.00"}`}
          icon={<CreditCard className="text-green-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-tight">
              My Library
            </h2>
            <button className="text-xs font-bold uppercase text-primary flex items-center gap-1 hover:underline">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {purchases?.map((item: any) => (
              <div
                key={item.id}
                className="group relative bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-all"
              >
                <div className="aspect-video bg-muted relative">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <PlayCircle size={48} className="text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm truncate">{item.title}</h3>
                  <p className="text-[10px] uppercase font-black text-muted-foreground mt-1">
                    Purchased on:{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {(!purchases || purchases.length === 0) && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-[2.5rem]">
                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">
                  Your library is empty. Start exploring!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserStatCard = ({ title, value, icon }: any) => (
  <div className="bg-card p-6 rounded-[2rem] border border-border flex items-center gap-5 hover:shadow-md transition-shadow">
    <div className="p-4 bg-muted rounded-2xl">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
        {title}
      </p>
      <p className="text-2xl font-black tracking-tighter">{value}</p>
    </div>
  </div>
);

export default UserDashboard;
