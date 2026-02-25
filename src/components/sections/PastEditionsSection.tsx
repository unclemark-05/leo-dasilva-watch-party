"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { PAST_EDITIONS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export default function PastEditionsSection() {
  return (
    <section className="py-20 px-4 cosmos-section">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white font-heading">
            {PAST_EDITIONS.length} Editions &amp; Counting
          </h2>
          <p className="mt-1 text-white/40 text-sm font-sans normal-case">
            From one watch party to a movement
          </p>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {PAST_EDITIONS.map((edition) => (
            <Card
              key={edition.edition}
              hover={false}
              className="shrink-0 w-64 snap-start"
            >
              {/* Photo placeholder */}
              <div className="h-32 rounded-lg bg-gradient-to-br from-arsenal-red/20 to-arsenal-navy/20 flex items-center justify-center mb-3">
                <span className="text-5xl font-bold text-white/10 font-heading">
                  #{edition.edition}
                </span>
              </div>
              <Badge variant="edition" className="mb-2">
                Edition {edition.edition}
              </Badge>
              <h3 className="text-sm font-bold text-white font-heading leading-tight">
                {edition.title}
              </h3>
              <p className="mt-1 text-xs text-white/40 font-sans normal-case">
                {formatDate(edition.date)} &middot; {edition.venue}
              </p>
              {"sponsor" in edition && edition.sponsor && (
                <p className="mt-1 text-xs text-arsenal-gold font-sans normal-case">
                  Sponsored by {edition.sponsor}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
