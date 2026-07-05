import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        new: "bg-forest-900 text-cream-50",
        sale: "bg-gold-500 text-forest-950",
        outOfStock: "bg-stone-200 text-stone-600",
        freeShipping: "bg-olive-100 text-olive-800",
        outline: "border border-forest-900/20 text-forest-800",
        neutral: "bg-cream-200 text-forest-800",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
