"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "bg-forest-950 text-cream-50 border-forest-900 rounded-lg shadow-elevated font-sans",
          title: "font-medium",
          actionButton: "bg-gold-500 text-forest-950",
          cancelButton: "bg-stone-700 text-cream-50",
        },
      }}
    />
  );
}
