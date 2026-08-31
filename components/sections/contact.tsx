"use client";

import { useState } from "react";
import { MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { PHONES, waLink } from "@/lib/data";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello OMuga Services — my name is ${
      name || "a guest"
    }. ${message}`;
    window.open(waLink(text), "_blank");
  };

  return (
    <section
      id="contact"
      className="relative border-t border-border bg-card/40 py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Begin the"
          italic="conversation"
        />

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Phones */}
          <Stagger className="flex flex-col gap-5" gap={0.12}>
            {PHONES.map((phone) => (
              <StaggerItem key={phone.number}>
                <a
                  href={waLink("Hello OMuga Services — I'd like to enquire.", phone.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:gold-glow"
                >
                  <div className="flex items-center gap-5">
                    <span className="flex size-12 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
                      <Phone className="size-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="font-serif text-2xl font-medium text-ivory transition-colors group-hover:text-gold">
                        {phone.label}
                      </p>
                      <p className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-ivory/45">
                        {phone.tag}
                      </p>
                    </div>
                  </div>
                  <MessageCircle className="size-5 text-gold/50 transition-all duration-300 group-hover:text-gold" />
                </a>
              </StaggerItem>
            ))}

            <StaggerItem>
              <p className="pl-1 text-sm leading-relaxed text-ivory/45">
                All lines are on WhatsApp, 24 hours a day. Call, message or
                send a voice note — the concierge desk always answers.
              </p>
            </StaggerItem>
          </Stagger>

          {/* Quick enquiry form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={submit}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 sm:p-10"
            >
              <h3 className="font-serif text-2xl font-medium text-ivory">
                Send an enquiry
              </h3>
              <p className="mt-2 text-sm text-ivory/50">
                Compose your message here — it opens straight into WhatsApp.
              </p>

              <div className="mt-8 flex flex-1 flex-col gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.3em] text-gold"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Amara N."
                    className="h-12 rounded-xl border-input bg-background/60 px-4 text-ivory placeholder:text-ivory/30 focus-visible:border-gold/60"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.3em] text-gold"
                  >
                    How can we help?
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Two nights in Kampala next month, airport pickup on arrival…"
                    className="min-h-32 rounded-xl border-input bg-background/60 px-4 py-3 text-ivory placeholder:text-ivory/30 focus-visible:border-gold/60"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-13 cursor-pointer rounded-full bg-gold text-[0.7rem] font-bold uppercase tracking-[0.28em] text-ink transition-all duration-300 hover:bg-gold-light hover:gold-glow"
                >
                  <Send className="size-4" />
                  Send via WhatsApp
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
