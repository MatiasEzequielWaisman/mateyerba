import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  cta,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "md:mx-auto")}>
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold-600">{eyebrow}</p>}
        <h2 className="balance font-display text-display-sm font-semibold text-forest-950 md:text-display-md">
          {title}
        </h2>
        {description && <p className="mt-3 text-stone-600">{description}</p>}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-forest-800 underline-offset-4 hover:underline"
        >
          {cta.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
