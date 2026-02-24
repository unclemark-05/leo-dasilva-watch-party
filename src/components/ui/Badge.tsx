import { cn } from "@/lib/utils";

type BadgeVariant = "live" | "upcoming" | "completed" | "cancelled" | "edition" | "category";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  live: "bg-green-500/20 text-green-400 border-green-500/30 animate-pulse",
  upcoming: "bg-arsenal-red/20 text-arsenal-red border-arsenal-red/30",
  completed: "bg-white/10 text-white/60 border-white/10",
  cancelled: "bg-red-900/20 text-red-400 border-red-900/30",
  edition: "bg-arsenal-gold/20 text-arsenal-gold border-arsenal-gold/30",
  category: "bg-arsenal-navy/30 text-blue-300 border-arsenal-navy/40",
};

export default function Badge({
  variant = "upcoming",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {variant === "live" && (
        <span className="h-2 w-2 rounded-full bg-green-400" />
      )}
      {children}
    </span>
  );
}
