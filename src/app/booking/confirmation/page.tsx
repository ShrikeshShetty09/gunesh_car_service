import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, MessageSquare, Award, Clock, Star } from "lucide-react";
import { format } from "date-fns";

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  if (!id) notFound();

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { price: true },
  });
  if (!booking) notFound();

  return (
    <div className="min-h-screen bg-black pt-24 pb-28">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Success banner */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 border-2 border-green-500/50 rounded-full mb-6">
            <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-outfit text-4xl font-bold text-white mb-3">Booking Received!</h1>
          <p className="text-gray-400 text-lg">Ref: <span className="text-amber-400 font-bold">#{id.slice(-8).toUpperCase()}</span></p>
        </div>

        {/* Driver card */}
        <div className="bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden mb-6 shadow-2xl">
          <div className="relative h-56">
            <Image src="/images/gunesh_photo/driver_withcar.jpg" fill alt="Gunesh Raju Shetty" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Gunesh Raju Shetty</h2>
                <p className="text-amber-400 font-medium">Professional Driver</p>
              </div>
              <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-amber-400 font-bold text-sm">5.0</span>
              </div>
            </div>

            {/* Experience badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["20+ Years Experience", "Dubai Professional", "7-Seater Expert", "Multi-Vehicle Licensed"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium">
                  <Award className="w-3 h-3 text-amber-500" />{b}
                </span>
              ))}
            </div>

            {/* Car details */}
            <div className="bg-black/40 rounded-2xl p-4 border border-white/5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 relative">
                  <Image src="/images/car_photos/car_icon.png" fill alt="Car" className="object-contain" />
                </div>
                <div>
                  <p className="text-white font-bold">Maruti Suzuki Ertiga</p>
                  <p className="text-amber-400 text-sm">2025 Premium Model</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[["7", "Seater"], ["AC", "Climate"], ["2025", "Model"]].map(([val, label]) => (
                  <div key={label} className="bg-white/5 rounded-xl p-2">
                    <p className="text-white font-bold text-lg">{val}</p>
                    <p className="text-gray-500 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking summary */}
            <div className="space-y-2 mb-6">
              <h3 className="text-white font-bold mb-3">Your Booking Summary</h3>
              {[
                ["Pickup", booking.pickupLocation],
                ["Drop", booking.dropLocation],
                ["Date & Time", format(booking.dateTime, "dd MMM yyyy, hh:mm a")],
                ["Passengers", String(booking.passengers)],
                ["Trip Type", booking.tripType],
                ...(booking.price ? [["Price", `₹${booking.price.amount}`]] : []),
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2.5 border-b border-white/5">
                  <span className="text-gray-500 text-sm">{label}</span>
                  <span className="text-white text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
              <p className="text-yellow-400 text-sm font-medium">Status: Pending Confirmation — We will call you shortly!</p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <a href="tel:+919663953589" className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold py-4 rounded-xl text-lg hover:opacity-90 transition-opacity">
                <Phone className="w-5 h-5" />Call Now: 96639 53589
              </a>
              <a href="https://wa.me/919663953589" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-green-500 text-white font-bold py-4 rounded-xl text-lg hover:bg-green-400 transition-colors">
                <MessageCircle className="w-5 h-5" />WhatsApp Now
              </a>
              <a href="sms:+919663953589" className="flex items-center justify-center gap-3 w-full bg-blue-500 text-white font-bold py-4 rounded-xl text-lg hover:bg-blue-400 transition-colors">
                <MessageSquare className="w-5 h-5" />Send SMS
              </a>
              <p className="text-center text-amber-400 font-medium text-sm pt-2">📞 Call now to have faster response.</p>
            </div>
          </div>
        </div>

        <Link href="/" className="block text-center text-gray-500 hover:text-white transition-colors text-sm">← Back to Home</Link>
      </div>
    </div>
  );
}
