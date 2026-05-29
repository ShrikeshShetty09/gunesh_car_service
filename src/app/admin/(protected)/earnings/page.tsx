"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";
import { IndianRupee, TrendingUp, CheckCircle, Loader2 } from "lucide-react";

export default function AdminEarningsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/earnings")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-outfit text-3xl font-bold text-white mb-1">Earnings</h1>
        <p className="text-gray-400">Financial overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Earnings", value: `₹${(data?.totalEarnings ?? 0).toLocaleString("en-IN")}`, icon: IndianRupee, gradient: "from-amber-500 to-yellow-400" },
          { label: "This Month", value: `₹${(data?.monthEarnings ?? 0).toLocaleString("en-IN")}`, icon: TrendingUp, gradient: "from-green-500 to-emerald-400" },
          { label: "Completed Trips", value: data?.completedTrips ?? 0, icon: CheckCircle, gradient: "from-blue-500 to-cyan-400" },
        ].map((c, i) => (
          <div key={i} className="bg-neutral-900 border border-white/5 rounded-2xl p-6">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-4`}>
              <c.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1">{c.label}</p>
            <p className="text-3xl font-bold text-white">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6">
        <h2 className="font-outfit text-lg font-bold text-white mb-6">Monthly Earnings Breakdown</h2>
        {data?.monthlyBreakdown?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.monthlyBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="month" stroke="#555" fontSize={13} />
              <YAxis stroke="#555" fontSize={13} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 12, color: "#fff" }}
                formatter={(v: any) => [`₹${Number(v).toLocaleString("en-IN")}`, "Earnings"]}
              />
              <Bar dataKey="total" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 py-12">No earnings data yet. Complete bookings to see data here.</p>
        )}
      </div>

      {data?.monthlyBreakdown?.length > 0 && (
        <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6">
          <h2 className="font-outfit text-lg font-bold text-white mb-6">Earnings Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.monthlyBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="month" stroke="#555" fontSize={13} />
              <YAxis stroke="#555" fontSize={13} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 12, color: "#fff" }}
                formatter={(v: any) => [`₹${Number(v).toLocaleString("en-IN")}`, "Earnings"]}
              />
              <Line type="monotone" dataKey="total" stroke="#f59e0b" strokeWidth={3} dot={{ fill: "#f59e0b", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
