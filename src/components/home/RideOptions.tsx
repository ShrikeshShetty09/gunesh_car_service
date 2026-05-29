"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRightLeft, Route, Check, Users, ChevronRight } from "lucide-react";
import Link from "next/link";

export function RideOptions() {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <h2 className="text-amber-500 font-bold tracking-widest text-sm uppercase mb-3">Flexible Plans</h2>
              <h3 className="font-outfit text-4xl md:text-5xl font-bold text-white leading-tight">
                Ride Options Tailored For You
              </h3>
            </div>
            <p className="text-gray-400 text-lg">
              Whether you need a quick drop or a dedicated vehicle for the entire day, we have a ride option that fits your schedule perfectly.
            </p>

            <div className="space-y-6 pt-4">
              {/* Option 1 */}
              <div className="bg-black border border-white/10 p-6 rounded-3xl hover:border-amber-500/50 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="bg-white/5 p-6 rounded-3xl group-hover:bg-amber-500/10 transition-colors">
                    <div className="w-24 h-24 md:w-32 md:h-32 relative drop-shadow-xl">
                      <Image src="/images/car_photos/car_icon.png" fill alt="Car Icon" className="object-contain scale-125" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Normal Ride</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-300 mb-3">
                      <span className="bg-white/10 px-3 py-1 rounded-full">Pickup</span>
                      <ArrowRightLeft className="w-4 h-4 text-amber-500" />
                      <span className="bg-white/10 px-3 py-1 rounded-full">Drop</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Direct transfer from your starting point to your destination. Simple, fast, and efficient.</p>
                    <Link href="/booking?type=NORMAL" className="inline-flex items-center gap-2 bg-white/10 hover:bg-amber-500 text-white hover:text-black transition-colors px-4 py-2 rounded-lg text-sm font-bold">
                      Book Now <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Option 2 */}
              <div className="relative bg-gradient-to-br from-neutral-900 to-black border border-amber-500/30 p-6 rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.1)] group hover:border-amber-500 transition-colors">
                <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500/20 p-6 rounded-3xl group-hover:bg-amber-500/30 transition-colors">
                    <div className="w-24 h-24 md:w-32 md:h-32 relative drop-shadow-xl">
                      <Image src="/images/car_photos/car_icon.png" fill alt="Car Icon" className="object-contain scale-125" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Special Ride</h4>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300 mb-3">
                      <span className="bg-white/10 px-3 py-1 rounded-full">Pickup</span>
                      <ArrowRightLeft className="w-3 h-3 text-amber-500" />
                      <span className="bg-white/10 px-3 py-1 rounded-full">Drop</span>
                      <ArrowRightLeft className="w-3 h-3 text-amber-500" />
                      <span className="bg-amber-500/20 text-amber-400 font-medium px-3 py-1 rounded-full">Wait</span>
                      <ArrowRightLeft className="w-3 h-3 text-amber-500" />
                      <span className="bg-white/10 px-3 py-1 rounded-full">Pickup</span>
                      <ArrowRightLeft className="w-3 h-3 text-amber-500" />
                      <span className="bg-white/10 px-3 py-1 rounded-full">Return</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Perfect for round trips, meetings, or sightseeing where you need the car to wait for you.</p>
                    <div className="inline-flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded mb-4">
                      <Check className="w-3 h-3" /> Extra Charges Applicable for Waiting
                    </div>
                    <br />
                    <Link href="/booking?type=SPECIAL" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black transition-transform hover:scale-105 px-4 py-2 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                      Book Now <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square max-w-lg mx-auto overflow-visible">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-yellow-200 rounded-full blur-[100px] opacity-20 animate-pulse" />
              <Image
                src="/images/car_photos/hero_bg3.jpg"
                alt="Our Premium Vehicle"
                fill
                className="object-cover rounded-[2rem] shadow-2xl border border-white/10 z-10"
              />
              
              {/* Floating Vehicle Detail Card */}
              <div className="absolute bottom-3 left-3 lg:-bottom-8 lg:-left-8 bg-black/90 backdrop-blur-xl border border-white/10 p-4 lg:p-5 rounded-2xl z-20 shadow-2xl max-w-[220px] lg:max-w-[250px]">
                <h5 className="font-bold text-white text-base lg:text-lg mb-1">Maruti Suzuki Ertiga</h5>
                <p className="text-amber-400 text-xs lg:text-sm font-medium mb-2 lg:mb-3">2025 Premium Model</p>
                <div className="flex justify-between text-gray-400 text-xs lg:text-sm border-t border-white/10 pt-2 lg:pt-3">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3 lg:w-4 lg:h-4" /> 7 Seater</span>
                  <span className="flex items-center gap-1">AC/Heater</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
