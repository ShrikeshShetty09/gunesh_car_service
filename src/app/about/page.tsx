import { AboutDriver } from "@/components/home/AboutDriver";
import { BookingCTA } from "@/components/home/BookingCTA";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-16 lg:pt-24">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <Image 
          src="/images/car_photos/hero_bg1.jpg" 
          alt="About Us Hero" 
          fill 
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="relative z-10 text-center px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-bold tracking-widest mb-4">
            OUR STORY
          </span>
          <h1 className="text-4xl md:text-6xl font-outfit font-bold text-white mb-4">About Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
            Delivering excellence in transportation through decades of experience, safety, and unmatched customer service.
          </p>
        </div>
      </div>

      <div className="-mt-10">
        <AboutDriver />
      </div>
      
      <BookingCTA />
    </div>
  );
}
