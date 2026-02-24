"use client";

import { useCountdown } from "@/hooks/useCountdown";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

// Placeholder — in production this comes from the football API
const NEXT_MATCH = {
  home: "Arsenal",
  away: "Chelsea",
  competition: "Premier League",
  date: "2026-03-08T15:00:00Z",
  venue: "Emirates Stadium",
};

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl sm:text-5xl font-bold text-white font-heading tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-white/40 uppercase tracking-wider mt-1 font-sans">
        {label}
      </span>
    </div>
  );
}

export default function NextMatchSection() {
  const countdown = useCountdown(NEXT_MATCH.date);

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="upcoming">{NEXT_MATCH.competition}</Badge>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white font-heading">
          {NEXT_MATCH.home} vs {NEXT_MATCH.away}
        </h2>
        <p className="mt-2 text-white/40 text-sm font-sans normal-case">
          {NEXT_MATCH.venue}
        </p>

        {/* Countdown */}
        <div className="mt-8 flex justify-center gap-6 sm:gap-10">
          <CountdownUnit value={countdown.days} label="Days" />
          <span className="text-3xl text-white/20 self-start mt-2">:</span>
          <CountdownUnit value={countdown.hours} label="Hours" />
          <span className="text-3xl text-white/20 self-start mt-2">:</span>
          <CountdownUnit value={countdown.minutes} label="Mins" />
          <span className="text-3xl text-white/20 self-start mt-2">:</span>
          <CountdownUnit value={countdown.seconds} label="Secs" />
        </div>

        <div className="mt-8">
          <Link href="/events">
            <Button>Find a Watch Party</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
