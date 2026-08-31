"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { FAQS } from "@/lib/data";

export default function Faq() {
  return (
    <section
      id="faq"
      className="mx-auto max-w-3xl px-5 py-24 sm:px-8 md:py-36"
    >
      <SectionHeading
        eyebrow="Questions"
        title="Before you"
        italic="ask"
      />

      <Reveal>
        <Accordion className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`item-${i}`}
              className="border-b border-border"
            >
              <AccordionTrigger className="py-6 font-serif text-lg font-medium text-ivory transition-colors hover:text-gold hover:no-underline sm:text-xl [&>svg]:text-gold">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm leading-relaxed text-ivory/60 sm:text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
