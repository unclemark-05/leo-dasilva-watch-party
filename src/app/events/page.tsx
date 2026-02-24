import { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Calendar, MapPin, Users } from "lucide-react";
import { HOST } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Watch Party Events",
  description: `Browse and RSVP to ${HOST.name}'s free Arsenal watch parties in Lagos.`,
};

// Placeholder — in production, fetched from Supabase
const EVENTS = [
  {
    id: "1",
    title: "Arsenal vs Chelsea",
    edition: 7,
    date: "Mar 8, 2026 · 4:00 PM WAT",
    location: "The Condo Event Center, VI",
    type: "in_person",
    status: "upcoming",
    rsvpCount: 234,
  },
  {
    id: "2",
    title: "Arsenal vs Man City",
    edition: 8,
    date: "Mar 22, 2026 · 4:00 PM WAT",
    location: "The Condo Event Center, VI",
    type: "in_person",
    status: "upcoming",
    rsvpCount: 156,
  },
  {
    id: "3",
    title: "Arsenal vs Liverpool (Online)",
    edition: null,
    date: "Apr 5, 2026 · 4:30 PM WAT",
    location: "Discord + Zoom",
    type: "online",
    status: "upcoming",
    rsvpCount: 89,
  },
  {
    id: "4",
    title: "End of Season Watch Party",
    edition: 6,
    date: "May 25, 2025 · 2:00 PM WAT",
    location: "The Condo Event Center, VI",
    type: "in_person",
    status: "completed",
    rsvpCount: 450,
  },
  {
    id: "5",
    title: "Title Challenge + Road to Europe",
    edition: 5,
    date: "Oct 27, 2024 · 2:00 PM WAT",
    location: "The Condo Event Center, VI",
    type: "in_person",
    status: "completed",
    rsvpCount: 380,
    sponsor: "Budweiser",
  },
];

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold text-white font-heading">
        Watch Party Events
      </h1>
      <p className="mt-2 text-white/40 font-sans normal-case">
        All events are free. Just RSVP so we can plan.
      </p>

      {/* Filter bar */}
      <div className="mt-8 flex flex-wrap gap-2">
        {["All", "Upcoming", "In Person", "Online", "Past"].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer first:bg-arsenal-red/20 first:text-arsenal-red"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Event grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EVENTS.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <Card className="h-full">
              {/* Photo placeholder */}
              <div className="h-36 rounded-lg bg-gradient-to-br from-arsenal-red/10 to-arsenal-navy/10 flex items-center justify-center mb-4">
                {event.edition && (
                  <span className="text-5xl font-bold text-white/10 font-heading">
                    #{event.edition}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {event.edition && (
                  <Badge variant="edition">Edition {event.edition}</Badge>
                )}
                <Badge
                  variant={
                    event.status === "completed"
                      ? "completed"
                      : event.type === "online"
                        ? "category"
                        : "upcoming"
                  }
                >
                  {event.status === "completed"
                    ? "Past"
                    : event.type === "online"
                      ? "Online"
                      : "In Person"}
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-white font-heading">
                {event.title}
              </h3>

              <div className="mt-3 space-y-2 text-sm text-white/50 font-sans normal-case">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="shrink-0" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="shrink-0" />
                  {event.rsvpCount} attended/going
                </div>
              </div>

              <p className="mt-3 text-xs text-arsenal-gold font-sans normal-case">
                Hosted by {HOST.name}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
