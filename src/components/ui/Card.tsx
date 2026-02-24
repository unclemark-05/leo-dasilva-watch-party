import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({
  hover = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-bg-card border border-white/5 p-6",
        hover &&
          "transition-all duration-300 hover:bg-bg-card-hover hover:border-arsenal-red/20 hover:shadow-[0_0_20px_rgba(239,1,7,0.1)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
