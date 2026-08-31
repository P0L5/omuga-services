"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS, waLink } from "@/lib/data";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/reveal";

function Monogram() {
  return (
    <button
      onClick={() => scrollToSection("#top")}
      className="group flex items-center gap-3 outline-none"
      aria-label="OMuga Services — back to top"
    >
      <span className="flex size-9 items-center justify-center rounded-full border border-gold/50 font-serif text-lg font-semibold text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
        O
      </span>
      <span className="hidden flex-col items-start leading-none sm:flex">
        <span className="font-serif text-lg font-semibold tracking-[0.22em] text-ivory">
          OMUGA
        </span>
        <span className="text-[0.55rem] font-semibold uppercase tracking-[0.5em] text-gold">
          Services
        </span>
      </span>
    </button>
  );
}

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.3, ease: EASE }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Monogram />

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => go(link.href)}
                className="group relative text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ivory/70 transition-colors duration-300 hover:text-ivory"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-400 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button
            onClick={() =>
              window.open(
                waLink("Hello OMuga Services — I'd like to make a booking."),
                "_blank"
              )
            }
            className="hidden h-10 cursor-pointer rounded-full bg-gold px-6 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-ink transition-all duration-300 hover:bg-gold-light hover:gold-glow sm:inline-flex"
          >
            <MessageCircle className="size-3.5" />
            Book Now
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-ivory lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-border bg-background/95 backdrop-blur-2xl sm:max-w-sm"
            >
              <SheetHeader className="border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full border border-gold/50 font-serif text-lg font-semibold text-gold">
                    O
                  </span>
                  <span className="font-serif text-lg font-semibold tracking-[0.22em] text-ivory">
                    OMUGA
                  </span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-6 pt-6">
                <AnimatePresence>
                  {open &&
                    NAV_LINKS.map((link, i) => (
                      <motion.button
                        key={link.href}
                        initial={{ opacity: 0, x: 32 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.08 + i * 0.07,
                          ease: EASE,
                        }}
                        onClick={() => go(link.href)}
                        className="border-b border-border/60 py-5 text-left font-serif text-3xl font-medium text-ivory transition-colors hover:text-gold"
                      >
                        {link.label}
                      </motion.button>
                    ))}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="pt-8"
                >
                  <Button
                    onClick={() =>
                      window.open(
                        waLink(
                          "Hello OMuga Services — I'd like to make a booking."
                        ),
                        "_blank"
                      )
                    }
                    className="h-12 w-full cursor-pointer rounded-full bg-gold text-[0.7rem] font-bold uppercase tracking-[0.25em] text-ink hover:bg-gold-light"
                  >
                    <MessageCircle className="size-4" />
                    Book on WhatsApp
                  </Button>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
