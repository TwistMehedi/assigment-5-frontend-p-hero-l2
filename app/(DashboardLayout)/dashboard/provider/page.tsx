"use client";

import { useState, useEffect } from "react";
import { useGetProviderDashboardQuery } from "@/redux/api/user.api";
import {
  DollarSign,
  Video,
  Clapperboard,
  Users,
  TrendingUp,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ProviderDashboard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: response, isLoading } = useGetProviderDashboardQuery({});
  const dashboardData = response?.data;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading || !isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="animate-spin text-primary h-12 w-12" />
      </div>
    );
  }

  const { stats, recentSales } = dashboardData || {};

  const chartData = [
    { name: "Movies", sales: stats?.movieSalesCount || 0 },
    { name: "Series", sales: stats?.seriesSalesCount || 0 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-xl shadow-2xl backdrop-blur-sm">
          <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest mb-1">
            {payload[0].payload.name}
          </p>
          <p className="text-xl font-black text-primary">
            {payload[0].value}{" "}
            <span className="text-[10px] text-foreground uppercase">Sales</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-background min-h-screen text-foreground">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
            Creator Dashboard
          </h1>
          <p className="text-muted-foreground font-medium mt-2">
            Real-time analytics for your premium content.
          </p>
        </div>
        <div className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">
            Live Updates Enabled
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue || "0.00"}`}
          icon={<DollarSign className="text-green-500" />}
          description="Gross earnings"
        />
        <StatCard
          title="Total Sales"
          value={stats?.totalSales || 0}
          icon={<TrendingUp className="text-blue-500" />}
          description="Total units sold"
        />
        <StatCard
          title="Movies Sold"
          value={stats?.movieSalesCount || 0}
          icon={<Video className="text-primary" />}
          description="Individual movie sales"
        />
        <StatCard
          title="Series Sold"
          value={stats?.seriesSalesCount || 0}
          icon={<Clapperboard className="text-orange-500" />}
          description="Complete series sales"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card p-8 rounded-[2.5rem] border border-border shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black uppercase tracking-tight">
              Sales Analytics
            </h2>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Volume
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 h-[320px] w-full min-w-0 relative">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  opacity={0.05}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "hsl(var(--primary))", opacity: 0.05 }}
                />
                <Bar
                  dataKey="sales"
                  fill="hsl(var(--primary))"
                  radius={[12, 12, 0, 0]}
                  barSize={55}
                  animationBegin={200}
                  animationDuration={1200}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-8 rounded-[2.5rem] border border-border shadow-sm flex flex-col">
          <h2 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
            <Users size={22} className="text-primary" /> Recent Buyers
          </h2>
          <div className="space-y-5 overflow-y-auto max-h-[320px] pr-2 custom-scrollbar">
            {recentSales?.map((sale: any) => (
              <div
                key={sale.id}
                className="flex items-center justify-between group p-1"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs uppercase border border-border group-hover:border-primary/30 transition-colors">
                    {sale.user.name?.substring(0, 2) || "U"}
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-tight hover:text-primary transition-colors cursor-default">
                      {sale.user.name || "Anonymous"}
                    </p>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase mt-0.5">
                      {new Date(sale.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-foreground">
                    +${sale.amount}
                  </p>
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${sale.itemType === "MOVIE" ? "bg-primary/10 text-primary" : "bg-orange-500/10 text-orange-500"}`}
                  >
                    {sale.itemType}
                  </span>
                </div>
              </div>
            ))}

            {(!recentSales || recentSales.length === 0) && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 opacity-50">
                  <Users size={20} />
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  No Sales Data Yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, description }: any) => (
  <div className="bg-card p-7 rounded-[2rem] border border-border shadow-sm hover:border-primary/20 hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-5">
      <div className="p-3.5 bg-muted rounded-2xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
        {title}
      </h3>
      <p className="text-3xl font-black mt-1 tracking-tighter group-hover:scale-[1.02] transition-transform origin-left">
        {value}
      </p>
      <div className="flex items-center gap-1.5 mt-2">
        <div className="h-1 w-1 rounded-full bg-primary/40" />
        <p className="text-[10px] text-muted-foreground font-semibold uppercase italic">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default ProviderDashboard;
