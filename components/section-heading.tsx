import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export default function SectionHeading({
  eyebrow,
  title,
  italic,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-14 md:mb-20",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          align === "center" && "justify-center"
        )}
      >
        <span className="hairline-gold w-10 sm:w-16" aria-hidden />
        <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.45em] text-gold">
          {eyebrow}
        </span>
        <span className="hairline-gold w-10 sm:w-16" aria-hidden />
      </div>
      <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] text-ivory">
        {title}{" "}
        {italic && (
          <em className="text-gold-gradient font-medium italic">{italic}</em>
        )}
      </h2>
    </Reveal>
  );
}
