"use client";

import { useState, type MouseEvent } from "react";
import { ProductArt } from "@/components/product/product-art";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/lib/types";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [zoomed, setZoomed] = useState(false);
  const active = images[activeIndex] ?? images[0]!;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-4">
      <div
        className="relative flex-1 overflow-hidden rounded-lg bg-cream-100"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <div
          className={cn("transition-transform duration-300 ease-premium", zoomed && "scale-[1.8]")}
          style={zoomed ? zoomStyle : undefined}
        >
          <ProductArt placeholder={active.placeholder} url={active.url} alt={active.alt} className="rounded-lg" priority />
        </div>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-cream-50/80 px-2.5 py-1 text-[0.65rem] font-medium text-forest-800">
          Pasá el mouse para hacer zoom
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto md:w-24 md:flex-col md:overflow-visible">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "h-20 w-20 shrink-0 overflow-hidden rounded-md ring-2 ring-offset-2 ring-offset-cream-50 transition",
              i === activeIndex ? "ring-forest-800" : "ring-transparent hover:ring-stone-300"
            )}
            aria-label={`Ver imagen ${i + 1}`}
            aria-current={i === activeIndex}
          >
            <ProductArt placeholder={img.placeholder} url={img.url} alt={img.alt} />
          </button>
        ))}
      </div>
    </div>
  );
}
