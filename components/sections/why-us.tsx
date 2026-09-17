"use client";

import SectionHeading from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/reveal";
import { WHY_US } from "@/lib/data";

export default function WhyUs() {
  return (
    <section
      id="why-omuga"
      className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36"
    >
      <SectionHeading
        eyebrow="Why Omuga"
        title="Trusted with the"
        italic="important things"
      />

      <Stagger className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" gap={0.12}>
        {WHY_US.map((item, i) => (
          <StaggerItem key={item.title}>
            <div className="group relative border-t border-blue/25 pt-8 transition-colors duration-500 hover:border-blue/60">
              <span className="absolute -top-px left-0 h-px w-12 bg-blue transition-all duration-700 group-hover:w-full" />
              <span className="mb-6 flex size-12 items-center justify-center rounded-full border border-blue/30 text-blue transition-all duration-500 group-hover:bg-blue group-hover:text-white">
                <item.icon className="size-5" strokeWidth={1.5} />
              </span>
              <span className="absolute right-0 top-6 font-serif text-4xl font-light text-ivory/10">
                0{i + 1}
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
    </section>
  );
}
