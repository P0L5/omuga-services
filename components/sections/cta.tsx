"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { waLink } from "@/lib/data";

export default function Cta() {
  return (
    <section id="book" className="px-5 pb-24 sm:px-8 md:pb-36">
      <Reveal className="mx-auto max-w-7xl">
        <div className="grain-overlay relative overflow-hidden rounded-3xl border border-blue/25 bg-gradient-to-br from-card via-[#0c1226] to-card px-6 py-20 text-center sm:px-12 md:py-28">
          {/* Glows */}
          <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-blue/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-blue/10 blur-[100px]" />

          <div className="relative">
            <div className="flex items-center justify-center gap-4">
              <span className="hairline-blue w-12" aria-hidden />
              <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.45em] text-blue">
                Begin Tonight
              </span>
              <span className="hairline-blue w-12" aria-hidden />
            </div>

            <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.05] text-ivory sm:text-6xl">
              Your next stay is{" "}
              <em className="text-shimmer italic">one message</em> away.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/60 sm:text-lg">
              Tell us where you&apos;re going — we&apos;ll handle the rest. Stays,
              chauffeurs, chefs and keys to remarkable homes.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                onClick={() =>
                  window.open(
                    waLink("Hello Omuga Services — let's plan something."),
                    "_blank"
                  )
                }
                className="h-14 cursor-pointer rounded-full bg-blue px-10 text-[0.72rem] font-bold uppercase tracking-[0.28em] text-white transition-all duration-300 hover:bg-blue-light hover:blue-glow"
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </Button>
              <span className="text-xs uppercase tracking-[0.25em] text-ivory/40">
                Replies within minutes
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
