"use client";

import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import {
  Search, Trash2, ChevronDown, Check, X, Loader2, IndianRupee, Eye
} from "lucide-react";

const STATUS_OPTIONS = ["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
const STATUS_COLORS: Record<string, string> = {
  PENDING: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  CONFIRMED: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  COMPLETED: "text-green-400 bg-green-400/10 border-green-400/30",
  CANCELLED: "text-red-400 bg-red-400/10 border-red-400/30",
};

type Booking = {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  dateTime: string;
  passengers: number;
  tripType: string;
  phoneNumber: string;
  email?: string;
  specialInstructions?: string;
  status: string;
  price?: { amount: number } | null;
  createdAt: string;
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [priceInput, setPriceInput] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (search) params.set("search", search);
    const res = await fetch(`/api/bookings?${params}`);
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  async function updateStatus(id: string, status: string, price?: number) {
    setActionLoading(id + status);
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, ...(price !== undefined ? { price } : {}) }),
    });
    setActionLoading(null);
    setSelectedBooking(null);
    setPriceInput("");
    fetchBookings();
  }

  async function deleteBooking(id: string) {
    if (!confirm("Delete this booking?")) return;
    setActionLoading(id + "del");
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    setActionLoading(null);
    fetchBookings();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-outfit text-3xl font-bold text-white mb-1">Bookings</h1>
        <p className="text-gray-400">Manage all customer bookings</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by phone, pickup, drop..."
            className="w-full bg-neutral-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                statusFilter === s
                  ? "bg-amber-500 text-black border-amber-500"
                  : "bg-neutral-900 border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table & Cards */}
      <div className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-500 py-16">No bookings found</p>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="block md:hidden divide-y divide-white/5">
              {bookings.map((b) => (
                <div key={b.id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white text-sm font-medium">{b.pickupLocation}</p>
                      <p className="text-gray-500 text-xs">→ {b.dropLocation}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full border font-medium whitespace-nowrap ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-gray-400">
                      <span className="block text-gray-500 mb-0.5">Date & Time</span>
                      {format(new Date(b.dateTime), "dd MMM yy, hh:mm a")}
                    </div>
                    <div className="text-gray-400">
                      <span className="block text-gray-500 mb-0.5">Phone</span>
                      {b.phoneNumber}
                    </div>
                    <div className="text-gray-400">
                      <span className="block text-gray-500 mb-0.5">Passengers / Type</span>
                      {b.passengers} Pax / {b.tripType}
                    </div>
                    <div className="text-gray-400">
                      <span className="block text-gray-500 mb-0.5">Price</span>
                      {b.price ? (
                        <span className="text-amber-400 font-bold">₹{b.price.amount}</span>
                      ) : (
                        <span className="text-gray-600">Not set</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => { setSelectedBooking(b); setPriceInput(b.price?.amount?.toString() ?? ""); }}
                      className="flex-1 flex items-center justify-center gap-2 p-2 bg-white/5 text-gray-300 hover:bg-white/10 rounded-lg transition-colors text-xs font-medium"
                    >
                      <Eye className="w-4 h-4" /> View / Edit
                    </button>
                    <button
                      onClick={() => deleteBooking(b.id)}
                      disabled={actionLoading === b.id + "del"}
                      className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      {actionLoading === b.id + "del" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Route", "Date & Time", "Passengers", "Type", "Phone", "Price", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-4">
                        <p className="text-white text-sm font-medium">{b.pickupLocation}</p>
                        <p className="text-gray-500 text-xs">→ {b.dropLocation}</p>
                      </td>
                      <td className="px-4 py-4 text-gray-300 text-sm whitespace-nowrap">{format(new Date(b.dateTime), "dd MMM yy, hh:mm a")}</td>
                      <td className="px-4 py-4 text-gray-300 text-sm">{b.passengers}</td>
                      <td className="px-4 py-4 text-gray-300 text-sm">{b.tripType}</td>
                      <td className="px-4 py-4 text-gray-300 text-sm">{b.phoneNumber}</td>
                      <td className="px-4 py-4">
                        {b.price ? (
                          <span className="text-amber-400 font-bold text-sm">₹{b.price.amount}</span>
                        ) : (
                          <span className="text-gray-600 text-xs">Not set</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setSelectedBooking(b); setPriceInput(b.price?.amount?.toString() ?? ""); }}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="View/Edit"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBooking(b.id)}
                            disabled={actionLoading === b.id + "del"}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            {actionLoading === b.id + "del" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Booking detail modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Booking Details</h2>
                <p className="text-gray-500 text-xs mt-1">ID: #{selectedBooking.id.slice(-8).toUpperCase()}</p>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 mb-6">
              {[
                ["Pickup", selectedBooking.pickupLocation],
                ["Drop", selectedBooking.dropLocation],
                ["Date & Time", format(new Date(selectedBooking.dateTime), "dd MMM yyyy, hh:mm a")],
                ["Passengers", String(selectedBooking.passengers)],
                ["Trip Type", selectedBooking.tripType],
                ["Phone", selectedBooking.phoneNumber],
                ...(selectedBooking.email ? [["Email", selectedBooking.email]] : []),
                ...(selectedBooking.specialInstructions ? [["Instructions", selectedBooking.specialInstructions]] : []),
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-500 text-sm">{label}</span>
                  <span className="text-white text-sm font-medium max-w-[60%] text-right">{value}</span>
                </div>
              ))}
            </div>

            {/* Price input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Booking Price (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="number"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  placeholder="Enter price"
                  className="w-full bg-black border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            {/* Status actions */}
            <div className="grid grid-cols-2 gap-3">
              {selectedBooking.status === "PENDING" && (
                <button
                  onClick={() => updateStatus(selectedBooking.id, "CONFIRMED", priceInput ? Number(priceInput) : undefined)}
                  disabled={!priceInput}
                  className="col-span-2 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-400 disabled:opacity-50 transition-colors"
                >
                  <Check className="w-4 h-4" /> Confirm & Set Price
                </button>
              )}
              {selectedBooking.status === "CONFIRMED" && (
                <button
                  onClick={() => updateStatus(selectedBooking.id, "COMPLETED", priceInput ? Number(priceInput) : undefined)}
                  className="col-span-2 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-400 transition-colors"
                >
                  <Check className="w-4 h-4" /> Mark as Completed
                </button>
              )}
              {["PENDING", "CONFIRMED"].includes(selectedBooking.status) && (
                <button
                  onClick={() => updateStatus(selectedBooking.id, "CANCELLED")}
                  className="flex items-center justify-center gap-2 bg-red-500/20 text-red-400 border border-red-500/30 py-3 rounded-xl font-medium hover:bg-red-500/30 transition-colors"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              )}
              {selectedBooking.price && (
                <button
                  onClick={() => updateStatus(selectedBooking.id, selectedBooking.status, Number(priceInput))}
                  className="flex items-center justify-center gap-2 bg-amber-500/20 text-amber-400 border border-amber-500/30 py-3 rounded-xl font-medium hover:bg-amber-500/30 transition-colors"
                >
                  <IndianRupee className="w-4 h-4" /> Update Price
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
