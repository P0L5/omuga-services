"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Music, Pause } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/reveal";
import type { MediaItem } from "@/lib/media";
import { cn } from "@/lib/utils";

function GalleryAudio({
  item,
  playing,
  onToggle,
}: {
  item: MediaItem;
  playing: boolean;
  onToggle: (item: MediaItem) => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(item);
      }}
      aria-label={playing ? "Pause sound" : "Play sound"}
      className={cn(
        "absolute bottom-4 right-4 z-10 flex size-11 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 hover:scale-110",
        playing ? "bg-blue animate-blue-pulse" : "bg-ink/70 backdrop-blur-md"
      )}
    >
      {playing ? (
        <Pause className="size-4" />
      ) : (
        <Music className="size-4" />
      )}
    </button>
  );
}

export default function MediaGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/api/media?kind=image", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const toggleAudio = useCallback(
    (item: MediaItem) => {
      if (!item.audioUrl) return;
      if (playingId === item.id) {
        audioRef.current?.pause();
        audioRef.current = null;
        setPlayingId(null);
        return;
      }
      audioRef.current?.pause();
      const audio = new Audio(item.audioUrl);
      audioRef.current = audio;
      audio.play().catch(() => {
        setPlayingId(null);
      });
      setPlayingId(item.id);
      audio.addEventListener("ended", () => {
        audioRef.current = null;
        setPlayingId(null);
      });
    },
    [playingId]
  );

  if (loading) {
    return (
      <section id="gallery" className="relative border-y border-border bg-card/40 py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title="Moments from"
            italic="the collection"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] animate-pulse rounded-2xl border border-border bg-card"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section id="gallery" className="relative border-y border-border bg-card/40 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments from"
          italic="the collection"
        />

        <Stagger className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6" gap={0.1}>
          {items.map((item) => (
            <StaggerItem key={item.id} className="break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-2xl border border-border">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                  {item.tag && (
                    <span className="absolute left-4 top-4 rounded-full border border-blue/40 bg-ink/60 px-3.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-blue backdrop-blur-md">
                      {item.tag}
                    </span>
                  )}

                  {item.audioUrl && (
                    <GalleryAudio
                      item={item}
                      playing={playingId === item.id}
                      onToggle={toggleAudio}
                    />
                  )}

                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="font-serif text-2xl font-medium text-ivory">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-1 text-sm leading-relaxed text-ivory/70">
                        {item.description}
                      </p>
                    )}
                  </figcaption>
                </div>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}