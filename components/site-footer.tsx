"use client";

import Image from "next/image";
import { FOOTER_SERVICES, NAV_LINKS, SOCIALS } from "@/lib/data";
import { scrollToSection } from "@/lib/scroll";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  XIcon,
} from "@/components/social-icons";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Facebook: <FacebookIcon className="size-4" />,
  Instagram: <InstagramIcon className="size-4" />,
  "X (Twitter)": <XIcon className="size-4" />,
  TikTok: <TikTokIcon className="size-4" />,
};

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-white">
                <Image
                  src="/logo.jpg"
                  alt="OMuga Services"
                  fill
                  sizes="44px"
                  className="object-contain p-0.5"
                />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl font-semibold tracking-[0.22em] text-ivory">
                  OMUGA
                </span>
                <span className="text-[0.55rem] font-semibold uppercase tracking-[0.5em] text-gold">
                  Services
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/50">
              Luxury stays, bespoke concierge and property brokerage across
              Uganda and Kenya. One message is all it takes.
            </p>
            <div className="mt-7 flex max-w-md flex-wrap items-start gap-x-6 gap-y-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`OMuga Services on ${social.label}`}
                  className="group flex flex-col items-center gap-2"
                >
                  <span className="flex size-10 items-center justify-center rounded-full border border-border text-ivory/60 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                    {SOCIAL_ICONS[social.label]}
                  </span>
                  <span className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ivory/40 transition-colors duration-300 group-hover:text-gold">
                    {social.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-gold">
              Explore
            </h3>
            <ul className="mt-6 space-y-3.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-ivory/55 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-gold">
              Services
            </h3>
            <ul className="mt-6 space-y-3.5">
              {FOOTER_SERVICES.map((service) => (
                <li key={service} className="text-sm text-ivory/55">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-gold">
              The Desk
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-ivory/55">
              <li>
                <p className="font-semibold text-ivory/80">Kampala, Uganda</p>
                <p className="mt-1">+256 794 930 817</p>
                <p>+256 789 253 553</p>
              </li>
              <li>
                <p className="font-semibold text-ivory/80">Nairobi, Kenya</p>
                <p className="mt-1">+254 142 695 839</p>
              </li>
              <li className="text-ivory/40">Concierge — 24 hours, every day</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-ivory/35">
            © {new Date().getFullYear()} OMuga Services. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-ivory/35">
            Kampala
            <span className="size-1 rotate-45 bg-gold/60" aria-hidden />
            Nairobi
            <span className="size-1 rotate-45 bg-gold/60" aria-hidden />
            Beyond
          </p>
        </div>
      </div>
    </footer>
  );
}
