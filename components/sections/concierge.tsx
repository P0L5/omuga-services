"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { CONCIERGE, waLink } from "@/lib/data";

export default function Concierge() {
  return (
    <section
      id="concierge"
      className="relative border-y border-border bg-card/40 py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="flex flex-col justify-center">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="hairline-blue w-12" aria-hidden />
              <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.45em] text-blue">
                Lifestyle & Concierge
              </span>
            </div>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.08] text-ivory sm:text-5xl lg:text-[3.4rem]">
              Ask once.{" "}
              <em className="text-blue-gradient italic">Consider it done.</em>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/65 sm:text-lg">
              One WhatsApp message sets our concierge in motion — a chauffeur
              at arrivals, a chef in your kitchen, an itinerary built around
              the way you travel.
            </p>
            <div className="mt-9">
              <Button
                onClick={() =>
                  window.open(
                    waLink("Hello Omuga — I have a concierge request."),
                    "_blank"
                  )
                }
                className="h-13 cursor-pointer rounded-full bg-blue px-9 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-white transition-all duration-300 hover:bg-blue-light hover:blue-glow"
              >
                <MessageCircle className="size-4" />
                Message the Concierge
              </Button>
            </div>
          </Reveal>
        </div>

        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2" gap={0.12}>
          {CONCIERGE.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <div className="group flex h-full flex-col bg-card p-8 transition-colors duration-500 hover:bg-accent/60">
                <span className="mb-6 flex size-12 items-center justify-center rounded-full border border-blue/30 text-blue transition-all duration-500 group-hover:bg-blue group-hover:text-white">
                  <item.icon className="size-5" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-xl font-medium text-ivory">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/55">
                  {item.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
