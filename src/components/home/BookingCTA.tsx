"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PhoneCall, CalendarCheck, MapPin } from "lucide-react";

export function BookingCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 z-10" />
        <div 
          className="absolute inset-0 bg-[url('/images/car_photos/hero_bg3.jpg')] bg-cover bg-center bg-fixed bg-no-repeat"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10 flex flex-col items-center">
            <div className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 relative drop-shadow-[0_0_30px_rgba(245,158,11,0.6)] mb-6">
              <Image src="/images/car_photos/car_icon.png" fill alt="Car Icon" className="object-contain scale-125" />
            </div>
            <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white mb-4">
              Ready for a Premium Ride?
            </h2>
            <p className="text-gray-300 text-lg">
              Book your ride today and experience the comfort, safety, and reliability of Sri Durgaparameshwari Tourist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: PhoneCall, title: "24/7 Support", desc: "Always available for bookings" },
              { icon: CalendarCheck, title: "Easy Booking", desc: "Simple and fast process" },
              { icon: MapPin, title: "Any Destination", desc: "Local & Outstation rides" },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="bg-amber-500/20 p-4 rounded-full mb-4 text-amber-500">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="tel:+919663953589" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              <PhoneCall className="w-6 h-6" />
              Call Now: 96639 53589
            </a>
            <span className="text-white font-bold">OR</span>
            <a 
              href="tel:+919538474605" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform"
            >
              <PhoneCall className="w-6 h-6" />
              Call: 95384 74605
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
