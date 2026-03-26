import { Users, Film, Clock, DollarSign } from "lucide-react";

export default function AdminOverview() {
  const stats = [
    {
      label: "Total Users",
      value: "1,250",
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "Total Movies",
      value: "450",
      icon: Film,
      color: "text-purple-500",
    },
    {
      label: "Pending Approval",
      value: "12",
      icon: Clock,
      color: "text-orange-500",
    },
    {
      label: "Total Revenue",
      value: "$12,450",
      icon: DollarSign,
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black uppercase tracking-tight">
        Admin Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm flex items-center gap-4"
          >
            <div
              className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}
            >
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl min-h-[300px]">
          <h2 className="font-bold mb-4">Pending Movies for Approval</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Ekhane movie list thakbe jeta Approve korte hobe.
          </p>
        </div>
        <div className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl min-h-[300px]">
          <h2 className="font-bold mb-4">Recent Users</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Koyekjon notun join kora user-er list.
          </p>
        </div>
      </div>
    </div>
  );
}
