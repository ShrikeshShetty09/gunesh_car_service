"use client";

import { MessageCircle, Phone, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function FloatingCTA() {
  return (
    <>
      {/* Desktop Floating Actions */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col gap-4 items-center">
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.9, type: "spring" }}
          className="w-16 h-16 md:w-20 md:h-20 bg-amber-500/10 rounded-full flex items-center justify-center shadow-lg border border-amber-500/30 backdrop-blur-md mb-2 animate-bounce"
        >
          <Image src="/images/car_photos/car_icon.png" width={60} height={60} alt="Transport Icon" className="object-contain drop-shadow-md" />
        </motion.div>

        <motion.a
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
          href="https://wa.me/919663953589?text=Hi%20Gunesh%2C%20I%20would%20like%20to%20book%20a%20ride%20with%20Sri%20Durgaparameshwari%20Tourist."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center relative group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-black/80 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            WhatsApp Us
          </span>
        </motion.a>
        
        <motion.a
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.1 }}
          href="tel:+919663953589"
          className="bg-amber-500 text-black p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center relative group"
        >
          <Phone className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-black/80 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Call Now
          </span>
        </motion.a>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-lg border-t border-white/10 p-4 z-50 flex gap-3 pb-safe">
        <a 
          href="tel:+919663953589"
          className="flex-1 bg-amber-500 text-black flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
        >
          <Phone className="w-4 h-4" /> Call
        </a>
        <a 
          href="https://wa.me/919663953589?text=Hi%20Gunesh%2C%20I%20would%20like%20to%20book%20a%20ride%20with%20Sri%20Durgaparameshwari%20Tourist."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-500 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
        <a 
          href="sms:+919663953589"
          className="flex-1 bg-blue-500 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
        >
          <MessageSquare className="w-4 h-4" /> SMS
        </a>
      </div>
    </>
  );
}
