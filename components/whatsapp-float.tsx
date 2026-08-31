"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/data";
import { EASE } from "@/components/reveal";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={waLink("Hello OMuga Services — I'd like to enquire.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with OMuga Services on WhatsApp"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 4, ease: EASE }}
      className="group fixed bottom-6 right-6 z-40 flex size-14 animate-gold-pulse items-center justify-center rounded-full bg-gold text-ink shadow-2xl transition-transform duration-300 hover:scale-110 sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="size-6" />
      <span className="pointer-events-none absolute right-full mr-4 hidden whitespace-nowrap rounded-full border border-gold/30 bg-ink/90 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 sm:block">
        Concierge, 24/7
      </span>
    </motion.a>
  );
}
