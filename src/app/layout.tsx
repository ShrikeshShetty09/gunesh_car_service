import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Durgaparameshwari Tourist | Premium Transport Service",
  description:
    "Driven by Experience. Trusted for Every Journey. Premium transport services with Gunesh Raju Shetty.",
  keywords: "Karnataka car service, Karnataka tours and travels, Airport pickup Karnataka, Outstation cab Karnataka, Ertiga tourist service Karnataka, Family trip transport Karnataka, Goa trip car service, Bangalore airport taxi, Driver on hire Karnataka, Dubai experienced driver Karnataka",
};

import { ToastContainer } from "@/components/ui/Toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-black text-slate-50 flex flex-col antialiased selection:bg-amber-500/30 selection:text-amber-200`}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
        <ToastContainer />
      </body>
    </html>
  );
}
