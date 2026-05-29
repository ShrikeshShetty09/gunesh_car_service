"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

type GalleryImage = { id: string; url: string; order: number };

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then(setImages)
      .catch(console.error);
  }, []);

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-black">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-16">
          <span className="text-amber-400 font-bold tracking-widest text-sm uppercase">Our Fleet & Journeys</span>
          <h1 className="font-outfit text-4xl md:text-6xl font-bold text-white mt-3 mb-4">Gallery</h1>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative overflow-hidden rounded-2xl group break-inside-avoid cursor-pointer"
              onClick={() => setLightbox(img.url)}
            >
              <Image
                src={img.url}
                alt={`Gallery ${i + 1}`}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                unoptimized={img.url.startsWith("http")}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 w-10 h-10 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
          {images.length === 0 && (
            <div className="col-span-3 text-center text-gray-500 py-24">Loading gallery...</div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 text-white bg-white/10 p-2 rounded-full hover:bg-white/20">
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt="Lightbox"
                fill
                className="object-contain"
                unoptimized={lightbox.startsWith("http")}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
