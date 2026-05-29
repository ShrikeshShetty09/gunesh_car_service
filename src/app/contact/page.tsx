"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/validations";
import Image from "next/image";
import { Phone, Mail, User, MessageSquare, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

import { useToast } from "@/components/ui/Toast";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      toast("Message sent successfully!");
      setSubmitted(true);
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-black">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-16">
          <span className="text-amber-400 font-bold tracking-widest text-sm uppercase">Get In Touch</span>
          <h1 className="font-outfit text-4xl md:text-6xl font-bold text-white mt-3 mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-xl mx-auto">Ready to plan your journey? Reach out and we will get back to you quickly.</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Driver card */}
          <div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-w-sm mx-auto">
              <Image src="/images/gunesh_photo/gunesh_selfie.jpg" fill alt="Gunesh" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute bottom-0 w-full p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-1">Gunesh Raju Shetty</h3>
                <p className="text-amber-400 font-medium mb-4">Your Trusted Driver</p>
                <div className="flex flex-col gap-3">
                  <a href="tel:+919663953589" className="flex items-center justify-center gap-2 bg-amber-500 text-black font-bold py-3 rounded-xl hover:bg-amber-400 transition-colors">
                    <Phone className="w-4 h-4" />+91 96639 53589
                  </a>
                  <a href="tel:+919538474605" className="flex items-center justify-center gap-2 bg-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition-colors">
                    <Phone className="w-4 h-4" />+91 95384 74605
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <CheckCircle className="w-16 h-16 text-green-400 mb-6" />
                <h2 className="text-2xl font-bold text-white mb-3">Message Sent!</h2>
                <p className="text-gray-400">Thank you! We will contact you shortly.</p>
              </div>
            ) : (
              <div className="bg-neutral-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                      <input {...register("name")} placeholder="Full name" className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 text-sm" />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                      <input {...register("phone")} placeholder="10-digit mobile" className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 text-sm" />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email (Optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                      <input type="email" {...register("email")} placeholder="your@email.com" className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message *</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                      <textarea {...register("message")} rows={4} placeholder="Tell us your travel needs..." className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 text-sm resize-none" />
                    </div>
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 hover:opacity-90 transition-opacity">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
