"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const images = [
  { src: "/images/car_photos/hero_bg1.jpg", alt: "Car Left Angle", colSpan: "md:col-span-2", rowSpan: "md:row-span-2" },
  { src: "/images/car_photos/hero_bg4.jpg", alt: "Car Backside", colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
  { src: "/images/gunesh_photo/ride_driver_photo.jpg", alt: "Ride Experience", colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
  { src: "/images/car_photos/hero_bg2.jpg", alt: "Car Right Angle", colSpan: "md:col-span-2", rowSpan: "md:row-span-1" },
];

export function GalleryPreview() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-amber-500 font-bold tracking-widest text-sm uppercase mb-3">Our Fleet & Experience</h2>
            <h3 className="font-outfit text-4xl md:text-5xl font-bold text-white leading-tight">
              A Glimpse of Your Journey
            </h3>
          </div>
          <Link href="/gallery" className="group flex items-center gap-2 text-amber-500 font-bold hover:text-amber-400 transition-colors">
            View Full Gallery <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${img.colSpan} ${img.rowSpan}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
