"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Booking" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg py-2 lg:py-3"
          : "bg-transparent py-2 lg:py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 lg:gap-3 group">
          <div className="relative w-12 h-12 lg:w-24 lg:h-24 group-hover:scale-110 transition-transform shrink-0">
            <Image src="/images/car_photos/car_icon.png" fill alt="Logo" className="object-contain drop-shadow-xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-outfit font-bold text-sm lg:text-xl text-white tracking-tight leading-tight">
              SRI DURGAPARAMESHWARI
            </span>
            <span className="text-[10px] lg:text-xs text-amber-400 font-medium tracking-widest">
              TOURIST
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-amber-400",
                    pathname === link.href ? "text-amber-400" : "text-gray-200"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="tel:+919663953589"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-5 py-2.5 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            <span>Book Now</span>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 py-4 lg:hidden shadow-2xl"
          >
            <ul className="flex flex-col px-4 gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      pathname === link.href
                        ? "bg-white/10 text-amber-400"
                        : "text-gray-200 hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-4">
                <Link
                  href="tel:+919663953589"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-5 py-3.5 rounded-xl font-bold text-lg"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call to Book</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
