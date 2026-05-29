import Link from "next/link";
import { Phone, Mail, MapPin, Car } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-amber-500 to-yellow-300 p-2 rounded-xl">
                <Car className="w-6 h-6 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-outfit font-bold text-lg text-white tracking-tight leading-tight">
                  SRI DURGAPARAMESHWARI
                </span>
                <span className="text-xs text-amber-400 font-medium tracking-widest">
                  TOURIST
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium transport services driven by over 20 years of experience. We ensure your journeys are safe, comfortable, and memorable.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-amber-500 font-bold italic tracking-wide">
                "Driven by Experience. Trusted for Every Journey."
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-outfit font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Booking', 'Gallery', 'Reviews', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-outfit font-bold text-lg mb-6 text-white">Our Services</h3>
            <ul className="space-y-4">
              {[
                'Personal Car Transport',
                'Family Trip Transport',
                'Airport Pickup/Drop',
                'Outstation Rides',
                'Corporate Transport',
                'Driver-on-Hire'
              ].map((service) => (
                <li key={service} className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-outfit font-bold text-lg mb-6 text-white">Contact Info</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+919663953589" className="flex items-start gap-3 text-gray-400 hover:text-amber-400 transition-colors group">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Booking Line 1</span>
                    <span className="text-white group-hover:text-amber-400">+91 96639 53589</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:+919538474605" className="flex items-start gap-3 text-gray-400 hover:text-amber-400 transition-colors group">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Booking Line 2</span>
                    <span className="text-white group-hover:text-amber-400">+91 95384 74605</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm">Driven by Gunesh Raju Shetty</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Sri Durgaparameshwari Tourist. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
