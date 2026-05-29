"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  TrendingUp, Calendar, CheckCircle, Clock, XCircle, IndianRupee, Car
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  CONFIRMED: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  COMPLETED: "text-green-400 bg-green-400/10 border-green-400/30",
  CANCELLED: "text-red-400 bg-red-400/10 border-red-400/30",
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/earnings")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-8 bg-white/10 rounded w-48 mb-2"></div>
        <div className="h-4 bg-white/5 rounded w-64"></div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="bg-neutral-900 border border-white/5 rounded-2xl p-5 h-32 flex flex-col justify-between">
            <div className="w-12 h-12 bg-white/10 rounded-xl mb-4"></div>
            <div>
              <div className="h-3 bg-white/5 rounded w-24 mb-2"></div>
              <div className="h-6 bg-white/10 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6 h-80"></div>
    </div>
  );


  const stats = [
    { label: "Total Earnings", value: data?.totalEarnings ?? 0, prefix: "₹", icon: IndianRupee, color: "from-amber-500 to-yellow-400" },
    { label: "This Month", value: data?.monthEarnings ?? 0, prefix: "₹", icon: TrendingUp, color: "from-green-500 to-emerald-400" },
    { label: "Completed Trips", value: data?.completedTrips ?? 0, prefix: "", icon: CheckCircle, color: "from-blue-500 to-cyan-400" },
    { label: "Pending Bookings", value: data?.pendingBookings ?? 0, prefix: "", icon: Clock, color: "from-orange-500 to-amber-400" },
    { label: "Confirmed", value: data?.confirmedBookings ?? 0, prefix: "", icon: Calendar, color: "from-purple-500 to-violet-400" },
    { label: "Cancelled", value: data?.cancelledBookings ?? 0, prefix: "", icon: XCircle, color: "from-red-500 to-rose-400" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-outfit text-3xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-gray-400">Welcome back, Gunesh Raju Shetty</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-neutral-900 border border-white/5 rounded-2xl p-5 shadow-xl hover:shadow-2xl hover:border-amber-500/20 transition-all">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
              <s.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-white">
              <AnimatedCounter target={s.value} prefix={s.prefix} duration={1} />
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      {data?.monthlyBreakdown?.length > 0 && (
        <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6">
          <h2 className="font-outfit text-lg font-bold text-white mb-6">Monthly Earnings (Last 6 Months)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.monthlyBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="month" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 12 }}
                labelStyle={{ color: "#fff" }}
                formatter={(v: any) => [`₹${Number(v).toLocaleString("en-IN")}`, "Earnings"]}
              />
              <Bar dataKey="total" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent bookings */}
      <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-outfit text-lg font-bold text-white">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-amber-400 text-sm hover:underline">View all →</Link>
        </div>
        <div className="space-y-3">
          {data?.recentBookings?.length === 0 && (
            <p className="text-gray-500 text-center py-8">No bookings yet</p>
          )}
          {data?.recentBookings?.map((b: any) => (
            <div key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{b.pickupLocation} → {b.dropLocation}</p>
                  <p className="text-gray-500 text-xs">{b.phoneNumber} · {format(new Date(b.dateTime), "dd MMM yy, hh:mm a")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:justify-end ml-13 sm:ml-0">
                {b.price && (
                  <span className="text-amber-400 text-sm font-bold">₹{b.price.amount}</span>
                )}
                <span className={`text-[10px] sm:text-xs px-2 py-1 rounded-full border font-medium whitespace-nowrap ${STATUS_COLORS[b.status]}`}>{b.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
