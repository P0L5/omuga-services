"use client";

import Image from "next/image";
import { BedDouble, MapPin, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/reveal";
import { CONTACT_PROMPTS, PROPERTIES, waLink } from "@/lib/data";

export default function Properties() {
  return (
    <section
      id="stays"
      className="relative border-y border-border bg-card/40 py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Featured Stays"
          title="Residences with"
          italic="a signature"
        />

        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" gap={0.15}>
          {PROPERTIES.map((property) => (
            <StaggerItem key={property.name}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={property.image}
                    alt={`${property.name} — ${property.location}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/20" />

                  <Badge className="absolute left-4 top-4 rounded-full border border-gold/40 bg-ink/60 px-3.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-gold backdrop-blur-md">
                    {property.tag}
                  </Badge>

                  <div className="absolute bottom-4 right-4 rounded-full border border-gold/30 bg-ink/70 px-4 py-2 backdrop-blur-md">
                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-ivory/60">
                      From as low as{" "}
                    </span>
                    <span className="font-serif text-xl font-semibold text-gold">
                      {property.price}
                    </span>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="font-serif text-2xl font-medium text-ivory transition-colors duration-300 group-hover:text-gold">
                    {property.name}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ivory/55">
                    <MapPin className="size-3.5 text-gold/70" />
                    {property.location}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {property.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-ivory/50"
                      >
                        <BedDouble className="size-3.5 text-gold/50" />
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={waLink(CONTACT_PROMPTS.property(property.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-gold transition-all duration-300 hover:border-gold hover:text-gold-light"
                  >
                    <MessageCircle className="size-3.5" />
                    Enquire on WhatsApp
                  </a>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
