"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { TOURS } from "@/lib/data";
import { cn } from "@/lib/utils";

function PhoneTour({
  tour,
  tilt,
  yOffset,
}: {
  tour: (typeof TOURS)[number];
  tilt: string;
  yOffset: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, -yOffset]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn("flex flex-col items-center", tilt)}
    >
      {/* Phone frame */}
      <div className="phone-frame relative w-[240px] p-2.5 sm:w-[280px] md:w-[300px]">
        {/* Notch */}
        <div className="absolute left-1/2 top-5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />

        <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-ink">
          <video
            src={tour.video}
            poster={tour.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/80 to-transparent" />
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-gold/90">
              <Play className="size-3 fill-ink text-ink" />
            </span>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-ivory">
              {tour.duration} Tour
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-xs text-center">
        <h3 className="font-serif text-2xl font-medium text-ivory">
          {tour.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ivory/55">
          {tour.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function VideoTours() {
  return (
    <section
      id="tours"
      className="relative overflow-hidden py-24 md:py-36"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/6 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Video Tours"
          title="Walk through,"
          italic="before you arrive"
        />

        <div className="flex flex-col items-center justify-center gap-16 md:flex-row md:items-start md:gap-10 lg:gap-20">
          <Reveal className="md:mt-0">
            <PhoneTour tour={TOURS[0]} tilt="md:-rotate-2" yOffset={40} />
          </Reveal>
          <Reveal delay={0.15} className="md:mt-24">
            <PhoneTour tour={TOURS[1]} tilt="md:rotate-2" yOffset={70} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
