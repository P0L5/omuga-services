import { MARQUEE_ITEMS } from "@/lib/data";

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center"
    >
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-serif text-xl font-medium italic tracking-wide text-gold/90 sm:text-2xl">
            {item}
          </span>
          <span className="size-1.5 rotate-45 bg-gold/40" aria-hidden />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-card/60 py-6">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row ariaHidden />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
