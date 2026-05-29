"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What types of rides do you offer?",
    a: "We offer normal rides (pickup and drop), special round-trips with waiting time, airport transfers, corporate transport, and outstation trips."
  },
  {
    q: "How many people can fit in the vehicle?",
    a: "Our vehicle is a premium 2025 Maruti Suzuki Ertiga, which is a 7-seater, providing ample space and comfort for small groups or families."
  },
  {
    q: "Are there extra charges for waiting?",
    a: "Yes, for 'Special Rides' that require waiting between pickup and return, reasonable extra waiting charges are applicable based on the duration."
  },
  {
    q: "How do I book a ride?",
    a: "You can book easily by calling or WhatsApping us directly at +91 96639 53589 or +91 95384 74605."
  },
  {
    q: "Do you offer driver-on-hire services?",
    a: "Yes! If you have your own vehicle and need a highly experienced, professional driver, Gunesh Raju Shetty is available for hire."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-outfit font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Find answers to common questions about our transport services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-white text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 pt-0 text-gray-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
