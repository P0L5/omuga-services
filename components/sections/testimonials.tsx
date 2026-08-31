"use client";

import { Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionHeading from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <section
      id="stories"
      className="relative border-y border-border bg-card/40 py-24 md:py-36"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Guest Words"
          title="Spoken in"
          italic="good company"
        />

        <Reveal>
          <Carousel
            opts={{ align: "center", loop: true }}
            className="relative"
          >
            <CarouselContent>
              {TESTIMONIALS.map((t) => (
                <CarouselItem key={t.name}>
                  <figure className="flex flex-col items-center px-2 text-center sm:px-14">
                    <span className="mb-8 flex size-14 items-center justify-center rounded-full border border-gold/30 text-gold">
                      <Quote className="size-5 fill-gold" />
                    </span>
                    <blockquote className="font-serif text-2xl font-medium italic leading-snug text-ivory/90 sm:text-3xl">
                      “{t.quote}”
                    </blockquote>
                    <div className="mt-8 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                    <figcaption className="mt-4">
                      <p className="text-sm font-bold uppercase tracking-[0.25em] text-ivory">
                        {t.name}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold/70">
                        {t.origin}
                      </p>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-12 flex items-center justify-center gap-4">
              <CarouselPrevious className="static size-11 translate-y-0 rounded-full border-gold/30 bg-transparent text-gold transition-colors hover:bg-gold hover:text-ink" />
              <CarouselNext className="static size-11 translate-y-0 rounded-full border-gold/30 bg-transparent text-gold transition-colors hover:bg-gold hover:text-ink" />
            </div>
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
