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
import Profile from "@/components/User/Profile";

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
      <Profile />
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
