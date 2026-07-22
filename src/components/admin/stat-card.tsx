import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: "default" | "warning" | "accent";
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-stone-200 bg-cream-50 p-5 shadow-soft">
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
          tone === "warning" && "bg-destructive/10 text-destructive",
          tone === "accent" && "bg-gold-100 text-gold-700",
          tone === "default" && "bg-forest-900 text-cream-50"
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-display text-2xl font-semibold text-forest-950">{value}</p>
        <p className="text-xs text-stone-500">{label}</p>
      </div>
    </div>
  );
}
