import { cn } from "@/lib/utils";

/**
 * Flexbox-based grid replacement: unlike `display: grid`, this centers a
 * trailing incomplete row (e.g. 7 items in a 4-column layout) instead of
 * leaving it flush left. Each `AutoGridItem` sets its own explicit width per
 * breakpoint to match the equivalent grid-cols count.
 */
export function AutoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap justify-center", className)}>{children}</div>;
}

export function AutoGridItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("shrink-0", className)}>{children}</div>;
}
