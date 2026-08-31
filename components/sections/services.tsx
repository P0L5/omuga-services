"use client";

import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/reveal";
import { SERVICES, waLink } from "@/lib/data";

export default function Services() {
  return (
    <section
      id="services"
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36"
    >
      <SectionHeading
        eyebrow="What We Do"
        title="Three crafts,"
        italic="one standard"
      />

      <Stagger className="grid gap-6 md:grid-cols-3" gap={0.15}>
        {SERVICES.map((service) => (
          <StaggerItem key={service.title}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:gold-glow sm:p-10">
              {/* Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-gold/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="mb-8 flex items-start justify-between">
                <span className="flex size-14 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
                  <service.icon className="size-6" strokeWidth={1.5} />
                </span>
                <span className="font-serif text-5xl font-light text-ivory/10 transition-colors duration-500 group-hover:text-gold/25">
                  {service.index}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-medium text-ivory sm:text-[1.7rem]">
                {service.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory/60">
                {service.description}
              </p>

              <ul className="mt-7 space-y-2.5 border-t border-border pt-6">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ivory/70"
                  >
                    <span className="size-1 rotate-45 bg-gold" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={waLink(service.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-gold transition-colors duration-300 hover:text-gold-light"
              >
                {service.cta}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
