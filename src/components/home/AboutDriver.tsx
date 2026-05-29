"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Award, Navigation, ShieldCheck } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function AboutDriver() {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/images/gunesh_photo/driver_withcar.jpg"
                alt="Gunesh Raju Shetty with his car"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-amber-400 overflow-hidden relative">
                    <Image
                      src="/images/gunesh_photo/gunesh_selfie.jpg"
                      alt="Gunesh Selfie"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Gunesh Raju Shetty</h3>
                    <p className="text-amber-400 font-medium">Professional Driver</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute top-10 -right-5 md:-right-10 bg-black border border-amber-500/30 p-4 rounded-2xl shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/20 p-2 rounded-lg text-amber-500">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white"><AnimatedCounter target={20} suffix="+" /> Years</div>
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Experience</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <h2 className="text-amber-500 font-bold tracking-widest text-sm uppercase mb-3">About Your Driver</h2>
              <h3 className="font-outfit text-4xl md:text-5xl font-bold text-white leading-tight">
                Trusted Experience From Dubai to Your Doorstep
              </h3>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              With over two decades of professional driving experience in Trinity Engineering Services, Dubai, I bring international standards of safety, punctuality, and comfort to every ride. 
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { icon: ShieldCheck, title: "Safety First", desc: "Impeccable driving record across diverse vehicles." },
                { icon: Navigation, title: "Route Expert", desc: "Deep knowledge of local and outstation routes." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-amber-400 shrink-0">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <h4 className="text-white font-bold mb-4">Vehicles Mastered:</h4>
              <div className="flex flex-wrap gap-3">
                {['Cars', 'Bus', 'Tempo', 'Omni', '14 Seater', '7 Seater'].map((vehicle) => (
                  <span key={vehicle} className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-gray-300 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    {vehicle}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
