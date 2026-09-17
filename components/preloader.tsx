"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/reveal";
import { getLenis } from "@/lib/scroll";

const LETTERS = ["O", "M", "U", "G", "A"];

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const lenis = getLenis();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const timer = setTimeout(
      () => {
        setDone(true);
        lenis?.start();
        document.documentElement.style.overflow = "";
      },
      reduced ? 150 : 2100
    );

    return () => {
      clearTimeout(timer);
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="flex overflow-hidden">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + i * 0.09,
                  ease: EASE,
                }}
                className="font-serif text-5xl sm:text-7xl font-medium tracking-[0.18em] text-ivory"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
            className="mt-6 h-px w-40 sm:w-56 origin-center bg-gradient-to-r from-transparent via-blue to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-5 text-[0.65rem] sm:text-xs uppercase tracking-[0.5em] text-blue"
          >
            Services
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
