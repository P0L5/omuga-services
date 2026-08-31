"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { STATS } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-serif text-5xl font-medium text-gold-gradient sm:text-6xl">
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="hairline-gold w-12" aria-hidden />
              <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.45em] text-gold">
                The OMuga Standard
              </span>
            </div>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.08] text-ivory sm:text-5xl lg:text-[3.4rem]">
              One name for every{" "}
              <em className="text-gold-gradient italic">extraordinary</em>{" "}
              request.
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col justify-end">
          <Reveal delay={0.15}>
            <p className="text-base leading-relaxed text-ivory/70 sm:text-lg">
              OMuga Services began with a simple promise: that luxury in East
              Africa should never require compromise. Today we are the quiet
              force behind seamless arrivals at Entebbe, candle-lit dinners in
              Kololo residences, weekends at safari lodges, and the keys to
              homes most people never see listed.
            </p>
            <p className="mt-5 text-base leading-relaxed text-ivory/70 sm:text-lg">
              Hotels and Airbnb bookings. A concierge that answers at any hour.
              A property desk that brokers villas, land and verified homes.
              Three crafts, one standard — yours.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-y-12 border-t border-border pt-12 md:grid-cols-4 md:pt-16">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1} className="text-center">
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-ivory/50">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
