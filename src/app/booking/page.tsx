"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, BookingFormData } from "@/lib/validations";
import { MapPin, Calendar, Users, Phone, Mail, FileText, Loader2, ChevronRight } from "lucide-react";

import { useToast } from "@/components/ui/Toast";

function BookingFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const defaultType = (searchParams.get("type") as "NORMAL" | "SPECIAL") || "NORMAL";

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema) as any,
    defaultValues: { tripType: defaultType, passengers: 1 },
  });

  const tripType = watch("tripType");

  useEffect(() => {
    if (searchParams.get("type")) {
      const type = searchParams.get("type") as "NORMAL" | "SPECIAL";
      if (type === "NORMAL" || type === "SPECIAL") {
        setValue("tripType", type);
      }
    }
  }, [searchParams, setValue]);

  async function onSubmit(data: BookingFormData) {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      toast("Booking submitted successfully! Redirecting...");
      router.push(`/booking/confirmation?id=${json.bookingId}`);
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-3xl">
      <div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 relative">
            <Image src="/images/car_photos/car_icon.png" fill alt="Car" className="object-contain" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Booking Request</h2>
            <p className="text-gray-400 text-sm">Fill in your travel details below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Trip Type */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">Trip Type</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "NORMAL", label: "Normal Ride", sub: "Pickup → Drop" },
                { value: "SPECIAL", label: "Special Ride", sub: "Pickup → Drop → Wait → Return" },
              ].map((t) => (
                <label key={t.value} className={`relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${tripType === t.value ? "border-amber-500 bg-amber-500/10" : "border-white/10 bg-black hover:border-white/20"}`}>
                  <input type="radio" value={t.value} {...register("tripType")} className="sr-only" />
                  <span className="text-white font-bold text-sm mb-1">{t.label}</span>
                  <span className="text-gray-500 text-xs">{t.sub}</span>
                  {t.value === "SPECIAL" && (
                    <span className="mt-2 text-amber-400 text-xs font-medium">Extra charges applicable</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Pickup & Drop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Pickup Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                <input {...register("pickupLocation")} placeholder="Where from?" className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 text-sm transition-colors" />
              </div>
              {errors.pickupLocation && <p className="text-red-400 text-xs mt-1">{errors.pickupLocation.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Drop Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-amber-500" />
                <input {...register("dropLocation")} placeholder="Where to?" className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 text-sm transition-colors" />
              </div>
              {errors.dropLocation && <p className="text-red-400 text-xs mt-1">{errors.dropLocation.message}</p>}
            </div>
          </div>

          {/* Date & Passengers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Date & Time *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                <input type="datetime-local" {...register("dateTime")} className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm transition-colors" />
              </div>
              {errors.dateTime && <p className="text-red-400 text-xs mt-1">{errors.dateTime.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Number of Passengers *</label>
              <div className="relative">
                <Users className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                <select {...register("passengers")} className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm transition-colors">
                  {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} passenger{n > 1 ? "s" : ""}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                <input {...register("phoneNumber")} placeholder="10-digit mobile number" className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 text-sm transition-colors" />
              </div>
              {errors.phoneNumber && <p className="text-red-400 text-xs mt-1">{errors.phoneNumber.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email (Optional)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                <input type="email" {...register("email")} placeholder="for confirmation email" className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 text-sm transition-colors" />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Special Instructions (Optional)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <textarea {...register("specialInstructions")} rows={3} placeholder="Any special requirements..." className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 text-sm transition-colors resize-none" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 text-lg mt-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronRight className="w-5 h-5" />}
            {loading ? "Submitting..." : "Request Booking"}
          </button>
          <p className="text-center text-gray-500 text-xs">We will contact you to confirm your booking details and pricing.</p>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-black pt-16 lg:pt-24">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image src="/images/car_photos/hero_bg3.jpg" fill alt="Booking" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center px-4">
          <span className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-3">Book Your Ride</span>
          <h1 className="font-outfit text-4xl md:text-6xl font-bold text-white">Reserve Your Journey</h1>
        </div>
      </div>
      <Suspense fallback={<div className="flex justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>}>
        <BookingFormContent />
      </Suspense>
    </div>
  );
}
