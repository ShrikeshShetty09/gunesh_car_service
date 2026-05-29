"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User, Users, Plane, Map, Building, Briefcase, CarFront } from "lucide-react";

const services = [
  { icon: User, title: "Personal Car Transport", desc: "Comfortable and private rides for your daily or occasional personal travel needs." },
  { icon: Users, title: "Family Trip Transport", desc: "Spacious 7-seater comfort perfect for family vacations and weekend getaways." },
  { icon: Plane, title: "Airport Pickup/Drop", desc: "Punctual and reliable airport transfers to ensure you never miss a flight." },
  { icon: Map, title: "Outstation Rides", desc: "Safe and smooth long-distance travel to your favorite outstation destinations." },
  { icon: Building, title: "Corporate Transport", desc: "Professional transportation services for corporate events and business travel." },
  { icon: Briefcase, title: "Driver-on-Hire", desc: "Hire an experienced professional driver for your own vehicle." },
];

export function Services() {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="w-80 h-80 md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[400px] relative opacity-100 drop-shadow-[0_0_40px_rgba(245,158,11,0.6)]">
              <Image src="/images/car_photos/car_icon.png" alt="Service Icon" fill className="object-contain scale-125 md:scale-150" />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-outfit text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Premium Transport Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Tailored travel solutions designed to provide maximum comfort, safety, and reliability for every type of journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-neutral-900 border border-white/5 p-8 rounded-3xl hover:bg-neutral-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.2)]"
            >
              <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500 transition-all duration-300">
                <service.icon className="w-7 h-7 text-amber-500 group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
