import { format, formatDistanceToNow, differenceInSeconds } from "date-fns";

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string): string {
  return format(new Date(date), "MMM d, yyyy");
}

export function formatDateTime(date: string): string {
  return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
}

export function formatTimeAgo(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function getCountdown(targetDate: string) {
  const seconds = differenceInSeconds(new Date(targetDate), new Date());
  if (seconds <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
