"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, Calendar, MessageSquare, Image as ImageIcon,
  TrendingUp, LogOut, Car, Menu, X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/earnings", label: "Earnings", icon: TrendingUp },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLinks = () => (
    <nav className="flex-1 p-4 space-y-1">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              active
                ? "bg-amber-500 text-black"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Car className="w-6 h-6 text-amber-400" />
          <span className="font-outfit font-bold text-white text-sm">SDT Admin</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-1">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80" onClick={() => setMobileOpen(false)}>
          <div className="w-72 h-full bg-neutral-900 border-r border-white/10 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/10">
              <span className="font-outfit font-bold text-white">Admin Panel</span>
            </div>
            <NavLinks />
            <div className="p-4 border-t border-white/10">
              <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 text-sm font-medium">
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-neutral-900 border-r border-white/10 min-h-screen">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="font-outfit font-bold text-white text-sm leading-tight">SDT Admin</p>
              <p className="text-xs text-gray-500">Management Panel</p>
            </div>
          </div>
        </div>
        <NavLinks />
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
