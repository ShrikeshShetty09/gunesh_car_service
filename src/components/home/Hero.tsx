"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Phone } from "lucide-react";

const images = [
  "/images/car_photos/hero_bg1.jpg",
  "/images/car_photos/hero_bg2.jpg",
  "/images/car_photos/hero_bg3.jpg",
  "/images/car_photos/hero_bg4.jpg",
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[100svh] w-full bg-black flex flex-col">
      {/* Background slideshow */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt="Premium Transport Service"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

      {/* Content — padded top for navbar, padded bottom for breathing room */}
      <div className="relative z-10 flex flex-col justify-center flex-1 pt-16 lg:pt-36 pb-24 lg:pb-0 px-5 md:px-10">
        <div className="max-w-3xl w-full">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs md:text-sm font-bold tracking-widest mb-4 md:mb-6">
              ✦ PREMIUM TRANSPORT
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-outfit text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 lg:mb-6"
          >
            Driven by Experience.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
              Trusted for Every Journey.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-sm sm:text-base lg:text-xl text-gray-300 mb-7 lg:mb-10 max-w-xl"
          >
            Experience unparalleled comfort and reliability with Gunesh Raju Shetty — over 20 years of professional driving excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col xs:flex-row gap-3 sm:gap-4"
          >
            <Link
              href="/booking"
              className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-6 py-3.5 lg:px-8 lg:py-4 rounded-full font-bold text-base lg:text-lg overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Your Ride <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </Link>

            <Link
              href="tel:+919663953589"
              className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3.5 lg:px-8 lg:py-4 rounded-full font-bold text-base lg:text-lg hover:bg-white/20 transition-all whitespace-nowrap"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-amber-400 shrink-0" />
              +91 96639 53589
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
