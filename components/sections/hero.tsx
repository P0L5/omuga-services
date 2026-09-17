"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO } from "@/lib/data";
import { scrollToSection } from "@/lib/scroll";
import { EASE } from "@/components/reveal";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh items-end overflow-hidden"
    >
      {/* Background video + image fallback poster with parallax */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <video
          src={HERO.video}
          poster={HERO.image}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="A luxury residence curated by Omuga Services"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/75 via-transparent to-transparent" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-40 sm:px-8 md:pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.4, ease: EASE }}
          className="mb-7 flex items-center gap-4"
        >
          <span className="hairline-blue w-12 sm:w-20" aria-hidden />
          <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.45em] text-blue">
            {HERO.eyebrow}
          </span>
        </motion.div>

        <h1 className="font-serif text-[17vw] font-medium leading-[0.95] text-ivory sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          {HERO.titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: 2.5 + i * 0.14,
                  ease: EASE,
                }}
                className="block"
              >
                {i === 1 ? (
                  <em className="text-blue-gradient italic">{line}</em>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 3.1, ease: EASE }}
          className="mt-7 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-lg"
        >
          {HERO.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 3.3, ease: EASE }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Button
            onClick={() => scrollToSection(HERO.primaryCta.href)}
            className="h-13 cursor-pointer rounded-full bg-blue px-9 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-white transition-all duration-300 hover:bg-blue-light hover:blue-glow"
          >
            {HERO.primaryCta.label}
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(HERO.secondaryCta.href, "_blank")}
            className="h-13 cursor-pointer rounded-full border-ivory/25 bg-transparent px-9 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-ivory backdrop-blur-sm transition-all duration-300 hover:border-blue hover:text-blue"
          >
            <MessageCircle className="size-4" />
            {HERO.secondaryCta.label}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.8 }}
        onClick={() => scrollToSection("#about")}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        aria-label="Scroll down"
      >
        <span className="text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-ivory/50 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/15">
          <span className="absolute left-0 top-0 h-5 w-px animate-scroll-cue bg-blue" />
        </span>
        <ArrowDown className="size-3.5 text-blue" />
      </motion.button>
    </section>
  );
}
