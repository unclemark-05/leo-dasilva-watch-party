import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Calendar, MapPin, Users } from "lucide-react";
import { HOST } from "@/lib/constants";

// Placeholder events — in production these come from Supabase
const SAMPLE_EVENTS = [
  {
    id: "1",
    title: "Arsenal vs Chelsea",
    edition: 7,
    date: "Mar 8, 2026 · 4:00 PM",
    location: "The Condo Event Center, VI",
    type: "in_person" as const,
    rsvpCount: 234,
  },
  {
    id: "2",
    title: "Arsenal vs Man City",
    edition: 8,
    date: "Mar 22, 2026 · 4:00 PM",
    location: "The Condo Event Center, VI",
    type: "in_person" as const,
    rsvpCount: 156,
  },
  {
    id: "3",
    title: "Arsenal vs Liverpool (Online)",
    edition: null,
    date: "Apr 5, 2026 · 4:30 PM",
    location: "Discord + Zoom",
    type: "online" as const,
    rsvpCount: 89,
  },
];

export default function UpcomingEventsSection() {
  return (
    <section className="py-20 px-4 cosmos-section">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white font-heading">
              Upcoming Watch Parties
            </h2>
            <p className="mt-1 text-white/40 text-sm font-sans normal-case">
              Free events hosted by {HOST.name}
            </p>
          </div>
          <Link
            href="/events"
            className="hidden sm:block text-sm text-arsenal-red hover:text-arsenal-red-dark transition-colors font-sans normal-case"
          >
            View all events &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_EVENTS.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <Card className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  {event.edition && (
                    <Badge variant="edition">Edition {event.edition}</Badge>
                  )}
                  <Badge variant={event.type === "online" ? "category" : "upcoming"}>
                    {event.type === "online" ? "Online" : "In Person"}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-white font-heading">
                  {event.title}
                </h3>
                <div className="mt-3 space-y-2 text-sm text-white/50 font-sans normal-case">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    {event.rsvpCount} going
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <Link
          href="/events"
          className="sm:hidden block mt-6 text-center text-sm text-arsenal-red hover:text-arsenal-red-dark transition-colors font-sans normal-case"
        >
          View all events &rarr;
        </Link>
      </div>
    </section>
  );
}
