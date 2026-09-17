"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Music, Pause, Play } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import type { MediaItem } from "@/lib/media";
import { cn } from "@/lib/utils";

function PhoneTour({
  tour,
  tilt,
  yOffset,
  playing,
  onToggleAudio,
}: {
  tour: MediaItem;
  tilt: string;
  yOffset: number;
  playing: boolean;
  onToggleAudio: (tour: MediaItem) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, -yOffset]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn("flex flex-col items-center", tilt)}
    >
      {/* Phone frame */}
      <div className="phone-frame relative w-[240px] p-2.5 sm:w-[280px] md:w-[300px]">
        {/* Notch */}
        <div className="absolute left-1/2 top-5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />

        <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-ink">
          <video
            src={tour.url}
            poster={tour.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/80 to-transparent" />
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-blue/90">
              <Play className="size-3 fill-white text-white" />
            </span>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-ivory">
              Tour
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-xs text-center">
        <h3 className="font-serif text-2xl font-medium text-ivory">
          {tour.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ivory/55">
          {tour.description}
        </p>
        {tour.audioUrl && (
          <button
            onClick={() => onToggleAudio(tour)}
            className={cn(
              "mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:scale-105",
              playing ? "bg-blue" : "border border-blue/40 text-blue"
            )}
          >
            {playing ? (
              <Pause className="size-3.5" />
            ) : (
              <Music className="size-3.5" />
            )}
            {playing ? "Pause sound" : "Play sound"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function VideoTours() {
  const [tours, setTours] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/api/media?kind=video", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setTours(data.items ?? []))
      .catch(() => setTours([]))
      .finally(() => setLoading(false));
  }, []);

  const toggleAudio = (tour: MediaItem) => {
    if (!tour.audioUrl) return;
    if (playingId === tour.id) {
      audioRef.current?.pause();
      audioRef.current = null;
      setPlayingId(null);
      return;
    }
    audioRef.current?.pause();
    const audio = new Audio(tour.audioUrl);
    audioRef.current = audio;
    audio.play().catch(() => setPlayingId(null));
    setPlayingId(tour.id);
    audio.addEventListener("ended", () => {
      audioRef.current = null;
      setPlayingId(null);
    });
  };

  if (loading) {
    return (
      <section id="tours" className="relative overflow-hidden py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Video Tours"
            title="Walk through,"
            italic="before you arrive"
          />
          <div className="flex flex-col items-center justify-center gap-16 md:flex-row md:items-start md:gap-10 lg:gap-20">
            <div className="phone-frame h-[540px] w-[240px] animate-pulse sm:w-[280px] md:w-[300px]" />
            <div className="phone-frame mt-20 h-[540px] w-[240px] animate-pulse sm:w-[280px] md:w-[300px]" />
          </div>
        </div>
      </section>
    );
  }

  if (tours.length === 0) return null;

  const [first, second, ...rest] = tours;

  return (
    <section id="tours" className="relative overflow-hidden py-24 md:py-36">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/6 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Video Tours"
          title="Walk through,"
          italic="before you arrive"
        />

        <div className="flex flex-col items-center justify-center gap-16 md:flex-row md:items-start md:gap-10 lg:gap-20">
          <Reveal className="md:mt-0">
            <PhoneTour
              tour={first}
              tilt="md:-rotate-2"
              yOffset={40}
              playing={playingId === first.id}
              onToggleAudio={toggleAudio}
            />
          </Reveal>
          {second && (
            <Reveal delay={0.15} className="md:mt-24">
              <PhoneTour
                tour={second}
                tilt="md:rotate-2"
                yOffset={70}
                playing={playingId === second.id}
                onToggleAudio={toggleAudio}
              />
            </Reveal>
          )}
        </div>

        {rest.length > 0 && (
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((tour) => (
              <Reveal key={tour.id}>
                <PhoneTour
                  tour={tour}
                  tilt=""
                  yOffset={30}
                  playing={playingId === tour.id}
                  onToggleAudio={toggleAudio}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}